import React from 'react'
import styles from './filters.module.css'

export default function(){

    return(
        <div className={styles.orders}>
        <span>Filter by activities</span>
        <br/>
        <select>
          <option value="all">All</option>
        </select>
      </div>
    )
}