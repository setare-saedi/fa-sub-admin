import ReactPaginate from "react-paginate";
import './Pagination.css'
export default function Pagination({pageCount, handlePageClick}) {

    
    return(
        <ReactPaginate
        previousLabel='<<'
        nextLabel='>>'
        breakLabel="..."
        pageCount={pageCount}
        pageRangeDisplayed={3}
        onPageChange={data => handlePageClick(data.selected)}
        containerClassName='pagination'
        pageLinkClassName='pagination-item'
        previousClassName='pagination-item'
        nextClassName='pagination-item'
        activeClassName='pagination-active'
      />
    )
}