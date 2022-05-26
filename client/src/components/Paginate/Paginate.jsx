import React from "react";
import styles from "./paginate.module.css";

export default function Paginate({ countriesPerPage, allCountries, paginado }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allCountries / countriesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ol className={styles.paginadoCont}>
        {pageNumbers?.map((number) => (
          <li key={number} className={styles.liNum1}>
            <button className={styles.liNum} onClick={() => paginado(number)}>
              {number}
            </button>
          </li>
        ))}
      </ol>
    </nav>
  );
}
