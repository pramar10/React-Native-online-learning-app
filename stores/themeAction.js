import {darkTheme, lightTheme} from '../constants';
import {
  TOGGLE_THEME_BEGIN,
  TOGGLE_THEME_FAILURE,
  TOGGLE_THEME_SUCCESS,
} from './types';

export const toggleThemeBegin = () => ({
  type: TOGGLE_THEME_BEGIN,
});
export const toggleThemeSuccess = selectedTheme => ({
  type: TOGGLE_THEME_SUCCESS,
  payload: {selectedTheme},
});
export const toggleThemeFailure = error => ({
  type: TOGGLE_THEME_FAILURE,
  payload: {error},
});
export const toggleTheme = themeType => {
  return dispatch => {
    dispatch(toggleThemeBegin());
    switch (themeType) {
      case 'dark':
        dispatch(toggleThemeSuccess(darkTheme));
        break;
      case 'light':
        dispatch(toggleThemeSuccess(lightTheme));
        break;
      default:
        dispatch(toggleThemeFailure({error: 'Invalid theme type'}));
        break;
    }
  };
};
