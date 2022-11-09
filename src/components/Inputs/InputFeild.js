import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import classes from "./InputField.module.css";

/**
 * 1. use event.target.value to get the field value.
 * 2. use props with use state to pass vaLUE TO THE PARENT -Row-.
 */

const InputField = (props) => {
  const [outLimit, setOutLimit] = useState(false);                    // To check if the number in range 0 to 9 or not
  const [fieldValue, setFieldValue] = useState();                     // To store field number value

 
  const randomKey = useSelector((state) => state.secretKey.key);
  const keyDigits = [...(randomKey + "")];                           // Split secret key to single digits

  /**
   * Used to get the field value when it's changed
   */


  const NumberLimitHndler = (event) => {
    setFieldValue(() => event.target.value);
  };

  useEffect(() => {
   
    /**
     * If check button clicked then check if:
     * 1. the number exist in the secret key and its position is correct the circle color must be blue
     * 2. the number exist in the secret key but its position is incorrect the circle color must be white
     * 3. the number does not exist in the secret key then don't display the circle
     */


    if (props.checkStatus) {
      let occeranceValue = 0;                   // used to store a number that arrow to color
      if (props.keyDigit === fieldValue) {
        occeranceValue = 1;                     // blue circle
      } else {
        for (let i in keyDigits) {
          if (keyDigits[i] === fieldValue) {
            occeranceValue = 2;                 // white circle
          }
        }
      }
      
      // Define state that contains the row number and a number arrow to the circle color 
      const status = {
        id: props.id,
        occerance: occeranceValue,
      };

      props.numValidation(status);    // Pass state object to Row component to complete the process
    }
  }, [fieldValue, props.checkStatus, props.keyDigit]);

  return (
    <Fragment>
      {props.enableOrDisable && (
        <input
          type="number"
          min="0"
          max="9"
          maxLength="1"
          oninput="this.value=this.value.replace(/[^0-9]/g,'');"
          value={null}
          className={classes.input}
          onChange={NumberLimitHndler}
        />
      )}

      {!props.enableOrDisable && (
        <input
          type="number"
          min="0"
          max="9"
          maxLength="1"
          oninput="this.value=this.value.replace(/[^0-9]/g,'');"
          value={null}
          className={`${classes.input} ${classes.disable}`}
          onChange={NumberLimitHndler}
        />
      )}

    </Fragment>
  );
};

export default InputField;
