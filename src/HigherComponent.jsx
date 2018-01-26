import React from 'react';
import PropTypes from 'prop-types';

export default class HigherComponent extends React.Component {
  componentDidMount() {
    this.props.onEnter(this.props.routerProps);
  }

  componentWillReceiveProps(nextProps) {
    this.props.onChange(nextProps.routerProps, this.props.routerProps);
  }

  componentWillUnmount() {
    this.props.onLeave(this.props.routerProps);
  }

  render() {
    const { component: Component, render: Render, routerProps } = this.props;
    if (Component) return <Component {...routerProps} />;
    return <Render {...routerProps} />;
  }
}

HigherComponent.propTypes = {
  component: PropTypes.func,
  render: PropTypes.func,
  onEnter: PropTypes.func,
  routerProps: PropTypes.shape({
    match: PropTypes.object,
    history: PropTypes.object,
    location: PropTypes.object,
  }).isRequired,
  onChange: PropTypes.func,
  onLeave: PropTypes.func,
};

HigherComponent.defaultProps = {
  component: null,
  render: null,
  onEnter: () => {},
  onChange: () => {},
  onLeave: () => {},  
};
