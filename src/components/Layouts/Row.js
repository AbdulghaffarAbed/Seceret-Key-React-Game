import classes from "./Row.module.css";
import InputField from "../Inputs/InputFeild";
import Button from "../UI/Button/Button";
import Circle from "../Circles/Circle";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { circlesColorAction, startAction} from "../../store";


/**
 * colorValue function used as helper function to decide which color used 
 * for each circle depending the value found in InputField component
 */


const colorValue = (value) => {
  if (value === 1) {
    return "blue";
  } else if (value === 2) {
    return "white";
  } else {
    return "none";
  }
};

/**
 * Row component used to manage row fields, check button and circles
 * It receives occerance value from inputField component based on the entered number 
 * where occerance value used to decide which color to use and pass it to Circle component
 */


const Row = (props) => {
  const [check, setCheck] = useState(false);        // Used to start compare key digits when check button clicked
  const rowNumber = "row" + props.rowCount;
  const circleColorSelector = useSelector(          // Point to the state for circles inside index.js using row number 
    (state) => state.circlesSlice[rowNumber]    
  );
  const dispatch = useDispatch();                   // Used to execute reducers inside redux Slice 

  /**
   * To clean circles color to default when restart the game
   */

  useEffect(() => {
    setCheck(false);
  }, []);

  const randomKey = useSelector((state) => state.secretKey.key);    // Get the random generated secret key
  const keyDigits = [...(randomKey + "")];                          // Split secret key to single digits

  /**
   * Handle check button when it's clicked
   */


  const checkButtonHandler = () => {
    setCheck(true);
    props.onCheck();
  };

  /**
   * numberValidation used to decide the color for each circle 
   * Then it will call redcer action to change circle state inside the redux store 
   */

  const numberValidation = (status) => {
    if(check){
    switch (status.id) {
      case 1:
        dispatch(circlesColorAction.circle0Color([colorValue(status.occerance), rowNumber,]));
        break;
      case 2:
        dispatch(circlesColorAction.circle1Color([colorValue(status.occerance), rowNumber, ]));
        break;
      case 3:
        dispatch(circlesColorAction.circle2Color([colorValue(status.occerance), rowNumber,]));
        break;
      case 4:
        dispatch(circlesColorAction.circle3Color([colorValue(status.occerance), rowNumber,]));
        break;
      default: 
    }
    setCheck(false);         // Reset check button value to prepeare for the next row
    }
  };

  /**
   * If the user find the accurate secret key then end the game 
   */

  if (
    circleColorSelector.c0 === "blue" && circleColorSelector.c1 === "blue" &&
    circleColorSelector.c2 === "blue" && circleColorSelector.c3 === "blue") {
      
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
        <Circle circleColor={circleColorSelector.c0} />
        <Circle circleColor={circleColorSelector.c1} />
        <Circle circleColor={circleColorSelector.c2} />
        <Circle circleColor={circleColorSelector.c3} />
      </section>
    </div>
  );
};

export default Row;
