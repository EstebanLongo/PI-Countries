import React from "react";

export default function Paginate({ countriesPerPage, allCountries, paginado }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allCountries / countriesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ol>
        {pageNumbers?.map((number) => (
          <button key={number} onClick={() => paginado(number)}>
            {number}
          </button>
        ))}
      </ol>
    </nav>
  );
}
