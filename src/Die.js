export default function Die(props) {
  const styles = {
    backgroundColor: props.isHeld === true ? "#59e391" : "#f0efef",
  };
  return (
    <span onClick={props.HoldDice} style={styles}>
      {props.value}
    </span>
  );
}
