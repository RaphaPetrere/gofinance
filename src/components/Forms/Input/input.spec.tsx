import React from 'react';
import { render } from '@testing-library/react-native';
import { Input } from '.';
import { ThemeProvider } from 'styled-components/native';
import theme from '../../../global/styles/theme';
import 'jest-styled-components'

const Provider: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>
    { children }
  </ThemeProvider>
);

describe('Component Input', () => {
  it('must have border when active', () => {
    const { getByTestId } = render(
      <Input
        testID="input-email"
        placeholder='E-mail'
        keyboardType='email-address'
        autoCorrect={false}
        active
      />,
      {
        wrapper: Provider
      }
    )

    const input = getByTestId('input-email');
    expect(input.props.style[0].borderColor).toEqual(theme.colors.attention);
  });
});