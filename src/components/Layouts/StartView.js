import { useDispatch, useSelector } from "react-redux";
import ResultCard from "../Result/ResultCard";
import Button from "../UI/Button/Button";
import classes from "./StartView.module.css";
import {secretKeyAction, enableRowAction, circlesColorAction, startAction} from "../../store/index";
import { useEffect } from "react";

/**
 * StartViewcomponent used to organize start game and show result operations
 * It works in two cases when start and end the game 
 */


const StartView = (props) => {
  
  const secretKey = useSelector((state) => state.secretKey.key);
  const enableRowCount = useSelector((state) => state.rowSlice.enableRow);
  const gameStatus = useSelector((state) => state.startSlice.endGame);
  const gameResult = useSelector((state) => state.startSlice.result);
  const dispatch = useDispatch();

  /**
   * Display Result card that contains the secret key when attempts finished
   * In other word when user fail to predect the secret key
   */

  useEffect(() => {
    if (enableRowCount > 8) {
      dispatch(startAction.endGameByAttempts());
    }
  }, [enableRowCount]);

  /**
   * When start button clicked:
   * Generate new random key( when start and when attempt finished and start cliked after that)
   * Enable the first row of fields and check button
   */

  const startButtonHandler = () => {

    // This condition work when user fail in all attempts or when start a new game after win
    if ( enableRowCount > 8 ||
      (gameStatus === true && enableRowCount < 8 && gameResult === "You won")) {

      dispatch(startAction.startNewGame());
      dispatch(enableRowAction.resetEnableRows());
      dispatch(circlesColorAction.resetCircles());
      dispatch(enableRowAction.enableNextRow());
      dispatch(secretKeyAction.generateKey());
    }

    // This condition work when start the game for the first time 
    if (enableRowCount === 0) {
      dispatch(startAction.startNewGame());
      dispatch(enableRowAction.enableNextRow());
      dispatch(secretKeyAction.generateKey());
    }
  };

  // To show the random generated key=> console.log("Secret key:" + secretKey);

  return (
    <div className={classes.startBox}>
      {gameStatus && (
        <ResultCard secretCode={secretKey} gameResult={gameResult}></ResultCard>
      )}
      <Button className={classes.startButton} onClick={startButtonHandler}>
        Start
      </Button>
    </div>
  );
};

export default StartView;
