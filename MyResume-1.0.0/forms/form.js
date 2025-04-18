
  document.querySelector('#telegramapi').addEventListener('submit', function(e) {
    console.log("formclicked")
    e.preventDefault();

    const name = this.name.value;
    const email = this.email.value;
    const subject = this.subject.value;
    const message = this.message.value;

    const telegramMessage = 
      `<b>New Message from Portfolio</b>\n` +
      `<b>Name:</b> ${name}\n` +
      `<b>Email:</b> ${email}\n` +
      `<b>Subject:</b> ${subject}\n` +
      `<b>Message:</b>\n${message}`;

    const BOT_TOKEN = '7668713297:AAEVjbOGNps2Ooiu68j-Gxq9e_6xjNvtA34';
    const CHAT_ID = '1704787124' && '-4621924057';
    const TELEGRAM_API = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

    fetch(TELEGRAM_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        chat_id: 1704787124 && -4621924057,
        text: telegramMessage,
        parse_mode: 'HTML'
      })
    })
    .then(response => {
      if (response.ok) {
        console.log("success")
        document.querySelector('.sent-message').classList.add('d-block');
        document.querySelector('.php-email-form').reset();
      } else {
        document.querySelector('.error-message').innerText = 'Failed to send message via Telegram.';
        document.querySelector('.error-message').classList.add('d-block');
      }
    })
    .catch(error => {
      document.querySelector('.error-message').innerText = 'Error: ' + error;
      document.querySelector('.error-message').classList.add('d-block');
    });
  });
