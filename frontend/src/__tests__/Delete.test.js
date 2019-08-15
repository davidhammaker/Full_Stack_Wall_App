import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import Delete from '../components/delete';


configure({ adapter: new Adapter() });


it('displays delete button correctly', () => {
  const del = renderer.create(
    <Delete />
  );
  let tree = del.toJSON();
  expect(tree).toMatchSnapshot();
});