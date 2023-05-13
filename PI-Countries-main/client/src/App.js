import { Switch, Route } from "react-router-dom";
import Home from "./views/home/home";
import Detail from "./views/detail/detail";
import Form from "./views/form/form";
import Landing from "./views/landing/landing";
import "./App.css";

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/home" component={Home} />
        <Route path="/home/:id" component={Detail} />
        <Route path="/form" component={Form} />
      </Switch>
    </div>
  );
}

export default App;
