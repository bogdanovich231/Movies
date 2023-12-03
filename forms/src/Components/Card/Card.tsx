import { ICardValues } from "../../Interfaces/Interfaces";
import "./Card.scss";

const Card: React.FC<ICardValues> = ({ data }) => {
    return (
        <div className="card">
            <h2>Information:</h2>
            <p>Name: {data.name}</p>
            <p>Age: {data.age}</p>
            <p>Email: {data.gmail}</p>
            <p>Gender: {data.gender}</p>
            <p>Country: {data.country}</p>
            <p>Password: {data.password}</p>
            <img src={data.image} alt="User Image" />
        </div>
    );
};

export default Card;