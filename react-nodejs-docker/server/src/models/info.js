const Charinfo = {
    name:'',
    level:'',
    job:'',
    server:'',
    guild:'',
    image:'',
    date:'',
    rank: {
        rank_all:'',
        rank_word:'',
        rank_job_all:'',
        rank_job_word:''
    },
    seed: {
        floor:'',
        time:'',
        rank:'',
        rank_word:'',
        date:''
    },
    dojang: {
        floor:'',
        time:'',
        rank:'',
        rank_word:'',
        date:''
    },
    achievements: {
        grade:'',
        image:'',
        points:'',
        rank:'',
        date:''
    },
    union: {
        grade:'',
        level:'',
        rank:'',
        rank_word:'',
        power:'',
        date:''
    }
}

const ItemOpt = {
    'STR':true,
    'DEX':true,
    'LUK':true,
    'INT':true,
    'MaxHP':true,
    '공격력':true,
    '마력':true,
    '올스탯%':true,
    '몬스터방어력무시%':true,
    '보스몬스터공격시데미지%':true,
    '데미지%':true,
    '캐릭터기준9레벨당STR':true,
    '캐릭터기준9레벨당DEX':true,
    '캐릭터기준9레벨당LUK':true,
    '캐릭터기준9레벨당INT':true,
    'STR%':true,
    'DEX%':true,
    'LUK%':true,
    'INT%':true,
    '최대HP%':true,
    '공격력%':true,
    '마력%':true,
    '모든스킬의재사용대기시간':true,
}

const ItmeInfo = {
    'title':'',
    'starForce':'',
    'part':'',
    'img':'',
    'option': {},
    'potential': {},
    'additional': {},
    'soul': {}
}

const Word = {
    '전체월드':'0',
    '리부트2':'1',
    '리부트':'2',
    '오로라':'3',
    '레드':'4',
    '이노시스':'5',
    '유니온':'6',
    '스카니아':'7',
    '루나':'8',
    '제니스':'9',
    '크로아':'10',
    '베라':'11',
    '엘리시움':'12',
    '아케인':'13',
    '노바':'14',
    '리부트 전체':'254'
}

const NumToWord = {
    '0':'전체월드',
    '1':'리부트2',
    '2':'리부트',
    '3':'오로라',
    '4':'레드',
    '5':'이노시스',
    '6':'유니온',
    '7':'스카니아',
    '8':'루나',
    '9':'제니스',
    '10':'크로아',
    '11':'베라',
    '12':'엘리시움',
    '13':'아케인',
    '14':'노바',
    '254':'리부트전체'
}
const Job = {
    '초보자':'0',
    '전사':'1',
    '마법사':'2',
    '궁수':'3',
    '도적':'4',
    '해적':'5',
    '기사단':'6',
    '아란':'7',
    '에반':'8',
    '레지스탕스':'10',
    '메르세데스':'11',
    '팬텀':'12',
    '루미너스':'13',
    '카이저':'14',
    '엔젤릭버스터':'15',
    '제로':'17',
    '은월':'18',
    '키네시스':'20',
    '카데나':'21',
    '일리움':'22',
    '아크':'23',
    '호영':'24',
    '아델':'25',
    '카인':'26',
    '라라':'28',
    '칼리':'29',

}
module.exports = { Charinfo, Word, NumToWord, ItmeInfo, ItemOpt }