import React from 'react';

const MovieTabs = ({ sortBy, updateSortBy, updateLang }) => {
  const handleClick = value => () => {
    updateSortBy(value)
  }
  const getClassName = value => {
    return `cursor-pointer nav-link ${ sortBy.sort === value ? "active" : "" }`
  }

  const setLang = value => () => {
    updateLang(value)
  }
  return (
      <div
      className="d-flex justify-content-between">
        <ul className="tabs nav nav-pills col-9">
          <li className="nav-item">
            <div
            className={getClassName("popularity.desc")}
            onClick={ handleClick("popularity.desc") }
            >
              {sortBy.lang === "en-US" ? "Popularity desc" : "Популярные"}
            </div>
          </li>
          <li className="nav-item">
            <div
            className={getClassName("revenue.desc")}
            onClick={ handleClick("revenue.desc") }
            >
              {sortBy.lang === "en-US" ? "Revenue desc" : "Кассовые"}
            </div>
          </li>
          <li className="nav-item">
            <div
            className={getClassName("vote_average.desc")}
            onClick={ handleClick("vote_average.desc") }
            >
              {sortBy.lang === "en-US" ? "Vote average desc" : "Высшая оценка"}
            </div>
          </li>
        </ul>
        <ul className="tabs nav nav-pills border rounded tab--lang">
        <li className="nav-item">
          <div
          className={sortBy.lang === "ru-RU" ? "btn btn-success" : "btn" }
          onClick={ setLang("ru-RU") }
          >
            RU
          </div>
        </li>
        <li className="nav-item">
          <button
          className={sortBy.lang === "en-US" ? "btn btn-success" : "btn" }
          onClick={setLang("en-US")}
          >
            EN
          </button>
        </li>

        </ul>
      </div>
  )
}

export default MovieTabs
