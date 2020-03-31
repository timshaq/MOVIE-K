import React from 'react';

const MoviePages = ({total_pages, counter_page, getNextPage, getPrevPage}) => {
  return (
    <div className="d-flex justify-content-between align-items-center">
      <button
      type="button"
      disabled={counter_page === 1 ? "disabled" : ""}
      className={`btn ${counter_page !== 1 ? "btn-link" : ""}`}
      onClick={getPrevPage}
      >
      Back
      </button>
      <span>{counter_page}/{total_pages}</span>
      <button
      type="button"
      disabled={counter_page === total_pages ? "disabled" : ""}
      className={`btn ${counter_page !== total_pages ? "btn-link" : ""}`}
      onClick={getNextPage}
      >
      Next
      </button>
    </div>
  )
}

export default MoviePages;
