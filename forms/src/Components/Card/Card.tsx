import { ICardValues } from "../../Interfaces/Interfaces";

const Card: React.FC<ICardValues> = ({ data }) => {
    return (
        <div className="card">
            <h2>Name: {data.name}</h2>
            <p>Age: {data.age}</p>
            <p>Email: {data.gmail}</p>
            <p>Gender: {data.gender}</p>
            <p>Country: {data.country}</p>
            <img src={data.image} alt="User Image" />
        </div>
    );
};

export default Card;