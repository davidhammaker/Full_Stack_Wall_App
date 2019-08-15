import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import Message from '../components/message';


configure({ adapter: new Adapter() });


it('displays message correctly', () => {
  const message = renderer.create(
    <Message message='message' />
  );
  let tree = message.toJSON();
  expect(tree).toMatchSnapshot();
});

it('displays nothing if no message', () => {
  const message = shallow(<Message />);
  expect(message.contains(<></>)).toBe(true);
});
