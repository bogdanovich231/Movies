import { Component } from 'react';
import './App.scss';
import CatalogProducts from './CatalogProducts/CatalogProducts';
import Header from './Header/Header';
import IMovie from './Api/Api';


class App extends Component {
  state = {
    searchResults: [],
  };

  updateSearchResults = (results: IMovie[] | undefined) => {
    this.setState({ searchResults: results || [] });
    console.log("update", results)
  }

  render() {
    return (
      <div className="banner_start">
        <Header updateSearchResults={this.updateSearchResults} />
        <h2 className="title"> We provide detailed descriptions of each film, trailers, ratings, and reviews to help you make an informed decision about which movie to watch.</h2>
        <CatalogProducts searchResults={this.state.searchResults} />
      </div>
    );
  }
}

export default App;
