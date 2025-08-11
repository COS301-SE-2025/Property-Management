const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.tracing.start({ path: 'trace.json', categories: ['devtools.timeline'] });

  await page.goto('http://localhost:4200', { waitUntil: 'networkidle0' });

  await page.tracing.stop();
  console.log('Performance trace saved to trace.json');

  await browser.close();
})();