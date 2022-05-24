import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createActivity,
  getActivities,
  getCountries,
} from "../../redux/actions/index.js";
import { useHistory, Link } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar.jsx";
import "./form.css";

export function validate(input) {
  let errors = {};

  if (!input.name) {
    errors.name = "Name required";
  } else if (isNaN(input.name) !== true) {
    errors.name = "Name cannot be a number";
  } else if (
    !input.difficulty ||
    isNaN(input.difficulty) !== false ||
    input.difficulty < 1 ||
    input.difficulty > 5
  ) {
    errors.difficulty = "Must be a value between 1-5";
  } else if (!input.duration || isNaN(input.duration) !== false) {
    errors.duration = "Duration must be a number";
  }

  return errors;
}

export default function Form() {
  const dispatch = useDispatch();
  const history = useHistory();
  //history me redirige a donde le pase(home)
  const activities = useSelector((state) => state.activities);
  const countries = useSelector((state) => state.countriesCopy);

  const [errors, setErrors] = useState({});
  // const [disabled, setDisabled] = useState(true);

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
    if (
      !input.countries.includes(e.target.value) &&
      e.target.value !== "country"
    ) {
      setInput({
        ...input,
        countries: [...input.countries, e.target.value],
      });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    setErrors(validate(input));
    const errorsSaved = validate(input);

    if (
      Object.values(errorsSaved).length !== 0 ||
      !input.countries.length ||
      !input.season
    ) {
      alert("Please fill all fields");
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

  function handleDelete(el) {
    setInput({
      ...input,
      countries: input.countries.filter((e) => e !== el),
    });
  }

  return (
    <div className="formcontainer">
      <nav className="nav">
        <Link to="/home" className="iconHome">
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAAAzklEQVRYhe2TSw7DIAxEocoVipojJsdtFjnO6wYklJhvoGyYFcLYMx5jpSYeADCAGUX+Br7ACayjyB3+J8Laflji43LuO45L5yfwEe76OCGRR2KrvQegK3lMRBMBwsyDcxbePhOQ03kip15ASeeJXIq3o6bzjBp529GCvFrEY+vCNR3Co2z2eeTaPmQngN1T2UuAq72HHm6+ZRnd3JDIMcDmx3QoQSmltNa3eMqZWI4UW2LFSohqR/aqFdAKU8AUMFxAdA1rVqs0Z7gDExM/bjc+TKNeTBQAAAAASUVORK5CYII=" />
        </Link>
      </nav>

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
            className="inputsD"
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
        </div>

        {input.countries.map((el) => (
          <button className="countrybtn" onClick={() => handleDelete(el)}>
            {el} | X
          </button>
        ))}

        <div>
          <p>
            <button type="submit" name="submit" className="box hvr-grow-shadow">
              Create Activity!
            </button>
          </p>
        </div>
      </form>
    </div>
  );
}
