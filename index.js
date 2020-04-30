const express = require('express')
const app = express()
const puppeteer = require('puppeteer');

const path = require('path')
// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'client/build')))


app.get('/gettorrent', async (req, res) => {
    const browser = await puppeteer.launch({
      args: [
        
        '--no-sandbox',
        '--disable-setuid-sandbox'
        
      ],
      dumpio: true,
    });
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    await page.goto('https://www.oxtorrent.com/torrents/series');
    
    const titles = await page.evaluate(() => 
     Array.from(document.querySelectorAll('div.maxi a'))
     .map(key => `${key.innerText.trim()} => ${key.href}`)
    );

    res.send(titles)
})
// Anything that doesn't match the above, send back index.html
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'))
})


const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Mixing it up on port ${PORT}`)
})