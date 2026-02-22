// netlify/functions/getAllReservations.js
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
  const jsonBuf  = await gunzip(gzBuffer);
  _saCache = JSON.parse(jsonBuf.toString("utf8"));
  return _saCache;
}

async function ensureFirebaseInit() {
  if (admin.apps && admin.apps.length) return;
  if (_initPromise) return _initPromise;
  _initPromise = (async () => {
    const sa = await loadServiceAccountFromEnv();
    admin.initializeApp({
      credential: admin.credential.cert(sa),
      databaseURL: process.env.FIREBASE_DB_URL
    });
  })();
  return _initPromise;
}

export async function handler(event) {
  try {
    await ensureFirebaseInit();
    const body   = JSON.parse(event.body || "{}");
    const dbPath = body.path || "sites/sublimesweets/reservations";
    const snap   = await admin.database().ref(dbPath).once("value");
    const val    = snap.val() || {};
    const reservations = Object.entries(val).map(([key, r]) => ({ _key: key, ...r }));
    console.log(`✅ Found ${reservations.length} reservations`);
    return { statusCode: 200, body: JSON.stringify({ reservations }) };
  } catch (err) {
    console.error("getAllReservations error:", err);
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
}