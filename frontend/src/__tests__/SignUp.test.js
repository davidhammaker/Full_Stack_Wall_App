import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import SignUp from '../components/signup';


configure({ adapter: new Adapter() });


it('displays page correctly', () => {
  const signUp = renderer.create(
    <SignUp />
  );
  let tree = signUp.toJSON();
  expect(tree).toMatchSnapshot();
});
