import React from "react";
import {Route, Redirect} from "react-router-dom";
import PropTypes from "prop-types";

function PrivateRoute({component: Component, roles, ...rest}) {
    return (
        // <Route
        //   {...rest}
        //   render={(props) =>
        //     !localStorage.getItem("user") ? (
        //       <Redirect
        //         to={{ pathname: "/login", state: { from: props.location } }}
        //       />
        //     ) : (
        //       <Component {...props} />
        //     )
        //   }
        // />
        <Route {...rest} render={(props) => <Component {...props} />}/>
    );
}

PrivateRoute.propTypes = {
    roles: PropTypes.string,
};

export {PrivateRoute};
