import "./App.css";
import Login from "./Login.jsx";

const isLoggedIn = false;

// render the login form
function renderCondition() {
  if (isLoggedIn === true) {
    return <h1>Hello</h1>;
  } else {
    return (
    <Login />
    );
  }
}

// put the form to the page.
function App() {
  return <div className="App">{renderCondition()}</div>;
}

export default App;
