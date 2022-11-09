import { Fragment} from "react";
import ActionView from "./ActionView";
import Header from "./Header";
import StartView from "./StartView";
import classes from "./PageLayout.module.css";

/**
 * Page layout contains 2 main argument and a Header where the arguments:-
 *  ActionView: contains the fields,circles and check buttons used to organize them.
 *  StartView: contains start button and result card and mainpulate them.
 */


const PageLayout = (props) => {
  return (
    <Fragment>
      <Header />
      <div className={classes.pageBody}>
        <ActionView ></ActionView>
        <StartView />
      </div>
    </Fragment>
  );
};

export default PageLayout;
