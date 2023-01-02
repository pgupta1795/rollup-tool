export const isEqual = (o1, o2) => JSON.stringify(o1) === JSON.stringify(o2);

export const stringToColor = (string) => {
  let hash = 0;
  let i;
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = '#';
  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  return color;
};

export const stringAvatar = (name) => {
  if (name)
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  return null;
};

export const authenticateTableData = (response) => {
  if (JSON.stringify(response).includes('<html>')) {
    const err = 'Please login again';
    throw err;
  }
  return (
    (response && response.member && response.nlsLabel) ||
    (response && response.data && response.children)
  );
};

export const roundOff = (number) =>
  Math.round((number + Number.EPSILON) * 1000) / 1000;

/**
 * accepts a color starting with # or not, with 6 characters or 3 characters
 * ex : shadeColor('#54b946', 40) will give lighter tone color
 * @param {*} col
 * @param {amount is a multiple of 40 here} amt
 * @returns
 */
export const shadeColor = (col, amt) => {
  if (!col) return 'inherit';
  col = col.replace(/^#/, '');
  if (col.length === 3)
    col = col[0] + col[0] + col[1] + col[1] + col[2] + col[2];

  let [r, g, b] = col.match(/.{2}/g);
  [r, g, b] = [
    parseInt(r, 16) + amt,
    parseInt(g, 16) + amt,
    parseInt(b, 16) + amt,
  ];

  r = Math.max(Math.min(255, r), 0).toString(16);
  g = Math.max(Math.min(255, g), 0).toString(16);
  b = Math.max(Math.min(255, b), 0).toString(16);

  const rr = (r.length < 2 ? '0' : '') + r;
  const gg = (g.length < 2 ? '0' : '') + g;
  const bb = (b.length < 2 ? '0' : '') + b;

  return `#${rr}${gg}${bb}`;
};
