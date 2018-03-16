import React from 'react';
import PropTypes from 'prop-types';
import RouteHook from '../src/index';

export default class Search extends React.Component {
  componentDidMount() {
    this.props.history.push('/search?query=1');
  }

  render() {
    return (
      <RouteHook path="/search" render={() => null} onEnter={this.props.onEnter} onChange={this.props.onChange} />
    );
  }
}

Search.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  onChange: PropTypes.func,
  onEnter: PropTypes.func,
};

Search.defaultProps = {
  onEnter: () => {},
  onChange: () => {},
};
