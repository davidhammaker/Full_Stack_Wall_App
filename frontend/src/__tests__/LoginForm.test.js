import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import LoginForm from '../components/loginform';


configure({ adapter: new Adapter() });


it('displays form correctly', () => {
  const loginForm = renderer.create(
    <LoginForm />
  );
  let tree = loginForm.toJSON();
  expect(tree).toMatchSnapshot();
});
