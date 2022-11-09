import classes from "./ResultCard.module.css";

const ResultCard = (props) => {

  return (
    <div className={classes.card}>
    <h1>{props.gameResult}</h1>
      <h2>Secret Code</h2>
      <div className={classes.code}>{props.secretCode}</div>
    </div>
  );
};

export default ResultCard;
