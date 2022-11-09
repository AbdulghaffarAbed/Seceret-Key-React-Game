import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import classes from "./InputField.module.css";

/**
 * 1. use event.target.value to get the field value.
 * 2. use props with use state to pass vaLUE TO THE PARENT -Row-.
 */

const InputField = (props) => {
  const [outLimit, setOutLimit] = useState(false); // To check if the number in range 0 to 9 or not
  const [fieldValue, setFieldValue] = useState();

  // Split secret key to single digits
  const randomKey = useSelector((state) => state.secretKey.key);
  const keyDigits = [...(randomKey + "")];

  const NumberLimitHndler = (event) => {
    setFieldValue(() => event.target.value);
  };

  useEffect(() => {
    /**
     * Check if the entered number is one digit or more
     * if it's more than one digit then display error message
     */

    if (fieldValue > 9 || fieldValue < 0) {
      setOutLimit(true);
    } else {
      setOutLimit(false);
    }

    if (props.checkStatus) {
      let occeranceValue = 0;

      // Same number and in the same position
      if (props.keyDigit === fieldValue) {
        occeranceValue = 1; // blue circle
      } else {
        for (let i in keyDigits) {
          if (keyDigits[i] === fieldValue) {
            occeranceValue = 2; // white circle
          }
        }
      }

      const status = {
        id: props.id,
        occerance: occeranceValue,
      };
      // console.log("INSIDE INPUT FILE id: " +status.id +"  occerance: " + status.occerance);
      props.numValidation(status);
    }
  }, [fieldValue, props.checkStatus, props.keyDigit]);

  /**
   * TODO: make the error msg apperas one for multi errors in the fields
   */

  return (
    <Fragment>
      {props.enableOrDisable && (
        <input
          type="text"
          maxLength="1"
          oninput="this.value=this.value.replace(/[^0-9]/g,'');"
          value={null}
          className={classes.input}
          onChange={NumberLimitHndler}
        />
      )}

      {!props.enableOrDisable && (
        <input
          type="text"
          maxLength="1"
          oninput="this.value=this.value.replace(/[^0-9]/g,'');"
          value={null}
          className={`${classes.input} ${classes.disable}`}
          onChange={NumberLimitHndler}
        />
      )}

      {outLimit && (
        <p className={classes.errorPar}> Please Enter a number from 0 to 9 </p>
      )}
    </Fragment>
  );
};

export default InputField;
