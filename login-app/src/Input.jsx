// Building block for the login form
function Input(props) {
    console.log("Props: " + props.type + " " + props.placeholder);
  return <input type={props.type} placeholder={props.placeholder} />;
}

export default Input;