import jwtDecode from 'jwt-decode';

export const ACCESS_TOKEN = 'token';

export const getToken = () => {
  const token = localStorage.getItem(ACCESS_TOKEN);
  if (!token) throw new Error('Cookies Token could not found');
  return token;
};

export const setToken = (token) => {
  const details = jwtDecode(token);
  console.log({ details });
  localStorage.setItem('preferred', details.preferred);
  localStorage.setItem('token', token);
};

export const removeToken = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('preferred');
};

/** ************ REFRESH TOKEN *************** */

// export const isTokenExpired = () => {
//   const decoded = jwtDecode(getToken);
//   return decoded.iat > Date.now();
// };

// const refreshToken = async () => {
//   const newToken = await axios.post('/refresh_endpoint');
//   setToken(newToken);
// };

// axios.interceptors.request.use(
//   async (config) => {
//     if (isTokenExpired()) await refreshToken();
//   },
//   (error) =>
//     // Do something with request error
//     Promise.reject(error)
// );
