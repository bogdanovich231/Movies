import { useEffect, useState } from "react";
import { searchMovie } from "../Api/Api";

function Pagination({ totalPages, searchQuery, updateSearchResults }: { totalPages: number; searchQuery: string; updateSearchResults: Function }) {
  const [pageNum, setPageNum] = useState(1);

  const nextPage = () => {
    if (pageNum < totalPages) {
      setPageNum(pageNum + 1);
      searchAndUpdateResults(searchQuery, pageNum + 1);
    }
  };
  const previousPage = () => {
    if (pageNum !== 1) {
      setPageNum(pageNum - 1);
      searchAndUpdateResults(searchQuery, pageNum - 1);
    }
  };
  const goToPage = (page: number) => {
    setPageNum(page);
    searchAndUpdateResults(searchQuery, page);
  };

  const searchAndUpdateResults = (query: string, page: number) => {
    console.log('Query:', query);
    searchMovie(query, page)
      .then((data) => {
        if (data) {
          updateSearchResults(data.results);
        }
      });
  };
  
  useEffect(() => {
    if (searchQuery) {
      console.log("Search Query in Pagination", searchQuery);
      console.log("Page Number", pageNum);
      searchAndUpdateResults(searchQuery, pageNum); 
    }
  }, [searchQuery, pageNum, updateSearchResults]);

  return (
    <div>
      <button onClick={previousPage} style={{ marginLeft: "28%" }}>
        Previous Page
      </button>
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          onClick={() => goToPage(index + 1)}
          style={{ marginLeft: "0%", fontWeight: pageNum === index + 1 ? "bold" : "normal" }}
        >
          {index + 1}
        </button>
      ))}
      <button onClick={nextPage} style={{ marginLeft: "0%" }}>
        Next Page
      </button>
    </div>
  );
}

export default Pagination;
