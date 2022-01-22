import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';
import { Register } from '.';
import theme from '../../global/styles/theme';

const Provider: React.FC = ({ children }) => (
<ThemeProvider theme={theme}>
  {children}
</ThemeProvider>
);

jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: jest.fn(),
  };
});

describe('Register Screen', () => {
  it('should open category modal when user click on button', () => {
    const { getByTestId } = render(
      <Register />, 
      {
        wrapper: Provider
      }
    )

    const categoryModal = getByTestId('modal-category');
    const buttonCategory = getByTestId('button-category');
    fireEvent.press(buttonCategory);

    expect(categoryModal.props.visible).toBeTruthy();
  });
});