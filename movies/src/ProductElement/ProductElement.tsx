import './ProductElement.scss';
import IMovie from '../Api/Api';
import  { useState } from 'react';
import ProductDetailed from '../ProductDetailed/ProductDetailed';
import { useNavigate } from 'react-router-dom';

function ProductElement({ movie }: { movie: IMovie }) {
  const navigate = useNavigate();

  const openModal = () => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <div className="product">
      <div className="img">
        <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt="" />
      </div>
      <div className="information">
        <h3>{movie.title}</h3>
        <p className="description">{`${movie.overview.slice(0, 70)}...`}</p>
        <p className="release_date">{movie.release_date}</p>
      </div>
      <button onClick={openModal}>View Details</button>
    </div>
  );
}

export default ProductElement;
