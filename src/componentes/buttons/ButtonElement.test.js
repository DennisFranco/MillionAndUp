import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import ButtonElement from './ButtonElement';
import { NativeBaseProvider, extendTheme } from 'native-base';
import colors from '../../theme/colors';
import { fontFamily } from '../../theme';

const theme = extendTheme({
  colors: colors,
  fonts: {
    heading: fontFamily.PoppinsMedium,
    body: fontFamily.PoppinsMedium,
    mono: fontFamily.PoppinsMedium,
  },
});

test('should render the text of the button element', () => {
  const {queryByTestId} = render(<NativeBaseProvider theme={theme}><ButtonElement data-testid='buttonElement'text='Hello World' /></NativeBaseProvider>);

  const text = queryByTestId("buttonElement");
  
  expect(text).toBeDefined(); 
});
