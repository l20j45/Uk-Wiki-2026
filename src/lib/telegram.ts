// src/lib/telegram.ts
export async function sendTelegramAlert(message: string) {
  const token = import.meta.env.TELEGRAM_TOKEN;
  const chatId = import.meta.env.TELEGRAM_CHAT_ID;
  
  const url = `https://api.telegram.org/bot${token}/sendMessage`;

  try {
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: `🚨 *Wiki UK Alert*\n${message}`,
        parse_mode: 'Markdown'
      })
    });
  } catch (e) {
    console.error("Error enviando alerta de Telegram", e);
  }
}