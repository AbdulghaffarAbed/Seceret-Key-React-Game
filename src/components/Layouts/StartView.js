import { useDispatch, useSelector } from "react-redux";
import ResultCard from "../Result/ResultCard";
import Button from "../UI/Button/Button";
import classes from "./StartView.module.css";
import {
  secretKeyAction,
  enableRowAction,
  circlesColorAction,
  startAction,
} from "../../store/index";
import { useEffect } from "react";

const StartView = (props) => {
  const secretKey = useSelector((state) => state.secretKey.key);
  const enableRowCount = useSelector((state) => state.rowSlice.enableRow);
  const gameStatus = useSelector((state) => state.startSlice.endGame);
  const gameResult = useSelector((state) => state.startSlice.result);
  const circleColorSelector = useSelector((state) => state.circlesSlice.row0);
  const dispatch = useDispatch();

  /**
   * Display Result card that contains the secret key when attempts finished
   */
  useEffect(() => {
    if (enableRowCount > 8) {
      dispatch(startAction.endGameByAttempts());
    }
  }, [enableRowCount]);
  /**
   * When start button clicked:
   * 1. Generate new random key( when start and when attempt finished and start cliked after that)
   * 2. enable the first row of fields and check button
   */

  const startButtonHandler = () => {
    // (gameStatus===false && enableRowCount<8): In case of user won the game and want to start a new game
    if (
      enableRowCount > 8 ||
      (gameStatus === true && enableRowCount < 8 && gameResult === "You won")
    ) {
      dispatch(startAction.startNewGame());
      dispatch(enableRowAction.resetEnableRows());
      dispatch(circlesColorAction.resetCircles());
      dispatch(enableRowAction.enableNextRow());
      dispatch(secretKeyAction.generateKey());
    }
    if (enableRowCount === 0) {
      dispatch(startAction.startNewGame());
      dispatch(enableRowAction.enableNextRow());
      dispatch(secretKeyAction.generateKey());
    }
  };

  // TODO: delete this line when finish
  console.log("Secret key:" + secretKey);

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
