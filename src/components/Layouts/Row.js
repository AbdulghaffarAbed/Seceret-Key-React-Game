import classes from "./Row.module.css";
import InputField from "../Inputs/InputFeild";
import Button from "../UI/Button/Button";
import Circle from "../Circles/Circle";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { circlesColorAction, startAction} from "../../store";

const colorValue = (value) => {
  // case 1: occure and in the same order
  // case 2: occure in different order
  if (value === 1) {
    return "blue";
  } else if (value === 2) {
    return "white";
  } else {
    return "none";
  }
};

const Row = (props) => {
  const [check, setCheck] = useState(false); // Used to start compare key digits when check button clicked
  const [displayCircle, setDisplayCircle] = useState(false); // used to display and hide row circles

  const dispatch = useDispatch();

  const rowNumber = "row" + props.rowCount;
  const circleColorSelector = useSelector(
    (state) => state.circlesSlice[rowNumber]
  );
    

  /**
   * To clean circles color to default when restart the game
   */
  useEffect(() => {
    setCheck(false);
    setDisplayCircle(false);
  }, []);
  // Split secret key to single digits
  const randomKey = useSelector((state) => state.secretKey.key);
  const keyDigits = [...(randomKey + "")];

  /**
   * Handle check button when it's clicked
   */

  const checkButtonHandler = () => {
    setCheck(true);
    props.onCheck();
  };

  /**
   * Validate the entered number
   */

  const numberValidation = (status) => {
    if(check){
    switch (status.id) {
      case 1:
        dispatch(
          circlesColorAction.circle0Color([
            colorValue(status.occerance),
            rowNumber,
          ])
        );
        break;
      case 2:
        dispatch(
          circlesColorAction.circle1Color([
            colorValue(status.occerance),
            rowNumber,
          ])
        );
        break;
      case 3:
        dispatch(
          circlesColorAction.circle2Color([
            colorValue(status.occerance),
            rowNumber,
          ])
        );
        break;
      case 4:
        dispatch(
          circlesColorAction.circle3Color([
            colorValue(status.occerance),
            rowNumber,
          ])
        );
        break;
      default: // Danger here....
    }
    setCheck(false);
    setDisplayCircle(true);
    }
  };

  if (
    circleColorSelector.c0 === "blue" &&
    circleColorSelector.c1 === "blue" &&
    circleColorSelector.c2 === "blue" &&
    circleColorSelector.c3 === "blue"
  ) {

    dispatch(startAction.endGameByUser());
    
  }

  return (
    <div className={classes.row}>
      <section className={classes.inputFields}>
        <InputField
          keyDigit={keyDigits[0]}
          checkStatus={check}
          id={1}
          numValidation={numberValidation}
          enableOrDisable={props.enableOrDisable}
        />

        <InputField
          keyDigit={keyDigits[1]}
          checkStatus={check}
          id={2}
          numValidation={numberValidation}
          enableOrDisable={props.enableOrDisable}
        />

        <InputField
          keyDigit={keyDigits[2]}
          checkStatus={check}
          id={3}
          numValidation={numberValidation}
          enableOrDisable={props.enableOrDisable}
        />

        <InputField
          keyDigit={keyDigits[3]}
          checkStatus={check}
          id={4}
          numValidation={numberValidation}
          enableOrDisable={props.enableOrDisable}
        />
      </section>
      <section>
        <Button disabled={!props.enableOrDisable} onClick={checkButtonHandler}>
          Check
        </Button>
      </section>
      <section className={classes.circles}>
        {displayCircle && <Circle circleColor={circleColorSelector.c0} />}
        {displayCircle && <Circle circleColor={circleColorSelector.c1} />}
        {displayCircle && <Circle circleColor={circleColorSelector.c2} />}
        {displayCircle && <Circle circleColor={circleColorSelector.c3} />}
      </section>
    </div>
  );
};

export default Row;
