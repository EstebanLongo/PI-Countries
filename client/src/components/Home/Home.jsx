import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountries } from "../../redux/actions";
import CountryCard from "../CountryCard/CountryCard.jsx";
import Paginate from "../Paginate/Paginate.jsx";
import Population from "../Order/Population.jsx";
import Continents from "../Filters/Continents.jsx";
import ActivitiesFilter from "../Filters/ActivitiesFilter";
import NavBar from "../NavBar/NavBar.jsx";
import Name from "../Order/Name.jsx";
import "./home.css";

export default function Home() {
  //esto es para usar la const dispatch e ir despachando mis acciones
  const dispatch = useDispatch();
  //esto es lo mismo que hacer el mapStateToProps
  const allCountries = useSelector((state) => state.countries);

  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage] = useState(10);
  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountries = allCountries.slice(
    indexOfFirstCountry,
    indexOfLastCountry
  );

  const [, setOrder] = useState("");

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getCountries());
  }

  return (
    <div className="home">
      <NavBar setCurrentPage={setCurrentPage} />
      <div>
        <button className="reload"
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
          <br/>

        <div>
          <Name setOrder={setOrder} setCurrentPage={setCurrentPage} />
        </div>
        <br/>

        <div>
          <Continents setCurrentPage={setCurrentPage} />
        </div>
        <br/>

        <div>
          <ActivitiesFilter setCurrentPage={setCurrentPage} />
        </div>
        <br/>        
      </div>

      <div className="cardsHome">
        {/* {console.log("allcountries: ", allCountries)} */}
        {currentCountries
          ? currentCountries.map((el) => {
              return (
                <div key={el.id}>
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

      <Paginate
        countriesPerPage={countriesPerPage}
        allCountries={allCountries.length}
        paginado={paginado}
      />
    </div>
  );
}
