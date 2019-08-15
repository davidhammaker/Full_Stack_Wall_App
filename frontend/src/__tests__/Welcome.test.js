import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Welcome from '../components/welcome';


configure({ adapter: new Adapter() });


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
