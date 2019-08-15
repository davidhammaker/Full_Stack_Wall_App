import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Links from '../components/links';


configure({ adapter: new Adapter() });


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
