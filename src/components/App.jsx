import React from "react";
import MovieItem from "./MovieItem";
import MovieListWillWatch from "./MovieListWillWatch";
import { API_URL, API_KEY_3 } from "../utils/api";
import MovieTabs from './MovieTabs';
import MoviePages from './MoviePages';


class App extends React.Component {
  constructor() {
    console.log('constructor')
    super();
    this.state = {
      movies: [],
      moviesWillWatch: [],
      sort_by: {lang: "en-US", sort: "popularity.desc", counter_page: 1},
      total_pages: ""
    }
  }
  componentDidMount() {
    console.log('DidMount')
    this.getMovies()
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.sort_by !== this.state.sort_by) {
      this.getMovies()
    }
  }
  getMovies = () => {
    let reg = this.state.sort_by.lang.replace(/[a-z]{2}-/,"")
    fetch(`${API_URL}/discover/movie?api_key=${API_KEY_3}&sort_by=${this.state.sort_by.sort}&language=${this.state.sort_by.lang}&region=${reg}&page=${this.state.sort_by.counter_page}`).then((response) => {
      return response.json()
    }).then((data) => {
      console.log("data")
      console.log(data)
      this.setState({
        movies: data.results,
        total_pages: data.total_pages
    })
  })
  }
  delMovie = (mov) => {
    const updateMovies = this.state.movies.filter(function (item) {
      return item.id !== mov.id
    })
    this.setState({
      movies: updateMovies
    })
  }
  addWishList = (mov) => {
    this.setState({
      moviesWillWatch: [...this.state.moviesWillWatch, {id: mov.id, title: mov.title, rate: mov.vote_average}]
    })
  }
  delWishList = (mov) => {
    const updateMovies = this.state.moviesWillWatch.filter(function (item) {
      return item.id !== mov.id
    })
    this.setState({
      moviesWillWatch: updateMovies
    })
  }
  updateSortBy = value => {
    this.setState({
      sort_by: {lang: this.state.sort_by.lang, sort:value, counter_page: 1}
    })
  }
  updateLang = value => {
    this.setState({
      sort_by: {lang: value, sort: this.state.sort_by.sort, counter_page: this.state.sort_by.counter_page}
    })
  }
  getNextPage = () => {
    this.setState({
      sort_by: {lang: this.state.sort_by.lang, sort: this.state.sort_by.sort, counter_page: (this.state.sort_by.counter_page+1)}
    })
  }
  getPrevPage = () => {
    this.setState({
      sort_by: {lang: this.state.sort_by.lang, sort: this.state.sort_by.sort, counter_page: (this.state.sort_by.counter_page-1)}
    })
  }
  render() {
    console.log('render')
    return <MovieList state = {this.state}
                      addWishList={this.addWishList}
                      delWishList={this.delWishList}
                      delMovie={this.delMovie}
                      sortBy={this.state.sort_by}
                      updateSortBy={this.updateSortBy}
                      updateLang={this.updateLang}
                      total_pages={this.state.total_pages}
                      counter_page={this.state.sort_by.counter_page}
                      getNextPage={this.getNextPage}
                      getPrevPage={this.getPrevPage}
                      />;
  }
}


class MovieList extends React.Component {
  render() {
    const stateApp = this.props.state
    let wishLength = stateApp.moviesWillWatch.length;
    console.log("this.state:");
    console.log(this.props.state);
    return (
      <div className="container">
        <div className="row mt-4">
          <div className="col-lg-9 col-md-9 col-sm-12">
            <div className="row mb-4">
              <div className="col-12">
                < MovieTabs sortBy={ stateApp.sort_by }
                            updateSortBy={ this.props.updateSortBy }
                            updateLang={this.props.updateLang}/>
              </div>
            </div>
            <div className="row mb-4">
              <div className="col-12">
                <MoviePages
                            total_pages={stateApp.total_pages}
                            counter_page={stateApp.sort_by.counter_page}
                            getNextPage={this.props.getNextPage}
                            getPrevPage={this.props.getPrevPage}
                            />
              </div>
            </div>
            <div className="row">
              {stateApp.movies.map((mov, i) => {
                return <MovieItem mov={mov} key={mov.id} wish={stateApp.moviesWillWatch} addWishList={this.props.addWishList} delWishList={this.props.delWishList} delMovie={this.props.delMovie}/>;
              })}
            </div>
            <div className="row mb-4">
              <div className="col-12">
                <MoviePages
                            total_pages={stateApp.total_pages}
                            counter_page={stateApp.sort_by.counter_page}
                            getNextPage={this.props.getNextPage}
                            getPrevPage={this.props.getPrevPage}
                            />
              </div>
            </div>
          </div>
          
          <div
          className="col-lg-3 col-md-3 side-bar--right d-lg-block d-md-block  d-sm-none"
          >
            <div style={ {'position': 'fixed'} }>
              <h4 className="col-12">{stateApp.sort_by.lang === "en-US" ? "Will Watch" : "Буду смотреть" }: { wishLength } {wishLength>1? "movies" : "movie"} </h4>
              <ul
              className="list-group"
              >
              { stateApp.moviesWillWatch.map( (wish, i) => {
                return <MovieListWillWatch wish = { wish } key = { i } i = { i } />
              } ) }
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
