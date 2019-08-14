import React from 'react';
import ReactDOM from 'react-dom';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './App';
import Post from './components/post';


configure({ adapter: new Adapter() });


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});


// Posts
it('displays a post', () => {
  // Render a post with content
  const testPost = {
    id: 1,
    content: 'test 1',
    username: 'testUser',
    date_posted: '2019-08-14T00:17:28.427013Z'
  };
  const post = shallow(
    <Post key={ testPost.id } post={ testPost } />
  );

  expect(post.text()).toContain('test 1');
});

it('displays a re-formatted date', () => {
  // Render a post with content
  const testPost = {
    id: 1,
    content: 'test 1',
    username: 'testUser',
    date_posted: '2019-08-14T00:17:28.427013Z'
  };
  const post = shallow(
    <Post key={ testPost.id } post={ testPost } />
  );

  expect(post.text()).toContain('12:17 AM, 08/14/2019');
});

it('displays the correct content', () => {
  // Render a post with content
  const testPost = {
    id: 1,
    content: 'test 1',
    username: 'testUser',
    date_posted: '2019-08-14T00:17:28.427013Z'
  };
  const post = shallow(
    <Post key={ testPost.id } post={ testPost } />
  );

  expect(post.text()).toContain('test 1');
});

