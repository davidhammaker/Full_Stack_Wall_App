import React from 'react';
import ReactDOM from 'react-dom';
import { configure, shallow, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import App from './App';
import Post from './components/post';
import ListedPosts from './components/listedposts';
import Links from './components/links';
import Welcome from './components/welcome';
import PostForm from './components/postform';
import Form from './components/form';


configure({ adapter: new Adapter() });


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});


// Posts
it('displays a post', () => {
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

it('displays post correctly', () => {
  const testPost = {
    id: 1,
    content: 'test 1',
    username: 'testUser',
    date_posted: '2019-08-14T00:17:28.427013Z'
  };
  const post = renderer.create(
    <Post key={ testPost.id } post={ testPost } />
  );
  let tree = post.toJSON();
  expect(tree).toMatchSnapshot();
});


// ListedPosts
it('displays the correct number of posts', () => {
  // Render a posts with content
  const testPosts = [
    {
      id: 2,
      content: 'test 2',
      username: 'testUser',
      date_posted: '2019-08-14T00:17:28.427013Z'
    },
    {
      id: 1,
      content: 'test 1',
      username: 'testUser',
      date_posted: '2019-08-13T00:17:28.427013Z'
    }
  ];
  const listedPosts = shallow(
    <ListedPosts posts={ testPosts } />
  );

  expect(listedPosts.contains(
    <>
      <Post key="2" post={ testPosts[0] } />
      <Post key="1" post={ testPosts[1] } />
    </>
    )
  ).toBe(true);
});

it('displays message if no posts', () => {
  // Render a posts with content
  const testPosts = [];
  const listedPosts = shallow(
    <ListedPosts posts={ testPosts } />
  );

  expect(listedPosts.text()).toContain('Nothing has been posted yet.');
});


// Links
it('displays login/signup links if not logged in', () => {
  // Render links
  const links = shallow(
    <Links />
  );

  expect(links.text()).toContain('Log In');
  expect(links.text()).toContain('Sign Up');
});

it('displays logout link if logged in', () => {
  // Render links with token
  const links = shallow(
    <Links token='token' />
  );

  expect(links.text()).toContain('Log Out');
});


// Welcome
it('displays login request if not logged in', () => {
  // Render welcome
  const welcome = shallow(
    <Welcome />
  );

  expect(welcome.text()).toContain('Please log in to post on the wall.');
});

it('displays welcome if logged in', () => {
  // Render welcome with token and username
  const welcome = shallow(
    <Welcome token='token' username='username' />
  );

  expect(welcome.text()).toContain('Welcome, username!');
});


// PostForm
it('displays post form correctly', () => {
  const postForm = renderer.create(
    <PostForm username='username' token='token' />
  );
  let tree = postForm.toJSON();
  expect(tree).toMatchSnapshot();
});


// Form
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

