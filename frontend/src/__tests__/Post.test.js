import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import Post from '../components/post';
import Delete from '../components/delete';


configure({ adapter: new Adapter() });


it('displays a post', () => {
  const testPost = {
    id: 1,
    content: 'test 1',
    creator: 'testUser',
    date_posted: '2019-08-14T00:17:28.427013Z'
  };
  const post = shallow(
    <Post key={ testPost.id } post={ testPost } />
  );

  expect(post.text()).toContain('test 1');
});

it('displays a re-formatted date', () => {
  const testPost = {
    id: 1,
    content: 'test 1',
    creator: 'testUser',
    date_posted: '2019-08-14T00:17:28.427013Z'
  };
  const post = shallow(
    <Post key={ testPost.id } post={ testPost } />
  );

  expect(post.text()).toContain('12:17 AM, 08/14/2019');
});

it('displays post correctly', () => {
  const testPost = {
    id: 1,
    content: 'test 1',
    creator: 'testUser',
    date_posted: '2019-08-14T00:17:28.427013Z'
  };
  const post = renderer.create(
    <Post key={ testPost.id } post={ testPost } />
  );
  let tree = post.toJSON();
  expect(tree).toMatchSnapshot();
}); 

it('displays post without delete button for unowned posts', () => {
  const testPost = {
    id: 1,
    content: 'test 1',
    creator: 'testUser',
    date_posted: '2019-08-14T00:17:28.427013Z'
  };
  const post = shallow(
    <Post key={ testPost.id } post={ testPost } />
  );
  expect(post.contains(<Delete />)).toBe(false);
});

it('displays post with delete button for owned posts', () => {
  const testPost = {
    id: 1,
    content: 'test 1',
    creator: 'testUser',
    date_posted: '2019-08-14T00:17:28.427013Z'
  };
  const post = shallow(
    <Post key={ testPost.id } post={ testPost } username='testUser' token='token' />
  );
  expect(post.contains(<Delete post={ testPost } token='token' />)).toBe(true);
});
