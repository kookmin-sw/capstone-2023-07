import React, {Component} from 'react';
import api from '../api';

import Banner from './banner'
import Equipment from './equipment'

class User extends Component {
    constructor(props){
        super(props);
        this.state = {
            total:0,
            itmes:[],
            user:{
                name:'-',
                level:'-',
                job:'-',
                server:'-',
                guild:'-',
                image:'-',
                date:'-',
                rank: {
                    rank_all:'-',
                    rank_word:'-',
                    rank_job_all:'-',
                    rank_job_word:'-'
                },
                seed: {
                    floor:'-',
                    time:'-',
                    rank:'-',
                    rank_word:'-',
                    date:'-'
                },
                dojang: {
                    floor:'-',
                    time:'-',
                    rank:'-',
                    rank_word:'-',
                    date:'-'
                },
                achievements: {
                    grade:'-',
                    image:'-',
                    points:'-',
                    rank:'-',
                    date:'-'
                },
                union: {
                    grade:'-',
                    level:'-',
                    rank:'-',
                    rank_word:'-',
                    power:'-',
                    date:'-'
                }
            },
            isItems : false,
            updateItems:'아이템 갱신하기 ▷'
        }
    }

    async componentDidMount() {
        const {username} = this.props
        const user = await api.isUser(username)
        const items = await api.getItems(username)
        this.setState({
            user:user.values.charInfo,
            itmes: (items.state === "succsess") ? items.values : [],
            total: items.total
        })
    }
    
    onClick = (e) => {
        const {username} = this.props
        if(this.state.updateItems === '아이템 갱신하기 ▷') {
            this.setState({updateItems:'아이템 갱신중 ▷'})
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

    Failed = () => {
        return(
            <div className='item-search-failed'>
                <div>아이템 정보가 공개되어 있지 않습니다 <br/> <mark>장비 아이템 정보가</mark> 공개된 캐릭터만 해당 기능을 사용할 수 있습니다. <br/><br/><br/>
                ▷ 위 플랫폼은 홈페이지 정보 공개를 기반으로 하기 때문에 아이템 정보가 타인에게 공개가 될 수 있습니다</div>
                <button className='item-search-open-button' onClick={()=> {window.location.href = '/openProfile'}}>캐릭터 정보 공개 허용하러 가기 ▶</button>
                <button className='equipments-update-button' onClick={this.onClick}>{this.state.updateItems}</button>
            </div>
        )
    }

    render() {
        const { Failed } = this
        const { itmes, total, user } = this.state

        return(
            <div>
                <div className="default-page user-page">
                    <Banner user={user}/>
                    <div className='bean-body'>
                        <div className='belly'>
                            {itmes.length > 0 ?
                                <Equipment items={itmes} total={total} job={user.job} username={this.props.username}/>
                                :<Failed/>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default User