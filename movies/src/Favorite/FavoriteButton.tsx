import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { addToFavorites } from '../Helper/favorites';
import { RootState } from '../store/store';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import favoriteButton from '../assets/heart.svg';
import './Favorite.scss';

function FavoriteButton() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser);
    });

    return () => unsubscribe();
  }, []);

  const movieId = useSelector((state: RootState) => state.rootReducer.movieDetails.movie?.id);

  if (!user) {
    return (
      <div>
        <p>You're not logged in</p>
      </div>
    );
  }

  const uid = user.uid;

  const handleAddToFavorites = () => {
    if (movieId) {
      addToFavorites(uid, movieId.toString());
    }
  };

  return (
    <button className="favorite_button" onClick={handleAddToFavorites}>
      <img src={favoriteButton} alt="favorite" />
    </button>
  );
}

export default FavoriteButton;
