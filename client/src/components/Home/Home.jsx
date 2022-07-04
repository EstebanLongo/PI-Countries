import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByContinent, getCountries } from "../../redux/actions";
import CountryCard from "../CountryCard/CountryCard.jsx";
import Paginate from "../Paginate/Paginate.jsx";
import Population from "../Order/Population.jsx";
import Continents from "../Filters/Continents.jsx";
import ActivitiesFilter from "../Filters/ActivitiesFilter.jsx";
import NavBar from "../NavBar/NavBar.jsx";
import Name from "../Order/Name.jsx";
import "./home.css";
import Loading from "../Loading/Loading.jsx";

export default function Home() {
  const dispatch = useDispatch();
  //esto es lo mismo que hacer el mapStateToProps
  const allCountries = useSelector((state) => state.countries); //arreglo del estado
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage] = useState(10);
  const indexOfLastCountry = currentPage * countriesPerPage; //10
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage; //0
  const currentCountries = allCountries.slice(
    //currentCountries es todos los paises de la pagina
    indexOfFirstCountry,
    indexOfLastCountry
  ); //me divide el array de todo y me toma desde el primer indice hasta el ultimo

  const [, setOrder] = useState("");

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getCountries());
    dispatch(filterByContinent());
  }, [dispatch]);

  useEffect(() => {
    setCurrentPage(1);
  }, [currentCountries.length]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getCountries());
  }

  return (
    <div className="home">
      <NavBar />
      <div>
        <button
          className="reload"
          onClick={(e) => {
            handleClick(e);
          }}
        >
          Reload Countries
        </button>
      </div>

      <div className="filters">
        <div>
          <Population setOrder={setOrder} setCurrentPage={setCurrentPage} />
        </div>
        <br />

        <div>
          <Name setOrder={setOrder} setCurrentPage={setCurrentPage} />
        </div>
        <br />

        <div>
          <Continents setCurrentPage={setCurrentPage} />
        </div>
        <br />

        <div>
          <ActivitiesFilter setCurrentPage={setCurrentPage} />
        </div>
        <br />
      </div>

      <div className="cardsHome">
        {currentCountries.length === 0 ? (
          <Loading setLoading={setLoading} className='loader'/>
        ) : (
          currentCountries.map((el) => {
            return (
              <div key={el.cca3}>
                <CountryCard
                  id={el.cca3}
                  name={el.name}
                  continent={el.continent}
                  flag={el.flag}
                />
              </div>
            );
          })
        )}
      </div>

      <Paginate
        countriesPerPage={countriesPerPage}
        allCountries={allCountries.length}
        paginado={paginado}
      />
    </div>
  );
}
