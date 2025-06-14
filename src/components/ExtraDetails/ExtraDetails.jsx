import './ExtraDetails.css';

function ExtraDetails({ details, isLoading }) {
    if (isLoading || !details) return null;

    const currencyFormat = (num) =>
        num?.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

    return (
        <div className="horizontalCardsCarousel"> 
            <h2 className="extra-title">Extra Details</h2>
            <div className="extra-details">
                <div className="detail-item">
                    <span className="label">Budget:</span>
                    <span className="value">{currencyFormat(details.budget)}</span>
                </div>
                <div className="detail-item">
                    <span className="label">Revenue:</span>
                    <span className="value">{currencyFormat(details.revenue)}</span>
                </div>
                <div className="detail-item">
                    <span className="label">Production Company:</span>
                    <span className="value">{details.production_companies?.[0]?.name || "N/A"}</span>
                </div>
                <div className="detail-item">
                    <span className="label">Language:</span>
                    <span className="value">{details.spoken_languages?.[0]?.english_name || "N/A"}</span>
                </div>
                <div className="detail-item">
                    <span className="label">Runtime:</span>
                    <span className="value">
                        {Math.floor(details.runtime / 60)}h {details.runtime % 60}m
                    </span>
                </div>
            </div>
        </div>
    );
}

export default ExtraDetails;
