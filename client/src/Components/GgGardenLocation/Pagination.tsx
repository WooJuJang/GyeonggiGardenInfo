import React, { useEffect, useState } from 'react';
import { PageUl, PageLi, PageSpan } from '../../css/GgGardenLocation/PaginationStyledContainer'
//페이징
const Pagination = ({ postsPerPage, totalPosts, paginate, pagenm }: any) => {

  const perPage = 5;
  const [currentPage, setCurrentPage] = useState(pagenm)

  let indexofLast = currentPage * perPage;
  let indexOfFirst = indexofLast - perPage;
  const pageArray = [];
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
    if ((i - 1) % 5 === 0) {
      pageArray.push(i)
    }
  }
  useEffect(() => {
    setCurrentPage(1)
  }, [pagenm])
  const decreaseIndex = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }
  const increaseIndex = () => {
    if (currentPage < pageArray.length) {
      setCurrentPage(currentPage + 1)
      pagenm++;
    }
  }

  const splitPageNumbers = pageNumbers.slice(indexOfFirst, indexofLast)

  return (

    <div className="pageForm">
      <PageUl className="pagination">
        <button onClick={decreaseIndex} className='decreaseBtn'> ◀️ </button>
        {splitPageNumbers.map(number => (
          <PageLi key={number} className="page-item">
            <PageSpan onClick={() => paginate(number)} className="page-link">
              {number}
            </PageSpan>
          </PageLi>
        ))}

        <button onClick={increaseIndex} className='increaseBtn'> ▶️ </button>
      </PageUl>


    </div>
  );
};

export default Pagination;