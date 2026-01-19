import React from 'react'
import './Pagination.css'

function Pagination({ currentPage, totalPages, onPageChange }) {
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page)
    }
  }

  const renderPageNumbers = () => {
    const pages = []
    const maxVisiblePages = 3

    if (currentPage > 1) {
      pages.push(
        <button
          key={1}
          className={`pagination-number ${currentPage === 1 ? 'active' : ''}`}
          onClick={() => handlePageChange(1)}
        >
          1
        </button>
      )
    } else {
      pages.push(
        <button key={1} className="pagination-number active">
          1
        </button>
      )
    }

    for (let i = 2; i <= Math.min(maxVisiblePages, totalPages); i++) {
      pages.push(
        <button
          key={i}
          className={`pagination-number ${currentPage === i ? 'active' : ''}`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      )
    }

    return pages
  }

  return (
    <div className="pagination">
      {renderPageNumbers()}

      {currentPage < totalPages && (
        <>
          <button
            className="pagination-arrow"
            onClick={() => handlePageChange(currentPage + 1)}
            aria-label="Наступна сторінка"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button
            className="pagination-arrow"
            onClick={() => handlePageChange(totalPages)}
            aria-label="Остання сторінка"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M7 18L13 12L7 6M13 18L19 12L13 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </>
      )}
    </div>
  )
}

export default Pagination
