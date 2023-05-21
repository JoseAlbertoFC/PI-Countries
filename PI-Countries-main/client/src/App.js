import { Switch, Route, useLocation } from "react-router-dom";
import Home from "./views/home/home";
import Detail from "./views/detail/detail";
import Form from "./views/form/form";
import Landing from "./views/landing/landing";
import NavBar from "./components/navBar/navBar";
import Extras from "./views/extras/extras"
import "./App.css";

function App() {
  let location = useLocation();
  return (
    <div>
      {location.pathname !== "/" ? <NavBar /> : <Landing />}
      <Switch>
        {/* <Route exact path="/" component={Landing} /> */}
        <Route exact path="/home" component={Home} />
        <Route exact path="/home/:id" component={Detail} />
        <Route path="/form" component={Form} />
        <Route path="/extras" component={Extras} />
      </Switch>
    </div>
  );
}

export default App;
