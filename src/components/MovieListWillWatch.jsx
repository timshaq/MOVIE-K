import React from "react";

const MovieListWillWatch = ({ wish }) => {
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
}

export default MovieListWillWatch;
