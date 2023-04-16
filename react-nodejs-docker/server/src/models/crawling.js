const puppeteer = require('puppeteer');

async function startBrowser() {
  const browser = await puppeteer.launch({headless: false, args: ['--disable-notifications'] });
  // const browser = await puppeteer.launch();
  
  return browser;
}

async function searchRankings(browser, name) {
  const [page] = await browser.pages();
  await page.goto('https://maplestory.nexon.com/N23Ranking/World/Total');

  const searchInput = await page.$('.word_input.ranking_search_bar_input input');
  await searchInput.click({clickCount: 3}); // 선택된 텍스트 지우기
  await searchInput.type(name);

  const searchBtn = await page.$('.word_input.ranking_search_bar_input .btn img');
  await searchBtn.click({clickCount: 1});
  await delay(500)

  var [names] = await page.$x("//a[contains(text(), '"+ name +"')]");
  if (names) await names.click();
  await delay(500)
}

async function searchInfo(browser) {
  const [a, page] = await browser.pages();
  
  // const browser_ = await startBrowser()
  // const [page] = await browser_.pages();
  // await page.goto('https://maplestory.nexon.com/Common/Character/Detail/%eb%a6%ac%eb%b0%94%ea%b8%b0/Ranking?p=mikO8qgdC4hElCwBGQ6GOx8CmO11EvduZkV0bRbPAhaTA3PJ5PT1sP0wMdH0ioadQFEhezGc6PGJO35KQVok9nYyi81CXulM7y2mqe7v8fByLoDtRcQD3NvrXDHWDHjlEzdvyuBIv0577ercXeX%2buC6ugSkl%2fnBCNHme04Kvr%2fw%3d');

  var [rankInfo] = await page.$x("//a[contains(text(), '"+ '랭킹정보' +"')]");
  if (rankInfo) await rankInfo.click();
  await delay(500)
  
  const charInfo = await page.evaluate(() => {
    const char = document.querySelectorAll('.char_info dd');
    const info = [] 
    char.forEach((v,k) => {
      info.push(v.textContent)
    })
    const rank = document.querySelectorAll('.now_rank_list li');
    rank.forEach((v,k) => {
      const num = v.querySelectorAll('dd').item(1)
      const text = num.textContent.replace(/[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"\n ]/gi,'')
      if (text) info.push(text)
    })
    return info
  });
  console.log(charInfo)
  browser.close();
  return charInfo
}

async function ranking(req, res) {
  const browser = await startBrowser()
  try {
    await searchRankings(browser, req.body.username)
  }
  catch (err) {
    browser.close()
    console.log("err: searchRankings")
    console.log(err)
    res.status(404).json({status:"not found"})
  }
  try {
    await searchInfo(browser)
    res.json({status:"success"})
  }
  catch (err) {
    browser.close()
    console.log("err: searchInfo")
    console.log(err)
    res.status(404).json({status:"not found"})
  }

}


function delay(time) {
  return new Promise(function(resolve) { 
      setTimeout(resolve, time)
  });
}
module.exports = {ranking}