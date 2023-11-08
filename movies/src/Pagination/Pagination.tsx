import { useEffect, useState } from "react";
import { searchMovie } from "../Api/Api";

function Pagination({ total_pages, query, updateSearchResults }: { total_pages: number; query: string; updateSearchResults: Function }) {
  const [page_num, setPageNum] = useState(1);

  const nextPage = () => {
    if (page_num < total_pages) {
      setPageNum(page_num + 1);
      searchAndUpdateResults(query, page_num + 1, total_pages);
    };
  }
  
  const previousPage = () => {
    if (page_num > 1) {
      setPageNum(page_num - 1);
      searchAndUpdateResults(query, page_num - 1, total_pages);
    };  
  }
    const goToPage = (page: number) => {
    setPageNum(page);
    console.log("goo to page:", page)
  };

  useEffect(() => {
    if (query) {
      searchAndUpdateResults(query, page_num, total_pages);
    }
    console.log("searchAndUpdateResults:", query , page_num)
  }, [query, page_num]);

  const searchAndUpdateResults = (query: string, page: number, total_pages: number) => {
    searchMovie(query, page)
      .then((data) => {
        if (data) {
          updateSearchResults(data.results);
        }
      });
  };

  useEffect(() => {
    if (total_pages > 0 && page_num > total_pages) {
      setPageNum(total_pages);
      console.log("total_pages",total_pages)
    }
  }, [total_pages, page_num]);

  return (
    <div>
      <button onClick={previousPage} style={{ marginLeft: "28%" }}>
        Previous Page
      </button>
      {Array.from({ length: total_pages }, (_, index) => (
        <button
          key={index + 1}
          onClick={() => goToPage(index + 1)}
          style={{ marginLeft: "0%", fontWeight: page_num === index + 1 ? "bold" : "normal" }}
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
