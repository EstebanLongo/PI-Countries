import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountries } from "../../redux/actions";
import { Link } from "react-router-dom";
import CountryCard from "../CountryCard/CountryCard";

export default function Home() {
  //esto es para usar la const dispatch e ir despachando mis acciones
  const dispatch = useDispatch();
  //esto es lo mismo que hacer el mapStateToProps
  const allCountries = useSelector((state) => state.countries);

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getCountries());
  }

  return (
    <div>
      <Link to="/activity">Crear Actividad</Link>
      <h1>HOME COUNTRIES PI</h1>
      <button
        onClick={(e) => {
          handleClick(e);
        }}
      >
        Volver a cargar todos los paises
      </button>

      <div>
        <span>Order by population</span>
        <select>
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
        </select>
      </div>

      <div>
        <span>Order by name</span>
        <select>
          <option value="az">A-Z</option>
          <option value="za">Z-A</option>
        </select>
      </div>

      <div>
        <span>Filter by activities</span>
        <select>
          <option value="all">All</option>
        </select>
        {console.log(allCountries)}
      </div>

      {allCountries
        ? allCountries.map((el) => {
            return (
              <div>
                <CountryCard
                  id={el.cca3}
                  name={el.name}
                  continent={el.continent}
                  flag={el.flag}
                />
              </div>
            );
          })
        : "Loading"}
    </div>
  );
}
