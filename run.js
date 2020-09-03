'use strict';

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
 * * * * * * * * * * * *                         * * * * * * * * * * * * 
 * * * * * * * *                                         * * * * * * * * 
 * * * * * * * *    FOR THIS TO WORK YOU MUST HAVE       * * * * * * * * 
 * * * * * *     1. Node.js installed on your machine        * * * * * * 
 * * * * * *        2. This file saved to a folder           * * * * * * 
 * * * * * *      3. Puppeteer installed in the folder       * * * * * * 
 * * * * * *             npm install puppeteer               * * * * * * 
 * * * * * *  4. Updated the URL on line 21 to your sheet's  * * * * * * 
 * * * * * * * *               5. Patience               * * * * * * * * 
 * * * * * * * *                                         * * * * * * * * 
 * * * * * * * * * * * *                         * * * * * * * * * * * * 
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */


const puppeteer = require('puppeteer');

//                        ! ! ! ! UPDATE THIS URL ! ! ! !
const url = "https://docs.google.com/spreadsheets/d/1IYSKoZcq7_JQwO7OYgmMNSwtXtZkxB8--PSOXMZg8m0/edit#gid=0";

async function run() {   
	const browser = await puppeteer.launch({
    devtools: false,
    headless: false,
    args: [
			"--disable-infobars", // hide "Chrome is being controlled by ..."
			"--no-first-run",
			"--no-sandbox",
			process.env.NODE_ENV === "production" ? "--kiosk" : null
		].filter(x => x)
	});

	const page = await browser.newPage();
	await page.setViewport({ width: 1800, height: 1100 });
	
	// This FUNCTION below creates the ability for me to pause between actions
	function delay(timeout) {
		return new Promise((resolve) => {
			setTimeout(resolve, timeout);
		});
	}

	// Go to the Google Sheet URL you entered above
	await page.goto(url);
	
		console.log("Wait 16 seconds for the file to load");
	
		// wait 16 seconds for the page to load
		await delay(16000);
		
		console.log("After 12 second wait");
	
	    // Take a screenshot of the Google Sheet and save it to your project folder
	    await page.screenshot({
		path: "./google-sheet-screenshot.jpg",
		type: "jpeg",
		fullPage: true
	});
	
	console.log("Screenshot was taken");
	
	// wait 5 seconds before continuing
	await delay(5000);
	
	// Download a PDF by writing mouse click and keyboard operations
	
	// Open the File Menu
	await page.click('#docs-file-menu');
	//await page.mouse.click(60, 40, { button: 'left' });
	
	console.log("Saving as a PDF");
	
	// wait 1 seconds before continuing
	await delay(1000);
	
	// Hover over the Download menu by pressing down arrow 7 times
	for (let step = 0; step < 7; step++) {
	  await page.keyboard.press('ArrowDown');
	  await delay(500);
	}
	
	// Press Right Arrow Once
	await page.keyboard.press('ArrowRight');
	
	// Press Down Arrow Twice
	for (let step = 0; step < 2; step++) {
	  await page.keyboard.press('ArrowDown');
	  await delay(500);
	}
	
	// This is hitting the Enter button
	await page.keyboard.press(String.fromCharCode(13));
	
	// wait 6 seconds for the PDF to load
	await delay(6000);
	
	// Press the Blue Export button at the top right
	await page.click('.docs-material-button-raised-primary.docs-material-button.waffle-printing-print-button > span.docs-material-button-content');
	
	// wait 10 seconds for the PDF to download
	await delay(10000);
	

	await page.close();
	await browser.close();
} 
run();