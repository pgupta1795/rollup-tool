import toast from '../helper/toast';
import data from '../Settings.json';

const Settings = () => data;

export const ENDPOINT = {
  PASSPORT_URL: Settings().Passport,
  LOGIN_TICKET: Settings().LOGIN_TICKET_ENDPOINT,
  CAS_AUTHENICATION: Settings().CAS_AUTH_ENDPOINT,
  CSRF_TOKEN: Settings().CSRF_ENDPOINT,
  COLLABORATION_SPACE: Settings().COLLABSPACE_ENDPOINT,
};

export const BODY = {
  CAS_AUTHENICATION_BODY: Settings().CAS_AUTHENICATION_BODY,
};

export const TYPES = Settings().TYPES_INFO.map(({ Type }) => Type);

export const getTypeSettings = (type) =>
  Settings().TYPES_INFO.find((typeInfo) => typeInfo?.Type === type);

export const getAttributeInterface = (type) =>
  getTypeSettings(type)?.Attribute_PREFIX || 'XP_VPMReference_Ext';

export const getCustomAttributeNames = (type) => {
  if (!type) type = 'VPMReference';
  const customAttributes = getTypeSettings(type)?.CUSTOM_COLUMNS;
  return customAttributes.map((customAttribute) => customAttribute.Attribute);
};

export const getAttributeLabel = (attribute, type) => {
  try {
    if (!attribute) return null;
    if (!type) type = 'VPMReference';
    const customAttributes = getTypeSettings(type)?.CUSTOM_COLUMNS;
    return customAttributes?.find((attr) => attr?.Attribute === attribute)
      ?.Label;
  } catch (error) {
    console.error(error);
    toast.error(error);
    throw error;
  }
};

export const getCustomAttributeKeys = (type) =>
  type
    ? getTypeSettings(type)?.CUSTOM_COLUMNS
    : getTypeSettings('VPMReference')?.CUSTOM_COLUMNS;

export const getCustomAttributeDBName = (type, name) =>
  `${getAttributeInterface(type)}.${name}`;
