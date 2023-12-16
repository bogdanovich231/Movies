export default interface IMovie {
  large_cover_image: string;
  title: string;
  year: number;
  id: number;
  rating: number;
  description_full: string;
  genres: [string];
  yt_trailer_code: string;
}

export interface IPaginationData {
  total_pages: number;
  movie_count: number;
  limit: number;
}
export interface IDataResponse {
  movies: IMovie[];
  total_pages: number;
  movie_count: number;
  limit: number;
}
export interface CatalogProductsProps {
  searchResults: { results: IMovie[]; pagination: IPaginationData } | IMovie[];
  isLoading: boolean;
  currentPage: number;
}
export interface RootState {
  catalog: CatalogProductsProps;
}
export interface SearchProps {
  updateSearchResults: (results: IMovie[] | undefined) => void;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
export interface MovieDetailsState {
  movie: IMovie | null;
  loading: boolean;
}

export interface IGenresState {
  genres: string[];
  selectedGenre: string | null;
  moviesByGenre: { [key: string]: IMovie[] };
}