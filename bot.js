import dotenv from 'dotenv';
import TelegramBot from 'node-telegram-bot-api';

dotenv.config();

const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const webAppUrl = 'https://hamster-kombat-clone-steel.vercel.app';

    console.log(`Send SMS to chat ${chatId} with button to open app: ${webAppUrl}`);

    const options = {
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: "Open app",
                        web_app: { url: webAppUrl }
                    }
                ]
            ]
        }
    };

    bot.sendMessage(chatId, "Welcome to Hamster Kombat Clone Telegram bot! Press button to open!", options)
        .then(response => {
            console.log(`Message send successfully: ${response}`);
        })
        .catch(error => {
            console.error(`Error send Message: ${error}`);
        });
});

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    console.log(`Message received: ${msg.text}`);
    bot.sendMessage(chatId, 'Your message has been received')
        .then(response => {
            console.log(`Reply sent successfully: ${response}`);
        })
        .catch(error => {
            console.error(`Error sending response: ${error}`);
        });
});
