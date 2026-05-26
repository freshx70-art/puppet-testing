const puppeteer = require('puppeteer');
const fs = require('fs');

async function captureCookies() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    // Navigate to the Roblox login page
    await page.goto('https://www.roblox.com/login');

    // Wait for the user to log in
    await page.waitForSelector('#login-button');

    // Optional: Add a delay to ensure the user has time to log in
    await new Promise(resolve => setTimeout(resolve, 10000));

    // Capture cookies
    const cookies = await page.cookies();
    if (cookies.length === 0) {
        console.log('No cookies found. Ensure you are logged in.');
        await browser.close();
        return;
    }

    // Save cookies to a notepad file
    fs.writeFileSync('cookies.txt', JSON.stringify(cookies, null, 2));
    console.log('Cookies saved to cookies.txt');

    // Close the browser
    await browser.close();
}

captureCookies().catch(console.error);
