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

export const removeCookies = () => {
  const cookies = getCookies();
  Object.keys(cookies)?.forEach((c) => {
    document.cookie = c
      .replace(/^ +/, '')
      .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
  });
};
