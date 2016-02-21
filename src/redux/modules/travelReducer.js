import { fromJS } from 'immutable';

const initialState = fromJS([
  { name: 'Australia', current: true },
  { name: 'Denmark' },
  { name: 'France' },
  { name: 'Germany' },
  { name: 'Ireland' },
  { name: 'Italy' },
  { name: 'Portugal' },
  { name: 'Sweden' },
  { name: 'United Arab Emirates' },
  { name: 'United Kingdom' },
  { name: 'United States of America',
    states: [
      { name: 'California' },
      { name: 'Florida' },
      { name: 'Illinois' },
      { name: 'Nevada' },
      { name: 'New York' },
      { name: 'North Carolina' },
      { name: 'Oregon' },
    ],
  },
  { name: 'Belgium' },
  { name: 'Gibraltar' },
  { name: 'Greece' },
  { name: 'Israel' },
  { name: 'Jersey' },
  { name: 'Latvia' },
  { name: 'Malta' },
  { name: 'Mauritius' },
  { name: 'Monaco' },
  { name: 'Netherlands' },
  { name: 'Spain' },
  { name: 'Turkey' },
]);

export default function mapReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
