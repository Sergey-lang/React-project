import React, {useState} from 'react'
import classnames from 'classnames'

import s from './Paginator.module.css'

export const Paginator = ({currentPage, onPageChanged, totalItemsCount, pageSize, portionSize = 10, ...props}) => {

   const pageCount = Math.ceil(totalItemsCount / pageSize)

   const pages = []
   for (let i = 1; i <= pageCount; i++) {
      pages.push(i)
   }

   const portionCount = Math.ceil(pageCount / portionSize)
   const [portionNumber, setPortionNumber] = useState(1)
   const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
   const rightPortionPageNumber = portionNumber * portionSize + 1

   const prevPortionNumberHandler = () => {
      setPortionNumber(portionNumber - 1)
   }

   const nextPortionNumberHandler = () => setPortionNumber(portionNumber + 1)

   return (
       <div>
          {portionNumber > 1
          && <button onClick={prevPortionNumberHandler}>PREV</button>}
          {pages
              .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
              .map(p => {
                 return <span key={p.id}
                              className={classnames({
                                 [s.selectPage]: currentPage === p
                              }, s.pageNumber)}
                              onClick={(e) => {
                                 onPageChanged(p)
                              }}>{p}</span>
              })}
          {portionCount > portionNumber
          && <button onClick={nextPortionNumberHandler}>NEXT</button>}
       </div>
   )
}
