import { getPreferredCtx } from '../services/AuthService';
import * as ServiceUtils from '../utils/ServiceUtils';

const tenant = ServiceUtils.TENANT_ID;

const spaceUrl = ServiceUtils.URL.SPACE_URL;

export const KEY_IDENTIFIER = 'dseno:EnterpriseAttributes';

const getCommonHeaders = () => ({
  'Content-type': 'application/json',
  Accept: 'application/json',
  SecurityContext: getPreferredCtx(),
});

export const getSearchBody = (type, top, skip, name) => {
  const { SEARCH_ENDPOINT } = ServiceUtils.getTypeSettings(type);
  if (!SEARCH_ENDPOINT) return null;
  const splitted = SEARCH_ENDPOINT.split('?');
  const endpoint =
    splitted < 1
      ? SEARCH_ENDPOINT.replace('{}', tenant)
      : SEARCH_ENDPOINT.replace('{}', tenant)
          .replace('{}', name || '')
          .replace('{}', top || '')
          .replace('{}', skip);
  return {
    BASE_URL: spaceUrl,
    GET_ENDPOINT: endpoint,
    headers: {
      ...getCommonHeaders(),
    },
  };
};

export const getChildrenBody = (type, id) => {
  const { GET_ENDPOINT, CHILD_ENDPOINT } = ServiceUtils.getTypeSettings(type);
  if (!GET_ENDPOINT || !CHILD_ENDPOINT || !id) return null;
  return {
    ID: id,
    BASE_URL: spaceUrl,
    tenant,
    GET_ENDPOINT,
    CHILD_ENDPOINT,
    headers: {
      ...getCommonHeaders(),
    },
  };
};

const getVPMReferencePayload = (type, selectedRow) => {
  const customAttributesIdentifier = KEY_IDENTIFIER;
  const customAttributes = { [customAttributesIdentifier]: {} };
  const { cestamp, title, description } = selectedRow;

  ServiceUtils.getMassAttributeNames(type)?.forEach((attr) => {
    const attrName = ServiceUtils.getCustomAttributeDBName(type, attr);
    customAttributes[customAttributesIdentifier][attrName] = selectedRow[attr];
  });

  ServiceUtils.getCostAttributeNames(type)?.forEach((attr) => {
    const attrName = ServiceUtils.getCustomAttributeDBName(type, attr);
    customAttributes[customAttributesIdentifier][attrName] = selectedRow[attr];
  });

  return {
    cestamp,
    title,
    description,
    [customAttributesIdentifier]: customAttributes[customAttributesIdentifier],
  };
};

export const getUpdateObjectBody = (type, { id, ...selectedRow }) => {
  const { POST_ENDPOINT } = ServiceUtils.getTypeSettings(type);
  const payload =
    type === 'VPMReference'
      ? getVPMReferencePayload(type, selectedRow)
      : undefined;

  if (!POST_ENDPOINT || !id || !payload) return null;
  return {
    URL: spaceUrl + POST_ENDPOINT.replace('{}', id).replace('{}', tenant),
    headers: {
      ...getCommonHeaders(),
    },
    payload,
  };
};
