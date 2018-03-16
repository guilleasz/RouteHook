import React from 'react';
import { Route, MemoryRouter } from 'react-router';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import PropTypes from 'prop-types';
import RouteHook from '../src/index';
import ArtistsContainer from './ArtistsContainer';
import Search from './Search';

chai.use(sinonChai);

configure({ adapter: new Adapter() });

const Test = () => (
  <div>Hola</div>
);

class Transition extends React.Component {
  componentDidMount() {
    this.props.history.push('/test/1');
  }
  render() {
    return <RouteHook path="/test" exact={this.props.exact} component={Test} onChange={this.props.spy} onLeave={this.props.spy} />;
  }
}
Transition.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
  spy: PropTypes.func.isRequired,
  exact: PropTypes.bool,
};

Transition.defaultProps = {
  exact: false,
};

describe('RouteHook', () => {
  it('returns a Route', () => {
    const wrapper = shallow(<RouteHook />);
    expect(wrapper.find(Route)).to.have.lengthOf(1);
  });
  it('render the component when route match', () => {
    const router = (
      <MemoryRouter initialEntries={['/test']}>
        <RouteHook path="/test" component={Test} />
      </MemoryRouter>
    );
    const wrapper = mount(router);
    expect(wrapper.find(Test)).to.have.lengthOf(1);
  });
  it('render the render when route match', () => {
    const router = (
      <MemoryRouter initialIndex={0} initialEntries={['/test']}>
        <RouteHook path="/test" render={Test} />
      </MemoryRouter>
    );
    const wrapper = mount(router);
    expect(wrapper.contains(Test())).to.equal(true);
  });
  it('should run the function onEnter when component is mounted', () => {
    const spy = sinon.spy();
    const router = (
      <MemoryRouter initialIndex={0} initialEntries={['/test']}>
        <RouteHook path="/test" component={Test} onEnter={spy} />
      </MemoryRouter>
    );
    mount(router);
    expect(spy).to.have.been.calledOnce; // eslint-disable-line no-unused-expressions
  });
  it('shouldn\'t run the function onEnter if the component is not mounted', () => {
    const spy = sinon.spy();
    const router = (
      <MemoryRouter initialIndex={0} initialEntries={['/wrong']}>
        <RouteHook path="/test" component={Test} onEnter={spy} />
      </MemoryRouter>
    );
    mount(router);
    expect(spy).to.not.have.been.called; // eslint-disable-line no-unused-expressions
  });
  it('the onEnter function should receive the router props as arguments', () => {
    const spy = sinon.spy();
    const router = (
      <MemoryRouter initialIndex={0} initialEntries={['/test']}>
        <RouteHook path="/test" component={Test} onEnter={spy} />
      </MemoryRouter>
    );
    mount(router);
    expect(spy.args[0][0].match).to.exist; // eslint-disable-line no-unused-expressions
    expect(spy.args[0][0].location).to.exist; // eslint-disable-line no-unused-expressions
    expect(spy.args[0][0].history).to.exist; // eslint-disable-line no-unused-expressions
  });
  it('the rendered component should receive the router props', () => {
    const router = (
      <MemoryRouter initialIndex={0} initialEntries={['/test']}>
        <RouteHook path="/test" component={Test} />
      </MemoryRouter>
    );
    const wrapper = mount(router);
    expect(wrapper.find(Test).prop('match')).to.exist; // eslint-disable-line no-unused-expressions
    expect(wrapper.find(Test).prop('location')).to.exist; // eslint-disable-line no-unused-expressions
    expect(wrapper.find(Test).prop('history')).to.exist; // eslint-disable-line no-unused-expressions
  });
  it('the rendered by render component should receive the router props', () => {
    const router = (
      <MemoryRouter initialIndex={0} initialEntries={['/test']}>
        <RouteHook path="/test" render={Test} />
      </MemoryRouter>
    );
    const wrapper = mount(router);
    expect(wrapper.find(Test).prop('match')).to.exist; // eslint-disable-line no-unused-expressions
    expect(wrapper.find(Test).prop('location')).to.exist; // eslint-disable-line no-unused-expressions
    expect(wrapper.find(Test).prop('history')).to.exist; // eslint-disable-line no-unused-expressions
  });
  it('should run the onChange function when the url changes', () => {
    const spy = sinon.spy();
    const router = (
      <MemoryRouter initialIndex={0} initialEntries={['/test']}>
        <Route path="/" render={props => <Transition {...props} spy={spy} />} />
      </MemoryRouter>
    );
    mount(router);
    expect(spy).to.have.been.calledOnce; // eslint-disable-line no-unused-expressions
  });
  it('should run the onChange function with old routerProps and newOnes', () => {
    const spy = sinon.spy();
    const router = (
      <MemoryRouter initialIndex={0} initialEntries={['/test']}>
        <Route path="/" render={props => <Transition {...props} spy={spy} />} />
      </MemoryRouter>
    );
    mount(router);
    expect(spy.args[0][0].match).to.exist; // eslint-disable-line no-unused-expressions
    expect(spy.args[0][0].location).to.exist; // eslint-disable-line no-unused-expressions
    expect(spy.args[0][0].history).to.exist; // eslint-disable-line no-unused-expressions
    expect(spy.args[0][1].match).to.exist; // eslint-disable-line no-unused-expressions
    expect(spy.args[0][1].location).to.exist; // eslint-disable-line no-unused-expressions
    expect(spy.args[0][1].history).to.exist; // eslint-disable-line no-unused-expressions
    expect(spy.args[0][1].location.pathname).to.equal('/test');
    expect(spy.args[0][0].location.pathname).to.equal('/test/1');
  });
  it('should run the onLeave function when the url changes and the component unmounts', () => {
    const spy = sinon.spy();
    const router = (
      <MemoryRouter initialIndex={0} initialEntries={['/test']}>
        <Route path="/" render={props => <Transition exact {...props} spy={spy} />} />
      </MemoryRouter>
    );
    mount(router);
    expect(spy).to.have.been.calledOnce; // eslint-disable-line no-unused-expressions
  });
  it('should run the onLeave function with the routerProps', () => {
    const spy = sinon.spy();
    const router = (
      <MemoryRouter initialIndex={0} initialEntries={['/test']}>
        <Route path="/" render={props => <Transition exact {...props} spy={spy} />} />
      </MemoryRouter>
    );
    mount(router);
    expect(spy.args[0][0].match).to.exist; // eslint-disable-line no-unused-expressions
    expect(spy.args[0][0].location).to.exist; // eslint-disable-line no-unused-expressions
    expect(spy.args[0][0].history).to.exist; // eslint-disable-line no-unused-expressions
    expect(spy.args[0][0].location.pathname).to.equal('/test');
    expect(spy.args[0]).to.have.lengthOf(1);
  });
  it('should run the onEnter function when it changes for similar routes with switch', () => {
    const artistsSpy = sinon.spy();
    const artistSpy = sinon.spy();
    const router = (
      <MemoryRouter initialIndex={0} initialEntries={['/artists']}>
        <Route path="/" render={props => <ArtistsContainer {...props} artistsSpy={artistsSpy} artistSpy={artistSpy} />} />
      </MemoryRouter>
    );
    mount(router);
    expect(artistsSpy).to.have.been.calledOnce; // eslint-disable-line no-unused-expressions
    expect(artistSpy).to.have.been.calledOnce; // eslint-disable-line no-unused-expressions
  });
  it('shouldn`t run onEnter when search query changes', () => {
    const onEnter = sinon.spy();
    const router = (
      <MemoryRouter initialIndex={0} initialEntries={['/search']}>
        <Route path="/" render={props => <Search {...props} onEnter={onEnter} />} />
      </MemoryRouter>
    );
    mount(router);
    expect(onEnter).to.have.been.calledOnce; // eslint-disable-line no-unused-expressions
  });

  it('should run onChange when search query changes', () => {
    const onChange = sinon.spy();
    const router = (
      <MemoryRouter initialIndex={0} initialEntries={['/search']}>
        <Route path="/" render={props => <Search {...props} onChange={onChange} />} />
      </MemoryRouter>
    );

    mount(router);
    expect(onChange).to.have.been.calledOnce; // eslint-disable-line no-unused-expressions
  });
});
