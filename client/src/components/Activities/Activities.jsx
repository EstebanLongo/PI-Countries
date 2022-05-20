import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteActivity, getActivities } from "../../redux/actions";
import './activities.css'

export default function Activities() {
  const dispatch = useDispatch();
  const activity = useSelector((state) => state.activities);


  useEffect(() => {
    dispatch(getActivities());
    dispatch(deleteActivity())
  }, [dispatch]);

  return (
    <>
      <h2>Activities: </h2>

      <div>
        {activity.map((el) => {
          return (
            <div value={el.name} key={el.name}>
              <p>{el.name}</p>
              <p>Difficulty: {el.difficulty}</p>
              <p>Duration: {el.duration}</p>
              <p>Season: {el.season}</p>
            </div>
          );
        })}
      </div>
        <button className='btn first'>DELETE</button>
    </>
  );
}
