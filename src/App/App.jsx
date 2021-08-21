import React, { useEffect, useState } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { history } from "../_helpers";
import { PrivateRoute } from "../_components";
import { alertActions, userActions } from "../_actions";

import {
  CanvasPage,
  D3PracticePage,
  DashboardPage,
  ImageUploadPage,
  LoginPage,
} from "../Pages";

import { ThemeProvider } from "@material-ui/core";
import { customTheme } from "./customTheme";

import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import { useSnackbar } from "notistack";

import { makeStyles } from "@material-ui/core/styles";
import { loading } from "../_styles";

const useStyles = makeStyles((theme) => ({
  loading: {},
}));

function App() {
  const classes = useStyles();
  // const [loggedIn, setLoggedIn] = useState(false);

  const alert = useSelector((state) => state.alert);
  const user = useSelector((state) => state.user);
  const dashboard = useSelector((state) => state.dashboard);
  const { fromCache, loggedIn } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  // localStorage로부터 사용자 정보를 loading한 경우에는
  // 프로파일 정보를 업데이트하고, 대쉬보드 정보도 가져온다.
  // JWT 토큰이 만료되지 않았다면, 두 데이터를 정상적으로 가져오겠으나,
  // 만약 이 과정에서 JWT 토큰이 만료되었다면,
  // 서버에서 에러를 반환하고, handleResponse에서 localStorage의 user 데이터를 지우므로
  // 강제적으로 로그인 페이지로 trigger를 하도록 하고 있다.
  useEffect(() => {
    history.listen((location, action) => {
      // console.log(location, action);
      // clear alert on location change
      dispatch(alertActions.clear());
    });

    // console.log("initial user in App");
    if (user && fromCache) {
      // localStorage.getItem('user')){
      dispatch(userActions.getMyProfile());
      // dispatch(dashboardActions.getMyDashboard());
    }
  }, [user, fromCache, dispatch]);

  // 정상적으로 로그인 페이지를 통해서 로그인을 하는 경우,
  // 프로파일 정보를 업데이트하고 대쉬보드 데이터를 가져오는 처리를 한다.
  useEffect(() => {
    // console.log("app use effect from loggedIn", user, loggedIn);
    if (user && loggedIn) {
      dispatch(userActions.getMyProfile());
      // dispatch(dashboardActions.getMyDashboard());
    }
  }, [user, loggedIn, dispatch]);

  // useEffect(() => {
  //   if (alert.message !== undefined) {
  //     enqueueSnackbar(`${alert.message}`, {
  //       autoHideDuration: 2000,
  //       variant: alert.type,
  //     });
  //   }
  // }, [alert]);

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <ThemeProvider theme={customTheme}>
        {/**
         * (user.loading || dashboard.loading)는
         * userActions.getMyProfile(), dashboardActions.getMyDashboard()를 호출하였고,
         * 이 2개의 호출 결과가 정상적으로 받아지지 않으면,
         * 메뉴 처리에 문제가 있으므로, 메뉴에 진입을 하지 못 하도록 한다.
         */}
        {/* {dashboard.loading && <div className={classes.loading} />} */}
        {/**
         * user.loggedIn은 정상적으로 login 페이지를 통해 로그인 한 경우이다.
         */}

        {/* {((user.loggedIn !== undefined && !user.loggedIn) ||
          dashboard.data) && (
          <Router history={history}>
            <Switch>
              <PrivateRoute exact path="/" component={DashboardPage} />

              <Route path="/login" component={LoginPage} />
              <Redirect from="*" to="/" />
            </Switch>
          </Router>
        )} */}

        <Router history={history}>
          <Switch>
            <PrivateRoute exact path="/" component={DashboardPage} />
            <PrivateRoute
              exact
              path="/image_upload"
              component={ImageUploadPage}
            />
            <PrivateRoute exact path="/canvas" component={CanvasPage} />

            <PrivateRoute
              exact
              path="/d3_practice/:id"
              component={D3PracticePage}
            />
            <PrivateRoute
              exact
              path="/d3_practice"
              component={D3PracticePage}
            />

            <Route path="/login" component={LoginPage} />
            <Redirect from="*" to="/" />
          </Switch>

          {/* {loggedIn ?
                        <Footer styleprops={appFooterStyle} /> :
                    } */}
        </Router>
      </ThemeProvider>
    </MuiPickersUtilsProvider>
  );
}

export { App };
