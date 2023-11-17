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

  export interface SearchState {
    query: string;
    searchResults: IMovie[] | undefined;
    isLoading: boolean;
  }
  export interface SearchProps {
    updateSearchResults: (results: IMovie[] | undefined) => void;
  }

  export interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  }