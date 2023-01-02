export const getCookies = () =>
  Object.fromEntries(
    document.cookie
      .split('; ')
      .map((v) => v.split(/=(.*)/s).map(decodeURIComponent))
  );

export const getUserName = () => {
  const { username } = getCookies();
  return username;
};
