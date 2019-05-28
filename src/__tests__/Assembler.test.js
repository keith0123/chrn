import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import Assembler from '../components/Assembler';
import fs from 'fs';
import path from 'path';

function getMockData(){
  const data = {};

  const mockData = path.resolve(__dirname, `../__mocks__/__mockData__`);
  const srMockData = `${mockData}/subreddits.json`;
  const hnMockData = `${mockData}/hnTopIds.json`;

  const subreddits = JSON.parse(fs.readFileSync(srMockData).toString());
  let hackerNewsPosts = JSON.parse(fs.readFileSync(hnMockData).toString());
  hackerNewsPosts = hackerNewsPosts.slice(0, 25);

  data.subreddits = subreddits;
  data.hackerNewsPosts = hackerNewsPosts;

  return data;
}

test('Assembler shallow renders without crashing',  () => {

  const data = getMockData();

  shallow(<Assembler subreddits={data.subreddits.data.children} hackerNewsPosts={data.hackerNewsPosts}/>);
})

test('Assembler deep renders without crashing', () => {

  const data = getMockData();

  const div = document.createElement('div');
  ReactDOM.render(<Assembler subreddits={data.subreddits.data.children} hackerNewsPosts={data.hackerNewsPosts}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});