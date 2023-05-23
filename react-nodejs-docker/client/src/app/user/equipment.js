import React, {Component} from 'react';
import api from '../api';

class Equipment extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            updateItems:'아이템 갱신하기',
            total:'XXX',
            title: '아이템을 선택해 주세요',
            selectImg:'',
            option:[],
            potential:[],
            additional:[],
            soul:[]
        }
    }

    onClick = (e) => {
        const { items } = this.props

        if(items[e.currentTarget.id].img.length > 0) {
            this.setState({
                title:items[e.currentTarget.id].title,
                selectImg: items[e.currentTarget.id].img
            })
            api.getItem(items[e.currentTarget.id].idx, this.props.job)
            .then((res) => {
                const opts = {
                    option:[],
                    potential:[],
                    additional:[],
                    soul:[]
                } 
                for(var i in res.values) {
                    opts[res.values[i].type].push({name:res.values[i].name, values:res.values[i].option})
                }
                // console.log(opts)
                
                this.setState({
                    option: opts.option,
                    potential: opts.potential,
                    additional: opts.additional,
                    total:res.total
                })
                
            }).catch((err) => {
                console.log(err)
            })
        }
    }
    optionName = (name) => {
        name = name.replace('보스몬스터공격시데미지%', '보공%')
        name = name.replace('몬스터방어력무시%', '방무%')
        name = name.replace('몬스터방어율무시%', '방무%')
        name = name.replace('모든스킬의재사용대기시간', '재사용')
        name = name.replace('캐릭터기준9레벨당', '9 레벨당 ')
        name = name.replace('%', ' %')
        return name
    }

    buttonClick = (e) => {
        const {username} = this.props
        if(this.state.updateItems === '아이템 갱신하기') {
            this.setState({updateItems:'아이템 갱신중'})
            api.updateItem(username)
            .then((res) => {
                if (res.state == 'succsess') {
                    window.location.reload()
                }
                else {
                    alert('갱신 실패')
                    window.location.reload()
                }
            }).catch((err) => {
                alert('갱신 실패')
                window.location.reload()
            })
        }
        else {
            alert('이미 아이템 정보를 갱신하고 있습니다.')
        }
    }
    render() {
        const { items, total } = this.props
        const { title, selectImg, option, soul, potential, additional } = this.state
        return(
            <div className='equipments'>
                <div className='equipments-title'>
                    <div className='left'></div>
                    '{this.props.username}'님의 EQUIPMENT
                    <div className='right'></div>
                </div>
                <div className='equipments-body'>
                    <ul className='item_pot'>
                        <li>
                            {/* 반지1 */}
                            <div id={0} onClick={this.onClick}><img src={items[0].img}/></div>
                        </li>
                        <li></li>
                        <li>
                            {/* 모자 */}
                            <div id={1} onClick={this.onClick}><img src={items[1].img}/></div>
                        </li>
                        <li></li>
                        <li>
                            {/* 엠블럼 */}
                            <div id={2} onClick={this.onClick}><img src={items[2].img}/></div>
                        </li>
                        <li>
                            {/* 반지2 */}
                            <div id={3} onClick={this.onClick}><img src={items[3].img}/></div>
                        </li>
                        <li>
                            {/* 펜던트1 */}
                            <div id={4} onClick={this.onClick}><img src={items[4].img}/></div>
                        </li>
                        <li>
                            {/* 얼굴장식 */}
                            <div id={5} onClick={this.onClick}><img src={items[5].img}/></div>
                        </li>
                        <li></li>
                        <li>
                            {/* 뱃지 */}
                            <div id={6} onClick={this.onClick}><img src={items[6].img}/></div>
                        </li>
                        <li>
                            {/* 반지3 */}
                            <div id={7} onClick={this.onClick}><img src={items[7].img}/></div>
                        </li>
                        <li>
                            {/* 펜던트2 */}
                            <div id={8} onClick={this.onClick}><img src={items[8].img}/></div>
                        </li>
                        <li>
                            {/* 눈장식 */}
                            <div id={9} onClick={this.onClick}><img src={items[9].img}/></div>
                        </li>
                        <li>
                            {/* 귀고리 */}
                            <div id={10} onClick={this.onClick}><img src={items[10].img}/></div>
                        </li>
                        <li>
                            {/* 훈장 */}
                            <div id={11} onClick={this.onClick}><img src={items[11].img}/></div>
                        </li>
                        <li>
                            {/* 반지4 */}
                            <div id={12} onClick={this.onClick}><img src={items[12].img}/></div>
                        </li>
                        <li>
                            {/* 무기 */}
                            <div id={13} onClick={this.onClick}><img src={items[13].img}/></div>
                        </li>
                        <li>
                            {/* 상의 */}
                            <div id={14} onClick={this.onClick}><img src={items[14].img}/></div>
                        </li>
                        <li>
                            {/* 어깨장식 */}
                            <div id={15} onClick={this.onClick}><img src={items[15].img}/></div>
                        </li>
                        <li>
                            {/* 보조무기 */}
                            <div id={16} onClick={this.onClick}><img src={items[16].img}/></div>
                        </li>
                        <li>
                            {/* 포켓 아이템 */}
                            <div id={17} onClick={this.onClick}><img src={items[17].img}/></div>
                        </li>
                        <li>
                            {/* 벨트 */}
                            <div id={18} onClick={this.onClick}><img src={items[18].img}/></div>
                        </li>
                        <li>
                            {/* 하의 */}
                            <div id={19} onClick={this.onClick}><img src={items[19].img}/></div>
                        </li>
                        <li>
                            {/* 장갑 */}
                            <div id={20} onClick={this.onClick}><img src={items[20].img}/></div>
                        </li>
                        <li>
                            {/* 망토 */}
                            <div id={21} onClick={this.onClick}><img src={items[21].img}/></div>
                        </li>
                        <li></li><li></li>
                        <li>
                            {/* 신발 */}
                            <div id={22} onClick={this.onClick}><img src={items[22].img}/></div>
                        </li>
                        <li>
                            {/* 안드로이드 */}
                            <div id={23} onClick={this.onClick}><img src={items[23].img}/></div>
                        </li>
                        <li>
                            {/* 기계 심장 */}
                            <div id={24} onClick={this.onClick}><img src={items[24].img}/></div>
                        </li>
                    </ul>
                    <div className='equipments-detail'>
                        <div className='equipment-title'>
                            <div className='equipment-item-box'> <img src={selectImg}/></div>
                            <div className='equipment-memo'>
                                <div>ITEM NAME</div>
                                <div> {title}</div>
                                <h3>{this.state.total} 점</h3>
                            </div>
                        </div>
                        <div className='equipment-body'>
                            <div className='equipment-body-title'>
                                <div className='equipments-title'><div></div> 유효 스탯 <div></div></div>
                                <div className='equipment-body-opt'>
                                    {option.map(({name, values}) => {
                                        return(<><div>{this.optionName(name)}</div><div>{values}</div></>)
                                    })}
                                    {soul.map(({name, values}) => {
                                        return(<><div>{this.optionName(name)}</div><div>{values}</div></>)
                                    })}
                                </div>
                            </div>
                            <div className='equipment-body-title'>
                                <div className='equipments-title'><div></div> 유효 잠재능력 <div></div></div>
                                <div className='equipment-body-opt'>
                                    {potential.map(({name, values}) => {
                                        return(<><div>{this.optionName(name)}</div><div>{values}</div></>)
                                    })}
                                </div>

                                <div className='equipments-title'><div></div> 유효 에디셔널 <div></div></div>
                                <div className='equipment-body-opt'>
                                    {additional.map(({name, values}) => {
                                        return(<><div>{this.optionName(name)}</div><div>{values}</div></>)
                                    })}
                                </div>

                        </div>
                        </div>
                        <div className='equipment-total'>
                            <div className='equipment-total-title'>총 아이템 점수</div>
                            <div className='equipment-total-score'>
                                <div>{total}</div>
                                <div>Extreme</div>
                            </div>
                            <div className='equipment-total-comments'>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='equipment-button-container'>
                    <button className='equipments-update-button' onClick={this.buttonClick}>{this.state.updateItems}</button>
                </div>
            </div>
        )
    }

}
export default Equipment