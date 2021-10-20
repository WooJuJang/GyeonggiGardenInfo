import React, { useEffect, useState } from 'react';
import { PageUl, PageLi, PageSpan } from '../../css/GgGardenLocation/PaginationStyledContainer'
//페이징
type propsType={
  postsPerPage:number,
  totalPosts:number,
  paginate:React.Dispatch<React.SetStateAction<number>>,
  pagenm:boolean,
  _currentPage:number
}
const Pagination:React.FC<propsType> = ({ postsPerPage, totalPosts, paginate, pagenm,_currentPage }) => {

  const perPage = 3;
  const [currentPage, setCurrentPage] = useState(_currentPage)
  
  let indexofLast = currentPage * perPage;
  let indexOfFirst = indexofLast - perPage;

  const pageArray:number[] = [];
  const pageNumbers:number[] = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
    if ((i - 1) % 3 === 0) {
      pageArray.push(i)
    }
  }
  useEffect(() => {
    setCurrentPage(1)
  }, [pagenm])

  const decreaseIndex = ():void => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }
  const increaseIndex = ():void => {
    if (currentPage < pageArray.length) {
      setCurrentPage(currentPage + 1)
      _currentPage++;
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