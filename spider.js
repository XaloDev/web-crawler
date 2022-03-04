const express = require('express');
const app = express();
const puppeteer = require('puppeteer');

app.get('/', async (req, res) => {

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.globo.com/');

 const pageData = await page.evaluate(() => {
    const listSport = document.querySelectorAll(".topglobocom__ranking.theme-esporte > div > ol > li > div > a")
    let data = []
    listSport?.forEach(item => {
        data.push({ title: item.text, link: item.getAttribute("href")})
    })
    return {
      sportNews: data,
      length: data.length,
    };
  });

  await browser.close();

  console.log(pageData.sportNews)

  res.send({
    "sportNews": pageData.sportNews,
    "length": pageData.length
  })

});


app.listen(3000);