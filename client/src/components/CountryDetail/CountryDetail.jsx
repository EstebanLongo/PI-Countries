import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail, setStateDetail } from "../../redux/actions";
import { useEffect } from "react";
import styles from "./countrydetail.module.css";
import NavBar from "../../components/NavBar/NavBar.jsx";

export default function CountryDetail() {
  const { id } = useParams();

  const dispatch = useDispatch();
  const countryD = useSelector((state) => state.countryDetail);

  useEffect(() => {
    dispatch(getDetail(id));
  }, [dispatch, id]);

  return (
    <div>
      <NavBar />
      <div className={styles.backDetail}>
        {console.log(countryD)}

        <h2 className={styles.h2}>Country: {countryD.name}</h2>

        <div className={styles.countryDetail}>
          <label>{countryD.flag}</label>
          <label>ID: {countryD.cca3}</label>
          <label>Continent: {countryD.continent}</label>
          <label>Capital: {countryD.capital}</label>
          <label>Population: {countryD.population}</label>
          <label>Area: {countryD.area}</label>
        </div>

        {countryD ? (
          countryD.activities?.map((e) => {
            return <div>activities</div>;
          })
        ) : (
          <div>no activities to show</div>
        )}
      </div>
    </div>
  );
}
