import React, {Component} from 'react';

class SearchFailed extends Component {
    constructor(props){
        super(props);
    }

    render() {
        const {username} = this.props
        return(
            <div>
                <div className="default-page search-failed-page">
                    <div className='default-banner'>
                        <div>△ 캐릭터 검색 결과</div>
                    </div>
                    <div className='bean-body'>
                        <div className='belly'>
                            <div className='belly-title'>
                                ‘{username}’ 님의 검색 결과
                            </div>
                            <div className='search-failed-box'>
                                <div className='bold'>해당 캐릭터를 찾을 수 없습니다</div>
                                <div>캐릭터 명을 다시 한 번 확인해주세요</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SearchFailed