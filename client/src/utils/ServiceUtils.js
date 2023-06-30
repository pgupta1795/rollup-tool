import process from 'process';
import data from '../Settings.json';
import toast from '../helper/toast';

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

// MASS Attribute functions
export const getMassAttributeDetails = (type) =>
  type
    ? getTypeSettings(type)?.MASS_COLUMNS
    : getTypeSettings(DEFAULT_TYPE)?.MASS_COLUMNS;

export const getMassAttributeNames = (type) => {
  if (!type) type = DEFAULT_TYPE;
  const customAttributes = getMassAttributeDetails(type);
  return customAttributes.map((customAttribute) => customAttribute.Attribute);
};

export const getMassAttributeLabels = (attribute, type) => {
  try {
    if (!attribute) return null;
    if (!type) type = DEFAULT_TYPE;
    const customAttributes = getMassAttributeDetails(type);
    return customAttributes?.find((attr) => attr?.Attribute === attribute)
      ?.Label;
  } catch (error) {
    console.error(error);
    toast.error(error);
    throw error;
  }
};

// COST Attribute functions
export const getCostAttributeDetails = (type) =>
  type
    ? getTypeSettings(type)?.COST_COLUMNS
    : getTypeSettings(DEFAULT_TYPE)?.COST_COLUMNS;

export const getCostAttributeNames = (type) => {
  if (!type) type = DEFAULT_TYPE;
  const customAttributes = getCostAttributeDetails(type);
  return customAttributes.map((customAttribute) => customAttribute.Attribute);
};

export const getCostAttributeLabels = (attribute, type) => {
  try {
    if (!attribute) return null;
    if (!type) type = DEFAULT_TYPE;
    const customAttributes = getCostAttributeDetails(type);
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
    const customAttributes = getMassAttributeDetails(type);
    return customAttributes?.find((attr) => attr?.Attribute === attribute)
      ?.Tolerance;
  } catch (error) {
    console.error(error);
    toast.error(error);
    throw error;
  }
};

// export const getCustomAttributeDBName = (type, name) =>
//   `${getAttributeInterface(type)}.${name}`;

export const getCustomAttributeDBName = (type, name) => `${name}`;

export const getAttributeLocalDBName = (attribute, type) => {
  try {
    if (!attribute) return null;
    if (!type) type = DEFAULT_TYPE;
    const customAttributes = getMassAttributeDetails(type);
    return customAttributes?.find((attr) => attr?.Attribute === attribute)
      ?.DB_Name;
  } catch (error) {
    console.error(error);
    toast.error(error);
    throw error;
  }
};
