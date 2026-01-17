// netlify/functions/saveOrder.js (COD ORDERS)
import admin from "firebase-admin";
import zlib from "zlib";
import { promisify } from "util";

const gunzip = promisify(zlib.gunzip);

let _saCache = null;
let _initPromise = null;

async function loadServiceAccountFromEnv() {
  if (_saCache) return _saCache;
  const b64 = process.env.FIREBASE_SA_GZ;
  if (!b64) throw new Error("Missing FIREBASE_SA_GZ");
  const gzBuffer = Buffer.from(b64, "base64");
  const jsonBuf = await gunzip(gzBuffer);
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
  console.log("💾 saveOrder (COD) called");
  
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    await ensureFirebaseInit();

    const body = JSON.parse(event.body || "{}");
    const { pdfUrl, orderId, name, phone, email, cart, totalAmount, payment, timestamp } = body;

    if (!orderId) {
      return { statusCode: 400, body: "Missing orderId" };
    }

    // ✅ Save COD order with EXPLICIT isPaid: false
    const orderRef = await admin
      .database()
      .ref("sites/sabsepyarastore/orders")
      .push({
        orderId,
        name,
        phone,
        email: email || null,
        cart,
        totalAmount,
        isPaid: false,  // ✅ COD is ALWAYS unpaid initially
        pdfUrl: pdfUrl || null,
        payment: payment || { provider: 'COD', method: 'cod', status: 'pending' },
        createdAt: Date.now(),
        timestamp: timestamp || new Date().toISOString(),
      });

    console.log('✅ COD order saved:', orderRef.key);

    // ✅ SEND NOTIFICATION SYNCHRONOUSLY
    let notifResult = { status: 'starting' };
    try {
      const snapshot = await admin.database().ref('sites/sabsepyarastore/adminTokens').once('value');
      const tokenData = snapshot.val() || {};
      const adminTokens = Object.values(tokenData).map(t => t.token).filter(Boolean);
      
      notifResult.tokensFound = adminTokens.length;

      if (adminTokens.length > 0) {
        notifResult.status = 'sending';
        let successCount = 0;
        let failureCount = 0;
        const toRemove = [];
        
        for (const token of adminTokens) {
          try {
            await admin.messaging().send({
              token: token,
              notification: {
                title: "🔔 New COD Order!",
                body: `${name || 'Customer'} - ₹${totalAmount || 0} (COD)`
              },
              webpush: {
                fcmOptions: { link: "/editor.html" }
              }
            });
            successCount++;
          } catch (err) {
            failureCount++;
            const tokenKey = Object.keys(tokenData).find(k => tokenData[k].token === token);
            if (tokenKey) {
              toRemove.push(tokenKey);
            }
            console.error(`Failed token:`, token.substring(0, 20), err.message);
          }
        }
        
        // Cleanup invalid tokens
        for (const tokenKey of toRemove) {
          await admin.database().ref('sites/sabsepyarastore/adminTokens/' + tokenKey).remove();
        }
        
        notifResult.status = 'sent';
        notifResult.success = successCount;
        notifResult.failed = failureCount;
        notifResult.removed = toRemove.length;
        
        console.log(`✅ COD Notifications: ${successCount}/${adminTokens.length}, Cleaned: ${toRemove.length}`);
      } else {
        notifResult.status = 'noTokens';
      }
    } catch (notifErr) {
      notifResult.status = 'error';
      notifResult.error = notifErr.message;
      console.error("⚠️ Notification failed:", notifErr);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        ok: true, 
        orderId: orderRef.key, 
        type: 'COD',
        isPaid: false,
        hasPdf: !!pdfUrl,
        debug: notifResult 
      }),
    };
  } catch (err) {
    console.error("❌ saveOrder (COD) error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
}