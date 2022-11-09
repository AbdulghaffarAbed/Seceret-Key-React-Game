import { Fragment} from "react";
import ActionView from "./ActionView";
import Header from "./Header";
import StartView from "./StartView";
import classes from "./PageLayout.module.css";


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
