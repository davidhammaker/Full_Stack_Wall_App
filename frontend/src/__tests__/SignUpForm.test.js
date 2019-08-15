import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import SignUpForm from '../components/signupform';


configure({ adapter: new Adapter() });


it('displays form correctly', () => {
  const signUpForm = renderer.create(
    <SignUpForm />
  );
  let tree = signUpForm.toJSON();
  expect(tree).toMatchSnapshot();
});
