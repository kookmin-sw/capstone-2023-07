const puppeteer = require('puppeteer');

async function startBrowser() {
  const browser = await puppeteer.launch({headless: false, args: ['--disable-notifications'] });
  // const [rank] = await browser.pages();
  return browser;
}

async function searchRankings(name) {
  const browser = await startBrowser();
  const [page] = await browser.pages();
  await page.goto('https://maplestory.nexon.com/N23Ranking/World/Total');
  const searchInput = await page.$('.word_input.ranking_search_bar_input input');
  await searchInput.click({clickCount: 3}); // 선택된 텍스트 지우기
  await searchInput.type(name);
  const searchBtn = await page.$('.word_input.ranking_search_bar_input .btn img');
  await searchBtn.click({clickCount: 1});
  await delay(2000)
  var [names] = await page.$x("//a[contains(text(), '"+ name +"')]");
  if (names) await names.click();
  await page.close()
  return browser;
}


function delay(time) {
  return new Promise(function(resolve) { 
      setTimeout(resolve, time)
  });
}
module.exports = searchRankings