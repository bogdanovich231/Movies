import { doc, setDoc, getDoc, arrayUnion } from 'firebase/firestore';
import { db } from './auth';

const favoritesCollection = (userId: string) => doc(db, 'favorites', userId);

export const addToFavorites = async (uid: string, movieId: string) => {
  try {
    const userFavoritesRef = favoritesCollection(uid);
    await setDoc(
      userFavoritesRef,
      {
        favorite: arrayUnion(movieId),
      },
      { merge: true }
    );
  } catch (error) {
    console.error('Error adding to favorites:', error);
  }
};

export const getFavorites = async (uid: string) => {
  try {
    const userFavoritesRef = favoritesCollection(uid);
    const userFavoritesDoc = await getDoc(userFavoritesRef);

    if (userFavoritesDoc.exists()) {
      return userFavoritesDoc.data()?.favorite || [];
    } else {
      return [];
    }
  } catch (error) {
    console.error('Error getting favorites:', error);
    return [];
  }
};
