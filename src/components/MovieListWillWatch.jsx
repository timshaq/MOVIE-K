import React from "react";

class MovieListWillWatch extends React.Component {
  constructor() {
    super();
    this.state = {
      popup: false
    }
  }
  togglePopup = () => {
    this.setState( {
      popup: (this.state.popup) ? false : true
    })
  }
  closePopup = () => {
    if (this.state.popup) {
      this.togglePopup()
    }
  }
  render() {
    return (
    <div className="wish-list">
      <div
          className="star-container"
          onClick={ this.togglePopup }
          title="Буду смотреть">
        <img src="http://frontend-shakirov.online/star.png" alt="" className="star-container__img" />
        <span className="star-container__counter">{this.props.wishLength}</span>
      </div>

      <div
      className={(this.state.popup) ? "wish-list__popup" : "d-none"}
      onClick={ this.closePopup }
      >
        <div className="popup__block">
          <img src="http://frontend-shakirov.online/img/close-form.png" alt="Close"
              className="block__close"
              onClick={this.togglePopup}
              />
          <h4 className="">{this.props.lang === "en-US" ? "Will Watch" : "Буду смотреть" }: { this.props.wishLength } {this.props.wishLength>1? "movies" : "movie"} </h4>
          <ul
          className="list-group"
          >
          { this.props.moviesWillWatch.map( (wish, i) => {
            return (
                <li className="list-group-item"
                >
                  <div
                  className="d-flex justify-content-between">
                    <div
                    >
                    { wish.title }
                    </div>
                    <div>{ wish.rate }</div>
                  </div>
                </li>
              )
          } ) }
          </ul>
          </div>
      </div>

    </div>
)
  }

}

export default MovieListWillWatch;
