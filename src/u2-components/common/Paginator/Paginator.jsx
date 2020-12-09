import React from 'react'
import s from './Paginator.module.css'

export const Paginator = ({currentPage, onPageChanged, totalUsersCount, pageSize, ...props}) => {

   let pages = []
   for (let i = 505; i <= 525; i++) {
      pages.push(i)
   }

   return (
       <div>
          {pages.map(p => {
             return <span key={p.id}
                          className={currentPage === p && s.selectPage}
                          onClick={(e) => {
                             onPageChanged(p)
                          }}>{p}</span>
          })}
       </div>
   )
}
