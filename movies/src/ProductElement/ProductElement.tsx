import "./ProductElement.scss"
import photo from "../assets/background.jpg"
function ProductElement() {
    return (
        <div className="product">
            <div className="img">
                <img src={photo} alt="" />
            </div>
            <div className="information">
                <h3>Name</h3>
                <p className="description">
                    Описание фильма короткое .
                </p>
                <p className="release_date">
                    15.02.2023
                </p>
            </div>
        </div>
    )
}

export default ProductElement;