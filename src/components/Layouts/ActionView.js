import Row from "./Row";
import classes from "./ActionView.module.css";
import { useDispatch, useSelector } from "react-redux";
import { enableRowAction } from "../../store";

const ActionView = () => {

  const enableRowCount = useSelector((state) => state.rowSlice.enableRow);
  const gameStatus = useSelector((state)=>state.startSlice.endGame);

  const dispatch = useDispatch();
  const rowNumber = "row" + (enableRowCount - 1);
  const circleColorSelector = useSelector(
    (state) => state.circlesSlice[rowNumber]
  );

  const enableDisapleRowHandler = () => {
    /**
     * When user enter the correct secret key ( all circles blue)
     * Then game end, and secret key displayed on the screen
     */
    console.log("Inside enableDisable func: "+ circleColorSelector.c0);
    if (!gameStatus){
      dispatch(enableRowAction.enableNextRow());
    }
  };

  return (
    <div className={classes.rows}>
      <Row
        enableOrDisable={enableRowCount === 1}
        onCheck={enableDisapleRowHandler}
        rowCount={0}
      />
      <Row
        enableOrDisable={enableRowCount === 2}
        onCheck={enableDisapleRowHandler}
        rowCount={1}
      />
      <Row
        enableOrDisable={enableRowCount === 3}
        onCheck={enableDisapleRowHandler}
        rowCount={2}
      />
      <Row
        enableOrDisable={enableRowCount === 4}
        onCheck={enableDisapleRowHandler}
        rowCount={3}
      />
      <Row
        enableOrDisable={enableRowCount === 5}
        onCheck={enableDisapleRowHandler}
        rowCount={4}
      />
      <Row
        enableOrDisable={enableRowCount === 6}
        onCheck={enableDisapleRowHandler}
        rowCount={5}
      />
      <Row
        enableOrDisable={enableRowCount === 7}
        onCheck={enableDisapleRowHandler}
        rowCount={6}
      />
      <Row
        enableOrDisable={enableRowCount === 8}
        onCheck={enableDisapleRowHandler}
        rowCount={7}
      />
    </div>
  );
};

export default ActionView;
