const puppeteer = require('puppeteer');
const { update } = require('../../routes/controller');
const { Charinfo, Word, NumToWord} = require('./info')

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
  var [a,b,lv,d,e,guild] = await page.$$eval('.search_com_chk td', el => el.map(e => e.textContent.replace(/[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"\n ]/gi,'')))
  var[job] = await page.$$eval('.search_com_chk .left dd', el => el.map(e => e.textContent.replace(/\s/g,'')))
  var[server] = await page.$$eval('.search_com_chk .left dt img', el => el.map(e => e.src))
  server = "" + (Number(server.split('/icon_')[1].replace(/[^0-9]/gi, '')) - 1)
  charInfo.guild = guild
  charInfo.level = lv.replace(/[^0-9]/gi, '')
  charInfo.image = charImage
  charInfo.job = job
  charInfo.server = NumToWord[server]
}
var searchItem = async(browser) => {
  await delay(500)
  const [a, page] = await browser.pages();
  
  var [rankInfo] = await page.$x("//a[contains(text(), '"+ '장비' +"')]");
  if (rankInfo) await rankInfo.click();
  await delay(500)
  
  const imgs = await page.$$('.tab01_con_wrap .item_pot li > img')
  for(let i = 0; i < imgs.length; i++) {
    await imgs[i].click()
    item = {}
    var title = await page.$('.tab01_con_wrap .item_memo .item_memo_title h1')
    item.title = await title.evaluate(element => element.textContent.replace(/\s/g,''))
    var info = await page.$$('.tab01_con_wrap .stet_info ul li')
    for(var j = 0; j < info.length; j ++) {
      var [stet, point] = await info[j].$$('div')
      stet = await stet.evaluate(element => element.textContent.replace(/\s/g,''))
      point = await point.evaluate(element => element.innerText.replace(/\n/g, '\/'))
      if (stet.includes('잠재옵션')) {
        var opt = point.split('\/')
        for(var k = 0; k < opt.length; k++) {
          [stet, point] = opt[k].split(':')
          console.log(stet,':', point)
        }
        continue
      }
      console.log(stet, ':', point)
    }
    console.log("\n")
  }
}

var searchInfo = async(browser, charInfo) => {
  await delay(500)

  const [a, page] = await browser.pages();
  
  // const browser_ = await startBrowser()
  // const [page] = await browser_.pages();
  // await page.goto('https://maplestory.nexon.com/Common/Character/Detail/%eb%a6%ac%eb%b0%94%ea%b8%b0/Ranking?p=mikO8qgdC4hElCwBGQ6GOx8CmO11EvduZkV0bRbPAhaTA3PJ5PT1sP0wMdH0ioadQFEhezGc6PGJO35KQVok9nYyi81CXulM7y2mqe7v8fByLoDtRcQD3NvrXDHWDHjlEzdvyuBIv0577ercXeX%2buC6ugSkl%2fnBCNHme04Kvr%2fw%3d');
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
  charInfo.level = cinfo[0].replace(/[^0-9]/gi, '')
  charInfo.job = cinfo[1]
  charInfo.server = cinfo[2]
  charInfo.rank.rank_all = cinfo[3].replace(/[^0-9]/gi, '')
  charInfo.rank.rank_word = cinfo[4].replace(/[^0-9]/gi, '')
}

var searchUnion = async(browser, charInfo) => {
  var [page] = await browser.pages();
  await page.goto('https://maplestory.nexon.com/N23Ranking/World/Union?c=' + charInfo['name'] +'&w=0');
  var [rank] = await page.$$eval('.search_com_chk td p', el => el.map(e => e.textContent.replace(/[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"\n ]/gi,'')))
  if (rank.length <= 0) [rank] = await page.$$eval('.search_com_chk td p img', el => el.map(e => e.alt.replace(/[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"\n ]/gi,'')))

  var [a,b, lv, power] = await page.$$eval('.search_com_chk td', el => el.map(e => e.textContent.replace(/[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"\n ]/gi,'')))

  var [page] = await browser.pages();
  await page.goto('https://maplestory.nexon.com/N23Ranking/World/Union?c=' + charInfo['name'] +'&w=' + Word[charInfo['server']]);
  var [rank_word] = await page.$$eval('.search_com_chk td p', el => el.map(e => e.textContent.replace(/[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"\n ]/gi,'')))
  if (rank_word.length <= 0) [rank_word] = await page.$$eval('.search_com_chk td p img', el => el.map(e => e.alt.replace(/[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"\n ]/gi,'')))


  var [a,b, lv, power] = await page.$$eval('.search_com_chk td', el => el.map(e => e.textContent.replace(/[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"\n ]/gi,'')))
  charInfo['union']['rank'] = rank.replace(/[^0-9]/gi, '')
  charInfo['union']['rank_word'] = rank_word.replace(/[^0-9]/gi, '')
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
  if (rank.length <= 0) [rank] = await page.$$eval('.search_com_chk td p img', el => el.map(e => e.alt.replace(/[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"\n ]/gi,'')))
  
  await page.goto(page.url() + '&w=' + Word[charInfo['server']])
  var [rank_word] = await page.$$eval('.search_com_chk td p', el => el.map(e => e.textContent.replace(/[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"\n ]/gi,'')))
  if (rank_word.length <= 0) [rank_word] = await page.$$eval('.search_com_chk td p img', el => el.map(e => e.alt.replace(/[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"\n ]/gi,'')))

  charInfo['rank']['rank_job_all'] = rank.replace(/[^0-9]/gi, '')
  charInfo['rank']['rank_job_word'] = rank_word.replace(/[^0-9]/gi, '')
}

var searchAchievements = async (browser, charInfo) => {
    var [page] = await browser.pages();
    await page.goto('https://maplestory.nexon.com/N23Ranking/Contents/Achievement?c=' + charInfo['name']);
    var [rank] = await page.$$eval('.search_com_chk td p', el => el.map(e => e.textContent.replace(/[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"\n ]/gi,'')))
    if (rank.length <= 0) [rank] = await page.$$eval('.search_com_chk td p img', el => el.map(e => e.alt.replace(/[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"\n ]/gi,'')))

    var [src] = await page.$$eval('.search_com_chk .ach_img img', el => el.map(e => e.src))
    var [grade] = await page.$$eval('.search_com_chk .ach_img span', el => el.map(e => e.textContent.replace(/[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"\n ]/gi,'')))
    var [a,b,c,points] = await page.$$eval('.search_com_chk td', el => el.map(e => e.textContent.replace(/[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"\n ]/gi,'')))

    charInfo['achievements']['grade'] = grade
    charInfo['achievements']['image'] = src
    charInfo['achievements']['points'] = points
    charInfo['achievements']['rank'] = rank.replace(/[^0-9]/gi, '')

}

var searchSeed = async (browser, charInfo) => {
    var [page] = await browser.pages();
    await page.goto('https://maplestory.nexon.com/N23Ranking/Contents/Seed?c=' + charInfo['name']);
    var [rank] = await page.$$eval('.search_com_chk td p', el => el.map(e => e.textContent.replace(/[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"\n ]/gi,'')))
    if (rank.length <= 0) [rank] = await page.$$eval('.search_com_chk td p img', el => el.map(e => e.alt.replace(/[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"\n ]/gi,'')))

    await page.goto('https://maplestory.nexon.com/N23Ranking/Contents/Seed?c=' + charInfo['name'] +'&w=' + Word[charInfo['server']]);
    var [rank_word] = await page.$$eval('.search_com_chk td p', el => el.map(e => e.textContent.replace(/[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"\n ]/gi,'')))
    if (rank_word.length <= 0) [rank_word] = await page.$$eval('.search_com_chk td p img', el => el.map(e => e.alt.replace(/[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"\n ]/gi,'')))
    
    var [a,b,c,floor,time] = await page.$$eval('.search_com_chk td', el => el.map(e => e.textContent.replace(/[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"\n ]/gi,'')))

    charInfo.seed.rank = rank.replace(/[^0-9]/gi, '')
    charInfo.seed.rank_word = rank_word.replace(/[^0-9]/gi, '')
    charInfo.seed.time = time
    charInfo.seed.floor = floor
}

var searchDojang = async (browser, charInfo) => {
    var [page] = await browser.pages();
    lv = Number(charInfo.level) > 200 ? "2" : "0"
    
    await page.goto('https://maplestory.nexon.com/N23Ranking/Contents/Dojang?c=' + charInfo['name'] + "&t=" + lv);
    var [rank] = await page.$$eval('.search_com_chk td p', el => el.map(e => e.textContent.replace(/[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"\n ]/gi,'')))
    if (rank.length <= 0) [rank] = await page.$$eval('.search_com_chk td p img', el => el.map(e => e.alt.replace(/[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"\n ]/gi,'')))

    await page.goto('https://maplestory.nexon.com/N23Ranking/Contents/Dojang?c=' + charInfo['name'] + "&t=" + lv +'&w=' + Word[charInfo['server']]);
    var [rank_word] = await page.$$eval('.search_com_chk td p', el => el.map(e => e.textContent.replace(/[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"\n ]/gi,'')))
    if (rank_word.length <= 0) [rank_word] = await page.$$eval('.search_com_chk td p img', el => el.map(e => e.alt.replace(/[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"\n ]/gi,'')))

    var [a,b,c,floor,time] = await page.$$eval('.search_com_chk td', el => el.map(e => e.textContent.replace(/[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"\n ]/gi,'')))
    
    charInfo.dojang.rank = rank.replace(/[^0-9]/gi, '')
    charInfo.dojang.rank_word = rank_word.replace(/[^0-9]/gi, '')
    charInfo.dojang.floor = floor
    charInfo.dojang.time = time
}

var crawlingItem = async(username) => { 
  const browser = await startBrowser()
  var charInfo = {...Charinfo}
  charInfo['name'] = username
  var state = 200
  try {
    await searchRankings(browser, username, charInfo)
  }
  catch (err) {
    browser.close()
    console.log("err: searchRankings not found")
    console.log(err)
    state = 404
  }
  try {
    await searchItem(browser)
  }
  catch (err) {
    browser.close()
    console.log("err: searchItem not found")
    console.log(err)
    state = 404
  }
  if(browser) browser.close()
  return { state }
}
var crawling = async(username) => {
  const browser = await startBrowser()
  var charInfo = {...Charinfo}
  charInfo['name'] = username
  var state = 200
  try {
    await searchRankings(browser, username, charInfo)
  }
  catch (err) {
    browser.close()
    console.log("err: searchRankings not found")
    console.log(err)
    state = 404
  }
  try {
    await searchInfo(browser, charInfo)
  }
  catch (err) {
    browser.close()
    console.log("err: searchInfo not found")
    console.log(err)
    state = 404
  }

  try {
    await searchUnion(browser, charInfo)
  }
  catch (err) {
    console.log("err: searchUnion not found")
    console.log(err)
  }

  try {
    await searchJobRanking(browser, charInfo)
  }
  catch (err) {
    console.log("err: searchJobRanking not found")
    console.log(err)
  }

  try {
    await searchAchievements(browser, charInfo)
  }
  catch (err) {
    console.log("err: searchAchievements not found")
    console.log(err)
  }

  try {
    await searchSeed(browser, charInfo)
  }
  catch (err) {
    console.log("err: searchSeed not found")
    console.log(err)
  }

  try {
    await searchDojang(browser, charInfo)
  }
  catch (err) {
    console.log("err: searchDojang not found")
    console.log(err)
  }

  if(browser) browser.close()
  return { state, charInfo }
}

var isUser = async(username) => {
  const browser = await startBrowser()
  var charInfo = {...Charinfo}
  charInfo['name'] = username
  var state = 200
  
  try {
    await searchRankings(browser, username, charInfo)
  }
  catch (err) {
    console.log("err: searchRankings not found")
    console.log(err)
    state = 404
  }
  if(browser)browser.close()
  return { state, charInfo }
}

function delay(time) {
  return new Promise(function(resolve) { 
      setTimeout(resolve, time)
  });
}


module.exports = { crawling, isUser, crawlingItem }