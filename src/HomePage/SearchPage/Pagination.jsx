export default function Pagination ({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const renderPageButtons = () => {
    const buttons = [];
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          className={`pagination-button ${i === currentPage ? 'active' : ''}`}
          onClick={() => onPageChange(i)}
          aria-label={`Go to page ${i}`}
          aria-current={i === currentPage ? 'page' : undefined}
        >
          {i}
        </button>
      );
    }

    return buttons;
  };

  return (
    <div className="pagination-container">
      <div className="pagination">
        <button
          className="pagination-button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Go to previous page"
        >
          Previous
        </button>
        
        {renderPageButtons()}
        
        <button
          className="pagination-button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Go to next page"
        >
          Next
        </button>
        
        <span className="page-info">
          Page {currentPage} of {totalPages}
        </span>
      </div>
    </div>
  );
};