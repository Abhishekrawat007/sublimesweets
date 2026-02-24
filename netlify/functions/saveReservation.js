// netlify/functions/saveReservation.js
import admin from "firebase-admin";
import zlib from "zlib";
import { promisify } from "util";

const gunzip = promisify(zlib.gunzip);
let _saCache = null;
let _initPromise = null;

async function loadServiceAccountFromEnv() {
  if (_saCache) return _saCache;
  const b64 = process.env.FIREBASE_SA_GZ;
  if (!b64) throw new Error("Missing FIREBASE_SA_GZ env var");
  const gzBuffer = Buffer.from(b64, "base64");
  const jsonBuf  = await gunzip(gzBuffer);
  _saCache = JSON.parse(jsonBuf.toString("utf8"));
  return _saCache;
}

async function ensureFirebaseInit() {
  if (admin.apps.length) return;
  if (_initPromise) return _initPromise;
  _initPromise = (async () => {
    const sa = await loadServiceAccountFromEnv();
    admin.initializeApp({
      credential: admin.credential.cert(sa),
      databaseURL: process.env.FIREBASE_DB_URL,
    });
  })();
  return _initPromise;
}

export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method not allowed" };
  }

  try {
    await ensureFirebaseInit();
    const body = JSON.parse(event.body || "{}");
    const { reservationId, name, phone, email, guests, date, time, specialRequests, pdfUrl } = body;

    if (!reservationId || !name || !phone || !date || !time) {
      return { statusCode: 400, body: "Missing required fields" };
    }

    const db  = admin.database();
    const ref = await db.ref("sites/sublimesweets/reservations").push({
  reservationId,
  name,
  phone,
  email: email || null,
  guests: guests || "2",
  date,
  time,
  specialRequests: specialRequests || null,
  pdfUrl: pdfUrl || null,  // ✅ ADD THIS LINE
  status: "pending",
  createdAt: Date.now(),
  timestamp: new Date().toISOString(),
});

    console.log("✅ Reservation saved:", ref.key);

    // Push notification to admin
    try {
      const snap   = await admin.database().ref("sites/sublimesweets/adminTokens").once("value");
      const td     = snap.val() || {};
      const tokens = Object.values(td).map(t => t.token).filter(Boolean);
      for (const token of tokens) {
        try {
          await admin.messaging().send({
            token,
            notification: {
              title: "🍽️ New Reservation!",
              body:  `${name} — ${guests} guests — ${date} at ${time}`
            },
            webpush: { fcmOptions: { link: "/editor.html" } }
          });
        } catch (e) { console.warn("Push failed:", e.message); }
      }
    } catch (e) { console.warn("Push notif error:", e.message); }

    return { statusCode: 200, body: JSON.stringify({ ok: true, key: ref.key }) };
  } catch (err) {
    console.error("saveReservation error:", err);
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
}