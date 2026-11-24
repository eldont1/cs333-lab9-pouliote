import "./App.css";
import Login from "./Login.jsx";

const isLoggedIn = false;

const hour = new Date().getHours();
console.log("The hour is", hour);

// render the login form using a compact ternary.
function App() {
  return (
    <div className="App">
      {isLoggedIn ? <h1>Hello</h1> : <Login />}
      {hour >= 17 && <p>It's after 5. Take a break!</p>}
    </div>
  );
}

export default App;
