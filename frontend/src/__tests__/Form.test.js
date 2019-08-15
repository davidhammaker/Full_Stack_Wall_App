import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import Form from '../components/form';


configure({ adapter: new Adapter() });


it('displays nothing when not logged in', () => {
  const form = shallow(<Form />);
  expect(form.contains(<></>)).toBe(true);
})

it('displays form when logged in', () => {
  const form = renderer.create(
    <Form username='username' token='token' />
  );
  let tree = form.toJSON();
  expect(tree).toMatchSnapshot();
});

