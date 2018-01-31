import React from 'react';
import { Switch } from 'react-router';
import PropTypes from 'prop-types';
import RouteHook from '../src/index';

export default class ArtistsContainer extends React.Component {
  componentDidMount() {
    this.props.history.push('/artists/1');
  }
  render() {
    return (
      <Switch>
        <RouteHook path="/artists" exact component={() => 'artists'} onEnter={this.props.artistsSpy} />
        <RouteHook path="/artists/:id" component={() => 'artist'} onEnter={this.props.artistSpy} />
      </Switch>
    );
  }
}

ArtistsContainer.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  artistsSpy: PropTypes.func.isRequired,
  artistSpy: PropTypes.func.isRequired,
};
