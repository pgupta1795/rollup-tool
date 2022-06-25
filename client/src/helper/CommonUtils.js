import StorageConstants from './StorageConstants';

export const setStorage = (storageItems) => {
  const {
    firstname,
    lastname,
    Cookies,
    securityContexts,
    preferred,
    CSRF_TOKEN,
  } = storageItems;
  localStorage.setItem(StorageConstants.FirstName, firstname);
  localStorage.setItem(StorageConstants.LastName, lastname);
  localStorage.setItem(StorageConstants.Cookies, Cookies);
  localStorage.setItem(StorageConstants.SecurityContexts, securityContexts);
  localStorage.setItem(StorageConstants.Preferred, preferred);
  localStorage.setItem(StorageConstants.CSRF_TOKEN, CSRF_TOKEN);
  localStorage.setItem(StorageConstants.SPACE3d, storageItems['3dspace']);
};

export const removeStorage = () => {
  localStorage.removeItem(StorageConstants.FirstName);
  localStorage.removeItem(StorageConstants.LastName);
  localStorage.removeItem(StorageConstants.Cookies);
  localStorage.removeItem(StorageConstants.SecurityContexts);
  localStorage.removeItem(StorageConstants.Preferred);
  localStorage.removeItem(StorageConstants.CSRF_TOKEN);
  localStorage.removeItem(StorageConstants.SPACE3d);
};

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
