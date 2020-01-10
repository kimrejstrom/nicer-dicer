import React from 'react';
import { shallow } from 'enzyme';
import { Home } from 'pages/Home/Home';

it('renders welcome message', () => {
  const wrapper = shallow(<Home />);
  const welcome = (
    <div className="text-white text-xl pb-4">The Ultimate RPG Dice Roller</div>
  );
  expect(wrapper).toContainReact(welcome);
});
