import React from 'react';
import { render } from '@testing-library/react-native';
import App from './App';

jest.mock('aws-amplify');
jest.mock('@/services/sentry');
jest.mock('@/api/amplify');
jest.mock('@/services/location');
jest.mock('@/services/analytics');
jest.mock('@/utilities/testUtility');

describe('<App />', () => {
  it('renders correctly', () => {
    const tree = render(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('displays process.env.NODE_ENV', () => {
    const { getByText } = render(<App />);
    const text = getByText(new RegExp('^process\.env\.NODE_ENV: [a-zA-z0-9]+'));
    expect(text).not.toBeNull();
  });

  it('displays process.env.NAME', () => {
    const { getByText } = render(<App />);
    const text = getByText(new RegExp('^process\.env\.NAME: [a-zA-z0-9]+'));
    expect(text).not.toBeNull();
  });
});
