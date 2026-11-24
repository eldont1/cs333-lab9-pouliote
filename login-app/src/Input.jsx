//
function Input(props) {
    console.log(props.type + " " + props.placeholder + " " + props.value + " " + props.onChange)
  return (
    <input
      type={props.type}
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
    />
  );
}

export default Input;