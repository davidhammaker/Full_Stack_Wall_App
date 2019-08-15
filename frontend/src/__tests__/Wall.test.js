import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import Wall from '../components/wall';


configure({ adapter: new Adapter() });


it('displays page correctly', () => {
  const wall = renderer.create(
    <Wall />
  );
  let tree = wall.toJSON();
  expect(tree).toMatchSnapshot();
});
