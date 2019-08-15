import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import Login from '../components/login';


configure({ adapter: new Adapter() });


it('displays page correctly', () => {
  const login = renderer.create(
    <Login />
  );
  let tree = login.toJSON();
  expect(tree).toMatchSnapshot();
});
