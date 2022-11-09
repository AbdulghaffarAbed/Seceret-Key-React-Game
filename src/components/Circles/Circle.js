import { Fragment } from "react";
import classes from "./Circle.module.css";

const Circles = (props) => {
  // TODO: make className dynamic to color the circles depending on state
  console.log("circle:" + props.circleColor);
  return (
    <Fragment>
      {props.circleColor === "white" && (
        <div className={`${classes.circle} ${classes.white}`}></div>
      )}

      {props.circleColor === "blue" && (
        <div className={`${classes.circle} ${classes.blue}`}></div>
      )}

      {props.circleColor === "none" && (
        <div className={`${classes.circle} ${classes.none}`}></div>
      )}
    </Fragment>
  );
};

export default Circles;
