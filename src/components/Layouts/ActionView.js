import Row from "./Row";
import classes from "./ActionView.module.css";
import { useDispatch, useSelector } from "react-redux";
import { enableRowAction } from "../../store";

/**
 * ActionView component used to display all rows and send some date
 * to each one of them
 */


const ActionView = () => {

  const enableRowCount = useSelector((state) => state.rowSlice.enableRow);    // represent row number to enable its fields and button
  const gameStatus = useSelector((state)=>state.startSlice.endGame);          // point to the game status (end or not)
  const dispatch = useDispatch();

  const rowNumber = "row" + (enableRowCount - 1);
  const circleColorSelector = useSelector((state) => state.circlesSlice[rowNumber]);  // point to row circles color

   /**
    * Enable the next row fields and buttons if the game started and attempts not finished
    */

   
  const enableDisapleRowHandler = () => {
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
