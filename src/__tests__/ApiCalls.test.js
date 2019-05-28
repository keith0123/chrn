import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import ApiCalls from '../components/ApiCalls';

test('ApiCalls shallow renders without crashing',  () => {
  shallow(<ApiCalls />);
})

test('ApiCalls deep renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ApiCalls />, div);
  ReactDOM.unmountComponentAtNode(div);
});