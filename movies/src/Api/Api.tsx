export default interface IMovie {
  backdrop_path: string;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  id: number;
  popularity: number;
}
interface IPaginationData {
  total_pages: number;
}
export async function searchMovie(
  query: string,
  page: number
): Promise<{ results: IMovie[]; pagination: IPaginationData } | undefined> {
  console.log('1', query);
  try {
    const encodeQuery = encodeURIComponent(query);
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${encodeQuery}&include_adult=false&language=en-US&page=${page}`,
      {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNjA1YjRhODFjMjU2NDQxNmExNTc1YWEwOTI2ZmU3OSIsInN1YiI6IjY1MzdkODNiOTQ2MzE4MDBjNmI1Y2QxNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oITUDrSa7ve95U8-sdoLOeBDix1lJSWuteg1ki3q3A8',
        },
      }
    );
    const result = await res.json();
    console.log('api results', result.results);
    console.log('Page', result.total_pages);
    return { results: result.results, pagination: { total_pages: result.total_pages } };
  } catch (error) {
    console.error('Error in search books: ', error);
    return;
  }
}

export async function getMovieById(movieId: number): Promise<IMovie | undefined> {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNjA1YjRhODFjMjU2NDQxNmExNTc1YWEwOTI2ZmU3OSIsInN1YiI6IjY1MzdkODNiOTQ2MzE4MDBjNmI1Y2QxNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oITUDrSa7ve95U8-sdoLOeBDix1lJSWuteg1ki3q3A8',
      },
    });

    if (!response.ok) {
      throw new Error('Movie not found');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error:', error);
    return;
  }
}
