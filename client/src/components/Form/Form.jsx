import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createActivity,
  getActivities,
  getCountries,
} from "../../redux/actions/index.js";
import { useHistory } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar.jsx";
import "./form.css";

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

  if (input.countries.length === 0)
    errors.countries = "Must select at least 1 country";
  return errors;
}

export default function Form() {
  const dispatch = useDispatch();
  const history = useHistory();
  //history me redirige a donde le pase(home)
  const activities = useSelector((state) => state.activities);
  const countries = useSelector((state) => state.countriesCopy);

  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  const [input, setInput] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    countries: [],
  });

  // const [errors, setErrors] = useState({
  //   name: "Name required",
  //   difficulty: "Difficulty must be a number",
  //   duration: "Duration required",
  //   season: "Must select a season",
  //   countries: 'Select at least one country'
  // });

  //cada vez que se ejecuta la funcion, al estado input le agrega el e.target.value
  function handleInputChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
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
    e.preventDefault();
    console.log("etarget: ", e.target.value);
    setInput({
      ...input,
      countries: [...input.countries, e.target.value],
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    // if (
    //   input.name === "" ||
    //   input.duration === "" ||
    //   input.season === "" ||
    //   // !input.countries ||
    //   input.duration < 1
    // ) {
    // return alert("Please fill all fields");
    // } else {
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

  function handleDelete(el) {
    setInput({
      ...input,
      countries: input.countries.filter((e) => e !== el),
    });
  }

  return (
    <div className="formcontainer">
      <NavBar />

      <h1 className="h1">Create Activity</h1>

      <form onSubmit={(e) => handleSubmit(e)} className="form">
        <img
          src="https://deportesriesgo.com/wp-content/uploads/Tipos-de-surf.jpg"
          alt="img not found"
          className="img"
        />

        <div className="divlabels">
          {errors.name && <p className="danger">{errors.name}</p>}
          <label className="label">Name:</label>

          <input
            type="text"
            placeholder="Activity..."
            value={input.name}
            name="name"
            onChange={(e) => handleInputChange(e)}
            className="inputs"
          />
        </div>

        <div className="divlabels">
          {errors.difficulty && <p className="danger">{errors.difficulty}</p>}
          <label className="labelD">
            Difficulty:
            <input
              type="number"
              max={5}
              min={1}
              value={input.difficulty}
              name="difficulty"
              placeholder="1-5"
              onChange={(e) => handleInputChange(e)}
              className="inputsD"
            />
          </label>
        </div>

        <div className="divlabels">
          {errors.duration && <p className="danger">{errors.duration}</p>}
          <label className="label">Duration:</label>

          <input
            type="number"
            min={0}
            value={input.duration}
            name="duration"
            onChange={(e) => handleInputChange(e)}
            // className={errors.duration && "danger"}
            className="inputs"
          />
        </div>

        <div>
          {errors.season && <p className="danger">{errors.season}</p>}
          <label className="season">Season:</label>
          <label>
            <input
              type="radio"
              name="check"
              value="Summer"
              onChange={(e) => handleCheck(e)}
            />
            Summer
          </label>

          <label>
            <input
              type="radio"
              name="check"
              value="Winter"
              onChange={(e) => handleCheck(e)}
            />
            Winter
          </label>

          <label>
            <input
              type="radio"
              name="check"
              value="Autumn"
              onChange={(e) => handleCheck(e)}
            />
            Autumn
          </label>

          <label>
            <input
              type="radio"
              name="check"
              value="Spring"
              onChange={(e) => handleCheck(e)}
            />
            Spring
          </label>
        </div>

        <div>
          {errors.countries && <p className="danger">{errors.countries}</p>}

          <select onChange={(e) => handleSelect(e)}>
            <option value="country">Countries...</option>

            {countries.map((e) => (
              <option value={e.name}>{e.name}</option>
            ))}
          </select>

          <br />
          
          {input.countries.map((el) => (
            <button onClick={() => handleDelete(el)}>
              {" "}
              X<br /> {el}
            </button>
          ))}
        </div>

        <button type="submit" name="submit" className="box hvr-grow-shadow">
          Create Activity!
        </button>
      </form>
    </div>
  );
}
