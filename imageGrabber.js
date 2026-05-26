const puppeteer = require('puppeteer');
const fs = require('fs');

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

    // Close the browser
    await browser.close();
}

captureCookies().catch(console.error);
