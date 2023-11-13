export default interface IMovie {
  large_cover_image: string;
  title: string;
  year: number;
  id: number;
  rating: number;
}

export interface IPaginationData {
  total_pages: number;
  movie_count: number;
  limit: number;
}

export async function searchMovie(
  query: string,
  page: number
): Promise<{ results: IMovie[]; pagination: IPaginationData } | undefined> {
  try {
    const encodeQuery = encodeURIComponent(query);
    const res = await fetch(`https://yts.mx/api/v2/list_movies.json?query_term=${encodeQuery}&page=${page}`, {
      method: 'GET',
      headers: {
        accept: 'application/json',
      },
    });
    const result = await res.json();
    console.log('API results', result.data.movies);
    console.log('Page', result.data.page_number);

    const totalPages = Math.ceil(result.data.movie_count / result.data.limit);

    return {
      results: result.data.movies,
      pagination: { total_pages: totalPages, movie_count: result.data.movie_count, limit: result.data.limit },
    };
  } catch (error) {
    console.error('Error in search movies: ', error);
    return;
  }
}

export async function getMovieById(movieId: number): Promise<IMovie | undefined> {
  try {
    const response = await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${movieId}`, {
      method: 'GET',
      headers: {
        accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Movie not found');
    }

    const result = await response.json();
    return result.data.movie;
  } catch (error) {
    console.error('Error:', error);
    return;
  }
}
