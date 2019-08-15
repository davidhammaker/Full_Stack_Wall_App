import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Post from '../components/post';
import ListedPosts from '../components/listedposts';


configure({ adapter: new Adapter() });


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
