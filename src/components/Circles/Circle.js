import { Fragment } from "react";
import classes from "./Circle.module.css";

/**
 * Circles component used to display the circles and change their olors in css
 * based on value passed to it from its parent which is Row component
 */


const Circles = (props) => {
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
