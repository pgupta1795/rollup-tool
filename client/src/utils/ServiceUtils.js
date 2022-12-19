// eslint-disable-next-line no-unused-vars, import/no-extraneous-dependencies
import process from 'process';
import toast from '../helper/toast';
import data from '../Settings.json';

const DEFAULT_TYPE = 'VPMReference';
const DEFAULT_ATTRIBUTE_PREFIX = 'XP_VPMReference_Ext';
const Settings = () => data;

export const TENANT_ID = process.env.REACT_APP_TENANT;

export const ENDPOINT = {
  LOGIN_TICKET: Settings().LOGIN_TICKET_ENDPOINT,
  LOGOUT_TICKET: Settings().LOGOUT_TICKET_ENDPOINT,
  CAS_AUTHENICATION: Settings().CAS_AUTH_ENDPOINT.replace('{}', TENANT_ID),
  CSRF_TOKEN: Settings().CSRF_ENDPOINT.replace('{}', TENANT_ID),
  COLLABORATION_SPACE: Settings().COLLABSPACE_ENDPOINT.replace('{}', TENANT_ID),
};

export const BODY = {
  CAS_AUTHENICATION_BODY: Settings().CAS_AUTHENICATION_BODY,
};

export const URL = {
  SPACE_URL: Settings().SPACE_URL.replace('{}', TENANT_ID),
  PASSPORT_URL: Settings().PASSPORT_URL.replace('{}', TENANT_ID),
};

export const TYPES = Settings().TYPES_INFO.map(({ Type }) => Type);

export const getTypeSettings = (type) =>
  Settings().TYPES_INFO.find((typeInfo) => typeInfo?.Type === type);

export const getAttributeInterface = (type) =>
  getTypeSettings(type)?.Attribute_PREFIX || DEFAULT_ATTRIBUTE_PREFIX;

export const getMassAttributeKeys = (type) =>
  type
    ? getTypeSettings(type)?.MASS_COLUMNS
    : getTypeSettings(DEFAULT_TYPE)?.MASS_COLUMNS;

export const getCustomAttributeNames = (type) => {
  if (!type) type = DEFAULT_TYPE;
  const customAttributes = getMassAttributeKeys(type);
  return customAttributes.map((customAttribute) => customAttribute.Attribute);
};

export const getAttributeLabel = (attribute, type) => {
  try {
    if (!attribute) return null;
    if (!type) type = DEFAULT_TYPE;
    const customAttributes = getMassAttributeKeys(type);
    return customAttributes?.find((attr) => attr?.Attribute === attribute)
      ?.Label;
  } catch (error) {
    console.error(error);
    toast.error(error);
    throw error;
  }
};

export const getAttributeTolerance = (attribute, type) => {
  try {
    if (!attribute) return null;
    if (!type) type = DEFAULT_TYPE;
    const customAttributes = getMassAttributeKeys(type);
    return customAttributes?.find((attr) => attr?.Attribute === attribute)
      ?.Tolerance;
  } catch (error) {
    console.error(error);
    toast.error(error);
    throw error;
  }
};

export const getCustomAttributeDBName = (type, name) =>
  `${getAttributeInterface(type)}.${name}`;
