import './WelcomeHeader.css';

function WelcomeHeader() {
    return (
        <div className="welcomeHeader">
            <div className="welcomeOverlay">
                <h1 className="welcomeTitle">Welcome to <span>CineLog</span></h1>
                <p className="welcomeSubtitle">
                    Dive into the world of cinema, curate your watchlist, and connect with a community of cinephiles.                
                </p>
            </div>
        </div>
    );
}

export default WelcomeHeader;
