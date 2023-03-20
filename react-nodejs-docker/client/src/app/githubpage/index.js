import './index.css';

function Githubpage() {
    const GithubButton = () => {
        window.open('https://github.com/kookmin-sw/capstone-2023-07', '_blank')
    }
    return(
        <div>
            <div className="githubpage-header">
                <div className="header-horn">
                    <div className="left-horn"></div>
                    <div className="githubpage-title">
                        <div>Capstone_2023_07</div>
                    </div>
                    <div className="right-horn"></div>
                </div>
                <div className="githubpage-subtitle">종합 게임 검색 사이트 ‘Pink Bean’</div>
                <div className="githubpage-button-container">
                    <button type='button' onClick={GithubButton}>GitHub</button>
                </div>
            </div>
        </div>
    )
}

export default Githubpage