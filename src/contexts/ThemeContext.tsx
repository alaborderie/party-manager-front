import React from 'react';
import theme from "../theme";

export interface IThemeContext {
  breakpoints: Array<string>;
  fontSizes: Array<number>;
  colors: Object;
  space: Array<number>;
  fonts: Object;
  shadows: Object;
}

export const ThemeContext = React.createContext<IThemeContext | null>(theme);
