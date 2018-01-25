import React from 'react';
import { Route } from 'react-router';
import PropTypes from 'prop-types';
import HigherComponent from './HigherComponent';


const RouteHook = ({
  path,
  exact,
  strict,
  ...rest
}) => (
  <Route
    path={path}
    exact={exact}
    strict={strict}
    render={routerProps => <HigherComponent routerProps={routerProps} {...rest} />}
  />
);

RouteHook.propTypes = {
  path: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]).isRequired,
  exact: PropTypes.bool,
  strict: PropTypes.bool,

};

RouteHook.defaultProps = {
  exact: false,
  strict: false,
};

export default RouteHook;
