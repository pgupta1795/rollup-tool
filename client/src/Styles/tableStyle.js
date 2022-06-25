/* eslint-disable import/prefer-default-export */
const PROPERTY_BG_COLOR = '--table-bg-color';

const PROPERTY_TEXT_COLOR = '--table-text-color';

const GRAY_LIGHT = '#d3d3d3';

const BLACK_LIGHT = '#1e1e1e';

export const setRowStyle = (previous) => {
  document.documentElement.style.setProperty(
    PROPERTY_BG_COLOR,
    !previous ? BLACK_LIGHT : GRAY_LIGHT
  );
  document.documentElement.style.setProperty(
    PROPERTY_TEXT_COLOR,
    !previous ? GRAY_LIGHT : BLACK_LIGHT
  );
};
