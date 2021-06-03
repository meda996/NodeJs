import { ThemeProvider } from '@material-ui/core/styles';
import theme from './ui/Theme';
import { Switch, Route, Redirect } from "react-router-dom";
import Home from './components/navigation/NavBar';
import Login from './components/auth/Login';



function App() {
  return (
    <ThemeProvider theme={theme} >
      <Switch>
      <Route path="/login" component={Login} />
      <Route exact path="/" component={Home} />
      </Switch>
    </ThemeProvider>
  );
}

export default App;
