import React, {Component} from 'react';

class OpenProfile extends Component {
    constructor(props){
        super(props);
    }

    render() {
        const {username} = this.props
        return(
            <div>
                <div className="default-page">
                    <div className='default-banner banner-speaker'>
                        <div className='color-black'>△ 아이템 점수화</div>
                    </div>
                    <div className='bean-body'>
                        <div className='belly'>
                            <div className='openProfile-title'>캐릭터 정보 공개 설정</div>
                            <div className='openProfile-belly-container'>
                                <div className='openProfile-h'>1. 메이플스토리 홈페이지 로그인  &gt;  마이메이플을 클릭해주세요</div>
                                <img src='/img/img_num1.png'/>
                                <div className='openProfile-h'>2. 내 정보 관리 메뉴 증 ‘캐릭터 정보 공개설정’을 클릭해주세요</div>
                                <img src='/img/img_num2.png'/>
                                <div className='openProfile-h'>3. 해당 메이플 아이디 및 캐릭터  후  ‘캐릭터 정보’ 탭에서 장비 클릭 후 저장해주세요</div>
                                <div style={{display:'flex'}}>
                                    <img style={{width: '576px', height: '690px', marginRight:'12px'}} src='/img/img_num3_1.png'/>
                                    <img style={{width: '537px', height: '464px'}} src='/img/img_num3_2.png'/>
                                </div>
                                <div className='openProfile-h'>4. 저장 후, PinkBean.kr로 돌아오면 ‘아이템 기댓값’ 기능을 사용할 수 있게 됩니다.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default OpenProfile