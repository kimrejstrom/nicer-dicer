import React from 'react';
import { shallow } from 'enzyme';
import { Home } from 'pages/Home/Home';

it('renders welcome message', () => {
  const wrapper = shallow(<Home />);
  const welcome = <h1 className="text-center">RR Starter-kit 2020</h1>;
  expect(wrapper).toContainReact(welcome);
});
