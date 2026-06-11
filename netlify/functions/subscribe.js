// Función serverless de Netlify — suscribe el email a MailerLite de forma segura.
// La API key NUNCA está en el código del sitio: se lee de una variable de entorno
// (MAILERLITE_API_KEY) que configurás en Netlify. Así nadie puede verla.
//
// Variables de entorno necesarias (Netlify → Site settings → Environment variables):
//   MAILERLITE_API_KEY   → token de la API de MailerLite (obligatorio)
//   MAILERLITE_GROUP_ID  → ID del grupo "Checklist landing" (recomendado)

exports.handler = async (event) => {
  const cors = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') return { statusCode: 204, headers: cors, body: '' };
  if (event.httpMethod !== 'POST')
    return { statusCode: 405, headers: cors, body: JSON.stringify({ error: 'Method not allowed' }) };

  const API_KEY = process.env.MAILERLITE_API_KEY;
  const GROUP_ID = process.env.MAILERLITE_GROUP_ID;
  if (!API_KEY)
    return { statusCode: 500, headers: cors, body: JSON.stringify({ error: 'Falta configurar MAILERLITE_API_KEY en Netlify' }) };

  let email = '';
  try { email = (JSON.parse(event.body || '{}').email || '').trim().toLowerCase(); } catch (e) {}
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))
    return { statusCode: 400, headers: cors, body: JSON.stringify({ error: 'Email inválido' }) };

  const payload = { email, fields: { fuente: 'landing-checklist' } };
  if (GROUP_ID) payload.groups = [GROUP_ID];

  try {
    const r = await fetch('https://connect.mailerlite.com/api/subscribers', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + API_KEY,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    const data = await r.json().catch(() => ({}));
    if (!r.ok)
      return { statusCode: r.status, headers: cors, body: JSON.stringify({ error: 'Error de MailerLite', detail: data }) };
    return { statusCode: 200, headers: cors, body: JSON.stringify({ ok: true }) };
  } catch (err) {
    return { statusCode: 502, headers: cors, body: JSON.stringify({ error: 'No se pudo conectar con MailerLite' }) };
  }
};
