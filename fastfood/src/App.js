import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './ui/Theme';
import { Switch, Route, Redirect } from "react-router-dom";
import Home from './components/navigation/NavBar';
import Login from './components/auth/Login';
import AdminContainer from './components/admin/AdminContainer';
import { connect } from 'react-redux';
import * as actionTypes from './store/action';
import { useEffect } from 'react';

function App(props) {


  useEffect(() => {
    if(props.isSet === 0){
    props.onServerStart();
    }

  })

  return (
    <ThemeProvider theme={theme} >
      <Switch>
      <Route path="/admin" component={AdminContainer} />
      <Route path="/login" component={Login} />
      <Route exact path="/" component={Home} />
      </Switch>
    </ThemeProvider>
  );
}

const mapStateToProps = state => {
  return {
    isSet: state.sessionStartTime
  }
}

const mapDispatchToProps = dispatch =>{
  return {
    onServerStart: () => dispatch({ type: actionTypes.GET_SESSION_START}),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
