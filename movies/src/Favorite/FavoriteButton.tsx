import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { addToFavorites } from '../Helper/favorites';
import { RootState } from '../store/store';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import favoriteButton from '../assets/heart.svg';

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
      console.log('Uid: ', uid);
      console.log('MovieId: ', movieId);
    }
  };

  return (
    <button onClick={handleAddToFavorites}>
      <img src={favoriteButton} alt="" />
    </button>
  );
}

export default FavoriteButton;
