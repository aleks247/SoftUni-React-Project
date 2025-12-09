import './Card.css'

export default function ProductCard({
    _id,
    _ownerId,
    title,
    imageUrl,
    price,
    category,
    description,
}) {
    return (
        <>
            <div className="card">
                <div className="card__shine"></div>
                <div className="card__glow"></div>
                <div className="card__content">
                    <div className="card__badge">NEW</div>
                    <div className="card__image"><img src={imageUrl} alt="" /></div>
                    <div className="card__text">
                        <p className="card__title">{title}</p>
                        <p className="card__description">
                            {description}
                        </p>
                    </div>
                    <div className="card__footer">
                        <div className="card__price">${price}</div>
                        <div className="card__button">
                            <svg height="16" width="16" viewBox="0 0 24 24"><path strokeWidth="2"stroke="currentColor"d="M4 12H20M12 4V20"fill="currentColor"></path></svg>
                        </div>
                        {/* <button>Add to cart</button> */}
                    </div>
                </div>
            </div>
        </>
    );
}
