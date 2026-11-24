import Input from "./Input.jsx";

// Uses by Input.jsx, gives the input props something concrete.
function Login(props) {
  return (
    <form className="form">
      <Input type="text" placeholder="Username" />
      <Input type="password" placeholder="Password" />
      <button type="button" onClick={props.onLogin}>Login</button>
    </form>
  );
}

export default Login;