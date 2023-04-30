const puppeteer = require('puppeteer');
const { Charinfo, Word} = require('./info')

var startBrowser = async() => {
  const browser = await puppeteer.launch({headless: false, args: ['--disable-notifications'] });
  // const browser = await puppeteer.launch();
  
  return browser;
}

var searchRankings = async(browser, name, charInfo) => {
  const [page] = await browser.pages();
  await page.goto('https://maplestory.nexon.com/N23Ranking/World/Total?c='+name+'&w=0');

  var names = await page.$('.search_com_chk a')
  if(names == null) {
    await page.goto('https://maplestory.nexon.com/N23Ranking/World/Total?c='+name+'&w=254');
    names = await page.$('.search_com_chk a')
  }
  await names.click();
  
  const img = await page.$('.search_com_chk .char_img img')
  const charImage = await img.evaluate(element => element.src.replace('Character\/180', 'Character'))
  var info = await page.$$eval('.search_com_chk td', el => el.map(e => e.textContent.replace(/[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"\n ]/gi,'')))

  charInfo['guild'] = info[info.length - 1]
  charInfo['image'] = charImage

  await delay(500)
}

var searchInfo = async(browser, charInfo) => {
  const [a, page] = await browser.pages();
  
  // const browser_ = await startBrowser()
  // const [page] = await browser_.pages();
  // await page.goto('https://maplestory.nexon.com/Common/Character/Detail/%eb%a6%ac%eb%b0%94%ea%b8%b0/Ranking?p=mikO8qgdC4hElCwBGQ6GOx8CmO11EvduZkV0bRbPAhaTA3PJ5PT1sP0wMdH0ioadQFEhezGc6PGJO35KQVok9nYyi81CXulM7y2mqe7v8fByLoDtRcQD3NvrXDHWDHjlEzdvyuBIv0577ercXeX%2buC6ugSkl%2fnBCNHme04Kvr%2fw%3d');

  await delay(500)
  var [rankInfo] = await page.$x("//a[contains(text(), '"+ '랭킹정보' +"')]");
  if (rankInfo) await rankInfo.click();
  await delay(500)
  
  const cinfo = await page.evaluate(() => {
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
  charInfo['level'] = cinfo[0]
  charInfo['job'] = cinfo[1]
  charInfo['server'] = cinfo[2]
  charInfo['rank']['rank_all'] = cinfo[3].replace(/[^0-9]/gi, '')
  charInfo['rank']['rank_word'] = cinfo[4].replace(/[^0-9]/gi, '')
}

var searchUnion = async(browser, charInfo) => {
  var [page] = await browser.pages();
  await page.goto('https://maplestory.nexon.com/N23Ranking/World/Union?c=' + charInfo['name'] +'&w=0');
  var [rank] = await page.$$eval('.search_com_chk .ranking_other', el => el.map(e => e.textContent.replace(/[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"\n ]/gi,'')))
  var [a,b, lv, power] = await page.$$eval('.search_com_chk td', el => el.map(e => e.textContent.replace(/[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"\n ]/gi,'')))

  var [page] = await browser.pages();
  await page.goto('https://maplestory.nexon.com/N23Ranking/World/Union?c=' + charInfo['name'] +'&w=' + Word[charInfo['server']]);
  var [rank_word] = await page.$$eval('.search_com_chk .ranking_other', el => el.map(e => e.textContent.replace(/[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"\n ]/gi,'')))
  var [a,b, lv, power] = await page.$$eval('.search_com_chk td', el => el.map(e => e.textContent.replace(/[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"\n ]/gi,'')))
  charInfo['union']['rank'] = rank
  charInfo['union']['rank_word'] = rank_word
  charInfo['union']['level'] = lv
  charInfo['union']['power'] = power
}

var searchJobRanking = async(browser, charInfo) => {
  var [page] = await browser.pages();
  await page.goto('https://maplestory.nexon.com/N23Ranking/World/Total');

  const [jobs, exs] = await page.$$('.rank_sel_custom')
  
  var [fst, sec] = charInfo['job'].split('\/')
  if (fst == sec) sec = '전체 전직';
  await jobs.click()
  var [job] = await jobs.$x("//a[contains(text(), '" + fst + "')]");
  await job.click()

  await exs.click()
  var [ex] = await exs.$x("//a[contains(text(), '" + sec + "')]");
  await ex.click()

  await delay(500)

  await page.goto(page.url() + "&c=" + charInfo['name'])
  var [rank] = await page.$$eval('.search_com_chk td p', el => el.map(e => e.textContent.replace(/[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"\n ]/gi,'')))
  
  await page.goto(page.url() + '&w=' + Word[charInfo['server']])
  var [rank_word] = await page.$$eval('.search_com_chk td p', el => el.map(e => e.textContent.replace(/[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"\n ]/gi,'')))
  
  charInfo['rank']['rank_job_all'] = rank
  charInfo['rank']['rank_job_word'] = rank_word
}

var ranking = async(req, res) => {
  const browser = await startBrowser()
  charInfo = {...Charinfo}
  charInfo['name'] = req.body.username
  try {
    await searchRankings(browser, req.body.username, charInfo)
  }
  catch (err) {
    browser.close()
    console.log("err: searchRankings")
    console.log(err)
    res.status(404).json({status:"not found"})
  }
  try {
    await searchInfo(browser, charInfo)
  }
  catch (err) {
    browser.close()
    console.log("err: searchInfo")
    console.log(err)
    res.status(404).json({status:"not found"})
  }

  try {
    await searchUnion(browser, charInfo)
  }
  catch (err) {
    browser.close()
    console.log("err: searchUnion")
    console.log(err)
    res.status(404).json({status:"not found"})
  }

  try {
    await searchJobRanking(browser, charInfo)
    res.json({status:"200"})
  }
  catch (err) {
    browser.close()
    console.log("err: searchJobRanking")
    console.log(err)
    res.status(404).json({status:"not found"})
    return
  }


  if(browser) browser.close()
  console.log(charInfo)
}


function delay(time) {
  return new Promise(function(resolve) { 
      setTimeout(resolve, time)
  });
}
module.exports = { ranking }