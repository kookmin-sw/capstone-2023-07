import React, {Component} from 'react';
import api from '../api';

class Banner extends Component {
    constructor(props){
        super(props);
        this.state = {
            updateButton:"갱신하기"
        }
    }

    onClick = (e) => {
        const {updateButton} = this.state

        if(updateButton === "갱신하기"){
            this.setState({updateButton:"갱신중"})

            api.update(this.props.user.name)
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
            alert('이미 갱신중 입니다.')
        }
    }

    getDay = () => {
        const { date } = this.props.user
        
        if(date === 0) return '마지막 갱신일: 오늘'
        if(date === 1) return '마지막 갱신일: 어제'
        if(date === null) return '갱신이 필요합니다'
        return '마지막 갱신일: ' + date + "일전"
    }

    render() {
        const { name, server, job, level, guild,union, achievements, dojang , seed, rank, date, image} = this.props.user
        const { updateButton } = this.state

        return (
            <div className='user-banner'>
                <div className='user-info-container'>
                    <div className='ranking-panel'>
                        <div className='row'>
                            <div className='panel'> 
                                <div className='panel-title'>유니온</div>
                                <div className='panel-element'>
                                    <div>{union.rank} 위</div>
                                    <div>LV. {union.level}</div>
                                </div>
                            </div>
                            <div className='panel'> 
                                <div className='panel-title'>업적</div>
                                <div className='panel-element'>
                                    <div>{achievements.grade}</div>
                                    <div>{achievements.points} 점</div>
                                </div>
                            </div>
                            <div className='panel'> 
                                <div className='panel-title'>무릉도장</div>
                                <div className='panel-element'>
                                    <div>{dojang.floor} 층</div>
                                    <div>{dojang.time}</div>
                                </div>
                            </div>
                            <div className='panel'> 
                                <div className='panel-title'>더 시드</div>
                                <div className='panel-element'>
                                    <div>{seed.floor} 층</div>
                                    <div>{seed.time}</div>
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='panel'> 
                                <div className='panel-title'>종합랭킹</div>
                                <div className='panel-element'>
                                    <div>{rank.rank_all} 위</div>
                                </div>
                            </div>
                            <div className='panel'> 
                                <div className='panel-title'>월드랭킹</div>
                                <div className='panel-element'>
                                    <div>{rank.rank_word} 위</div>
                                </div>
                            </div>
                            <div className='panel'> 
                                <div className='panel-title'>직업랭킹 (전체)</div>
                                <div className='panel-element'>
                                    <div>{rank.rank_job_all} 위</div>
                                </div>
                            </div>
                            <div className='panel'> 
                                <div className='panel-title'>직업랭킹 (월드)</div>
                                <div className='panel-element'>
                                    <div>{rank.rank_job_word} 위</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='user-info'>
                        <ul>
                            <li>
                                <img src='./img/icon_charName.png'/> 
                                <div>{name}</div>
                            </li>
                            <li>
                                <img src='./img/icon_server.png'/> 
                                <div>{server}</div>
                            </li>
                            <li>
                                <img src='./img/icon_job.png'/> 
                                <div>{job.split('\/')[1]}</div>
                            </li>
                            <li>
                                <img src='./img/icon_lv.png'/> 
                                <div>{level}</div>
                            </li>
                            <li>
                                <img src='./img/icon_guild.png'/> 
                                <div>{guild}</div>
                            </li>
                        </ul>
                        <div className='user-info-char button-container'>
                            <img src={image}/>
                            <div className='last-update'>
                                {this.getDay()}
                            </div>
                            <button onClick={this.onClick}>{updateButton}</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Banner