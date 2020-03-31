import React from "react";

class MovieItem extends React.Component {
  constructor() {
    super();
    this.state = {
      like: false
    }
  }
  toggleLike = () => {
    this.setState({
      like: !this.state.like
    })
    this.state.like ? this.props.delWishList(this.props.mov) : this.props.addWishList(this.props.mov)
  }
  render() {
    const urlImage = () => {
      if (this.props.mov.poster_path === null) {
        if (this.props.mov.backdrop_path === null) {
          return "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRX9AXxMT93fG0ievw-NwSDqwg-Hkerpfdc1FRyP2gP2Vo6_wZf"
        } else {
          return `https://image.tmdb.org/t/p/w500${this.props.mov.backdrop_path}`
        }
      } else {
        return `https://image.tmdb.org/t/p/w500${this.props.mov.poster_path}`
      }
    };
    return (
        <div className="col-4 mb-4">
          <div  className="card">
            <img
              className="card-img-top card-image"
              src={urlImage()}
              alt={this.props.mov.title}
            />
            <div className="card-body">
              <h6 className="card-title">{this.props.mov.title}</h6>
              <div className="d-flex justify-content-between align-items-center">
                <p className="mb-0">Rating: {this.props.mov.vote_average}</p>
                <button
                className= {this.state.like ? "btn btn-success" : "btn btn-secondary"}
                type="button"
                onClick= { this.toggleLike }
                >
                  {this.state.like ? "Remove" : "Add"}
                </button>
              </div>
            </div>
            <button
            className="btn"
            type="button"
            onClick={() => {this.props.delMovie(this.props.mov)} }
            >
            Delete</button>
          </div>
        </div>

    )
  }
}

export default MovieItem;
