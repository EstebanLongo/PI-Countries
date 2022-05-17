import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage.jsx";
import Home from "./components/Home/Home.jsx";
import CountryDetail from "./components/CountryDetail/CountryDetail.jsx";
import Form from "./components/Form/Form.jsx";
import NavBar from "./components/NavBar/NavBar.jsx";
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          {/* <Route path='/' component={NavBar}></Route> */}
          <Route exact path="/home" component={Home} />
          <Route path="/home/:id" component={CountryDetail} />
          <Route path="/activity" component={Form} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
