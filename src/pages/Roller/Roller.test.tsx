import React from 'react';
import { shallow } from 'enzyme';
import { Roller } from 'pages/Roller/Roller';
import Button from 'components/Button/Button';

it('renders Roller page with preset button', () => {
  const wrapper = shallow(<Roller />);
  expect(wrapper.find(Button)).toHaveLength(1);
});
