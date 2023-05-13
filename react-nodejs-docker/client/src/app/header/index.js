
function Githubpage() {
    const GithubButton = () => {
        window.open('https://github.com/kookmin-sw/capstone-2023-07', '_blank')
    }
    return(
        <div className="main-header">
            <div>
                <div>
                    <img src="./img/logo.png"/>
                </div>
                <div className="search-container">
                    <input type="text"></input>
                </div>
            </div>
            
        </div>
    )
}

export default Githubpage