// netlify/functions/sendReservationTelegram.js
// ✅ Same Royal Purple + Gold PDF style as your order PDFs
import fetch from "node-fetch";
import FormData from "form-data";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import nodemailer from "nodemailer";

function getChatIdsFromEnv() {
  const raw = process.env.TELEGRAM_CHAT_ID || process.env.TELEGRAM_CHAT_IDS || "";
  if (!raw) return [];
  return raw.split(",").map(s => s.trim()).filter(Boolean);
}

function escapeMarkdown(text) {
  return String(text || "").replace(/([_*[\]()~\`>#+\-=|{}.!\\])/g, "\\$1");
}

export async function handler(event) {
  if (event.httpMethod !== "POST") return { statusCode: 405, body: "Method Not Allowed" };

  try {
    const body = JSON.parse(event.body || "{}");
   const { name, phone, email, guests, date, time, specialRequests, reservationId, occasion } = body;

    if (!name || !phone || !date || !time || !reservationId) {
      return { statusCode: 400, body: "Missing reservation details" };
    }

    const shopName   = process.env.SHOP_NAME    || "sublime sweets";
    const siteUrl    = process.env.SITE_URL     || "https://sublimestore.in";
    const siteDomain = siteUrl.replace(/^https?:\/\//, "");
    const shopAddr   = process.env.SHOP_ADDRESS || "laxmi nivase";
    const shopPhone  = process.env.SHOP_PHONE   || "7766778899";

    const waLink = phone ? `https://wa.me/91${String(phone).replace(/\D/g, "")}` : "";

    const msgText =
      `🍽️ *New Reservation — ${shopName}*\n` +
      `*Reservation ID:* ${reservationId}\n` +
      `👤 *Name:* ${name}\n` +
      `📞 *Phone:* ${phone}\n` +
      (waLink ? `💬 *WhatsApp:* [Chat](${waLink})\n` : "") +
      `📅 *Date:* ${date}\n` +
      `🕐 *Time:* ${time}\n` +
      `👥 *Guests:* ${guests}\n` +
      (occasion ? `🎉 *Occasion:* ${occasion}\n` : "") +
      (email          ? `📧 *Email:* ${email}\n` : "") +
      (specialRequests ? `📝 *Requests:* ${specialRequests}\n` : "") +
      `\n━━━━━━━━━━━━━━━━━━━━━━\n` +
      `📍 *Site:* ${siteDomain}`;

    // ═══════════════════════════════════════════════════════════
    // PDF — EXACT SAME STYLE AS sendTelegramOrder.js
    // ═══════════════════════════════════════════════════════════
    const pdf = new jsPDF("p", "pt", "a4");
    const pw  = pdf.internal.pageSize.getWidth();
    const ph  = pdf.internal.pageSize.getHeight();

    pdf.setFillColor(250, 245, 255);
    pdf.rect(0, 0, pw, ph, "F");

    pdf.setFillColor(102, 45, 145);
    pdf.rect(0, 0, pw, 90, "F");

    pdf.setDrawColor(255, 215, 0);
    pdf.setLineWidth(2);
    pdf.line(0, 90, pw, 90);

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(20);
    pdf.setTextColor(255, 255, 255);
    pdf.text(shopName.toUpperCase(), pw / 2, 45, { align: "center" });

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(9);
    pdf.setTextColor(255, 255, 255);
    if (shopAddr) pdf.text(shopAddr, pw / 2, 63, { align: "center" });
    pdf.text(
      (shopPhone ? `Phone: ${shopPhone} | ` : "") + `Website: ${siteDomain}`,
      pw / 2, 78, { align: "center" }
    );

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(16);
    pdf.setTextColor(102, 45, 145);
    pdf.text("RESERVATION CONFIRMATION", pw / 2, 115, { align: "center" });

    pdf.setDrawColor(200, 200, 200);
    pdf.setLineWidth(0.5);
    pdf.line(40, 125, pw - 40, 125);

    const rows = [
      ["Reservation ID",   reservationId],
      ["Guest Name",       name],
      ["Phone",            phone],
      ["Email",            email || "—"],
      ["Date",             date],
      ["Time",             time],
      ["No. of Guests",    String(guests)],
      ["Occasion",         occasion || "—"],
      ["Special Requests", specialRequests || "None"],
      ["Status",           "Confirmed ✓"],
      ["Booked On",        new Date().toLocaleString()],
    ];

    autoTable(pdf, {
      startY: 140,
      head: [["Field", "Details"]],
      body: rows,
      styles: { fontSize: 11, valign: "middle", lineWidth: 0.5, lineColor: [200, 200, 200] },
      headStyles: { fillColor: [102, 45, 145], textColor: [255, 255, 255], fontStyle: "bold", lineWidth: 0.5, lineColor: [255, 140, 0] },
      bodyStyles: { minCellHeight: 32, lineWidth: 0.5, lineColor: [200, 200, 200] },
      alternateRowStyles: { fillColor: [255, 248, 240] },
      columnStyles: { 0: { cellWidth: 160, fontStyle: "bold", textColor: [0,0,0] }, 1: { cellWidth: 340, textColor: [0,0,0] } },
    });

    const finalY = (pdf.lastAutoTable?.finalY || 400) + 30;
    pdf.setDrawColor(255, 215, 0);
    pdf.setLineWidth(1.5);
    pdf.line(40, finalY - 10, pw - 40, finalY - 10);
    pdf.setFont("times", "italic");
    pdf.setFontSize(11);
    pdf.setTextColor(75, 0, 130);
    pdf.text(
      `Thank you for choosing ${shopName}.\nWe look forward to welcoming you!`,
      pw / 2, finalY + 15, { align: "center" }
    );

    const pdfBuffer = Buffer.from(pdf.output("arraybuffer"));

    // ── Telegram text ─────────────────────────────────────────
    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const CHAT_IDS = getChatIdsFromEnv();
    if (!TELEGRAM_BOT_TOKEN || CHAT_IDS.length === 0) {
      return { statusCode: 500, body: "Telegram not configured" };
    }

    for (const chatId of CHAT_IDS) {
      try {
        await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chat_id: chatId, text: escapeMarkdown(msgText), parse_mode: "MarkdownV2" })
        });
      } catch (e) { console.error("Telegram text error:", e.message); }
    }

    // ── Telegram PDF ──────────────────────────────────────────
    for (const chatId of CHAT_IDS) {
      try {
        const form = new FormData();
        form.append("chat_id", chatId);
        form.append("document", pdfBuffer, {
          filename: `${shopName.replace(/\s+/g, "-")}-Reservation-${reservationId}.pdf`,
          contentType: "application/pdf"
        });
        const headers = form.getHeaders ? form.getHeaders() : {};
        await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendDocument`, { method: "POST", body: form, headers });
      } catch (e) { console.error("Telegram PDF error:", e.message); }
    }

    // ── Owner email (Gmail) ───────────────────────────────────
    try {
      const gmailUser   = process.env.GMAIL_USER;
      const gmailPass   = process.env.GMAIL_APP_PASSWORD;
      const ownerEmails = (process.env.OWNER_EMAILS || "").split(",").map(s => s.trim()).filter(Boolean);
      if (gmailUser && gmailPass && ownerEmails.length) {
        const transporter = nodemailer.createTransport({ host: "smtp.gmail.com", port: 465, secure: true, auth: { user: gmailUser, pass: gmailPass } });
        await transporter.sendMail({
          from: gmailUser,
          to: ownerEmails.join(","),
          subject: `🍽️ New Reservation — ${name} — ${date} at ${time}`,
          text: msgText.replace(/\*/g, ""),
          html: `<h2 style="color:#662d91;">New Reservation — ${shopName}</h2><p><b>Name:</b> ${name}</p><p><b>Date:</b> ${date} at ${time}</p><p><b>Guests:</b> ${guests}</p><p><b>Phone:</b> ${phone}</p>${specialRequests ? `<p><b>Special Requests:</b> ${specialRequests}</p>` : ""}${waLink ? `<p><a href="${waLink}">💬 WhatsApp Customer</a></p>` : ""}`,
          attachments: [{ filename: `Reservation-${reservationId}.pdf`, content: pdfBuffer, contentType: "application/pdf" }]
        });
        console.log("✅ Owner email sent");
      }
    } catch (e) { console.warn("Owner email failed:", e.message); }

    // ── Customer email (Brevo) ────────────────────────────────
    if (email && process.env.BREVO_API_KEY) {
      try {
        const fromEmail = process.env.BREVO_FROM_EMAIL || process.env.FROM_EMAIL;
        await fetch("https://api.brevo.com/v3/smtp/email", {
          method: "POST",
          headers: { "Content-Type": "application/json", "api-key": process.env.BREVO_API_KEY },
          body: JSON.stringify({
            sender: { email: fromEmail },
            to: [{ email, name }],
            subject: `Your reservation at ${shopName} — ${date} at ${time}`,
            htmlContent: `<h2 style="color:#662d91;">Reservation Confirmed!</h2><p>Dear ${name},</p><p>Your reservation at <b>${shopName}</b> is confirmed.</p><p><b>Date:</b> ${date} at ${time}</p><p><b>Guests:</b> ${guests}</p><p><b>Reservation ID:</b> ${reservationId}</p><p>We look forward to welcoming you! 🍽️</p>`,
            attachment: [{ name: `Reservation-${reservationId}.pdf`, content: pdfBuffer.toString("base64") }]
          })
        });
        console.log("✅ Customer email sent");
      } catch (e) { console.warn("Customer email failed:", e.message); }
    }

    return { statusCode: 200, body: JSON.stringify({ success: true, pdfUrl: `data:application/pdf;base64,${pdfBuffer.toString("base64")}` }) };

  } catch (err) {
    console.error("sendReservationTelegram error:", err && (err.stack || err.message));
    return { statusCode: 500, body: JSON.stringify({ error: err?.message || String(err) }) };
  }
} 