import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import PostForm from '../components/postform';


configure({ adapter: new Adapter() });


it('displays post form correctly', () => {
  const postForm = renderer.create(
    <PostForm username='username' token='token' />
  );
  let tree = postForm.toJSON();
  expect(tree).toMatchSnapshot();
});
