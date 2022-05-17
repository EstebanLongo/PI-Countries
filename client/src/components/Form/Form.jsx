import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createActivity,
  getActivities,
  getCountries,
} from "../../redux/actions/index.js";
import { Link, useHistory } from "react-router-dom";
import "./form.css";
import NavBar from "../../components/NavBar/NavBar.jsx";

export function validate(input) {
  let errors = {};

  if (!input.name) errors.name = "Name required";
  if (isNaN(input.name) !== true) errors.name = "Name cannot be a number";
  if (
    !input.difficulty ||
    isNaN(input.difficulty) !== false ||
    input.difficulty < 1 ||
    input.difficulty > 5
  )
    errors.difficulty = "Difficulty should be a value between 1 and 5";
  if (!input.duration || isNaN(input.duration) !== false)
    errors.duration = "Duration must be a number";
  if (!errors.season) errors.season = "Must select a season";
  return errors;
}

export default function Form() {
  const dispatch = useDispatch();
  const activities = useSelector((state) => state.activities);
  const countries = useSelector((state) => state.countriesCopy);
  //history me redirige a donde le pase(home)
  const history = useHistory();

  const [input, setInput] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    countries: [],
  });

  const [errors, setErrors] = useState({
    name: "Name required",
    difficulty: "Difficulty required",
    duration: "Duration required",
    season: "Must select a season",
  });

  //cada vez que se ejecuta la funcion, al estado input le agrega el e.target.value
  function handleInputChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    // console.log(input)
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleCheck(e) {
    if (e.target.checked) {
      setInput({
        ...input,
        season: e.target.value,
      });
    }
  }

  function handleSelect(e) {
    setInput({
      ...input,
      activities: [...input.countries, e.target.value],
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (
      input.name === "" ||
      input.duration === "" ||
      input.season === "" ||
      // !input.country ||
      input.duration < 1
    ) {
      return alert("Please fill all fields");
    } else {
      dispatch(createActivity(input));
      alert("Activity created succesfully!");
      setInput({
        name: "",
        difficulty: "",
        duration: "",
        season: "",
        countries: [],
      });
      history.push("/home");
    }
  }

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  return (
    <div className="formcontainer">
      <NavBar />

      <h1>Create Activity</h1>

      <form onSubmit={(e) => handleSubmit(e)} className="form">
        <img
          src="https://deportesriesgo.com/wp-content/uploads/Tipos-de-surf.jpg"
          className="img"
        />

        <div className="divlabels">
          <label className="label">Name:</label>

          <input
            type="text"
            value={input.name}
            name="name"
            onChange={(e) => handleInputChange(e)}
            className="inputs"
          />
          {errors.name && <p className="danger">{errors.name}</p>}
        </div>

        <div className="divlabels">
          <label className="label">
            Difficulty:
            <input
              type="number"
              max={5}
              min={1}
              value={input.difficulty}
              name="difficulty"
              placeholder="1-5"
              onChange={(e) => handleInputChange(e)}
              className="inputs"
            />
            {errors.difficulty && <p className="danger">{errors.difficulty}</p>}
          </label>
        </div>

        <div className="divlabels">
          <label className="label">Duration:</label>

          <input
            type="number"
            min={0}
            value={input.duration}
            name="duration"
            onChange={(e) => handleInputChange(e)}
            className={errors.duration && "danger"}
          />
        </div>

        <div>
          <label className="season">Season:</label>
          {errors.season && <p className="danger">{errors.season}</p>}
          <label>
            <input
              type="radio"
              name="check"
              value="Verano"
              onChange={handleCheck}
            />
            Verano
          </label>

          <label>
            <input
              type="radio"
              name="check"
              value="Invierno"
              onChange={handleCheck}
            />
            Invierno
          </label>

          <label>
            <input
              type="radio"
              name="check"
              value="Otoño"
              onChange={handleCheck}
            />
            Otoño
          </label>

          <label>
            <input
              type="radio"
              name="check"
              value="Primavera"
              onChange={handleCheck}
            />
            Primavera
          </label>
        </div>

        <div>
          <select onChange={(e) => handleSelect(e)}>
            <option value="country">Countries...</option>
            {console.log("form countries: ", countries)}

            {countries.map((e) => (
              <option value={e.name}>{e.name}</option>
            ))}
          </select>
        </div>

        <button type="submit" name="submit" className="box hvr-grow-shadow">
          Create Activity!
        </button>
      </form>
    </div>
  );
}
