import * as Props from '../components/GridTable/props';
import * as ServiceUtils from '../utils/ServiceUtils';
import StorageConstants from './StorageConstants';

const tenant = ServiceUtils.TENANT_ID;

export const getSearchBody = (type, spaceUrl, top, skip, name) => {
  let data = null;
  const { SEARCH_ENDPOINT } = ServiceUtils.getTypeSettings(type);

  if (SEARCH_ENDPOINT && spaceUrl) {
    const splitted = SEARCH_ENDPOINT.split('?');
    const endpoint =
      splitted < 1
        ? SEARCH_ENDPOINT.replace('{}', tenant)
        : SEARCH_ENDPOINT.replace('{}', tenant)
            .replace('{}', name || '')
            .replace('{}', top || '')
            .replace('{}', skip);
    data = {
      BASE_URL: spaceUrl,
      GET_ENDPOINT: endpoint,
      headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
        Cookie: localStorage.getItem(StorageConstants.Cookies),
        ENO_CSRF_TOKEN: localStorage.getItem(StorageConstants.CSRF_TOKEN),
        SecurityContext: localStorage.getItem(StorageConstants.Preferred),
      },
    };
  }
  return data;
};

export const getChildrenBody = (type, spaceUrl, id) => {
  let data = null;
  const { GET_ENDPOINT, CHILD_ENDPOINT } = ServiceUtils.getTypeSettings(type);
  if (GET_ENDPOINT && CHILD_ENDPOINT && spaceUrl && id) {
    data = {
      ID: id,
      BASE_URL: spaceUrl,
      tenant,
      GET_ENDPOINT,
      CHILD_ENDPOINT,
      headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
        Cookie: localStorage.getItem(StorageConstants.Cookies),
        ENO_CSRF_TOKEN: localStorage.getItem(StorageConstants.CSRF_TOKEN),
        SecurityContext: localStorage.getItem(StorageConstants.Preferred),
      },
    };
  }
  return data;
};

const getVPMReferencePayload = (type, selectedRow) => {
  const customAttributesIdentifier = Props.KEY_IDENTIFIER;
  const customAttributes = { [customAttributesIdentifier]: {} };
  const { cestamp, title, description } = selectedRow;

  ServiceUtils.getCustomAttributeNames(type)?.forEach((attr) => {
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
  let data = null;
  let payload;
  const { POST_ENDPOINT } = ServiceUtils.getTypeSettings(type);
  if (type === 'VPMReference') {
    payload = getVPMReferencePayload(type, selectedRow);
  }

  if (POST_ENDPOINT && id && payload) {
    const BASE_URL = localStorage.getItem(StorageConstants.SPACE3d);
    const url =
      BASE_URL + POST_ENDPOINT.replace('{}', id).replace('{}', tenant);
    data = {
      URL: url,
      headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
        Cookie: localStorage.getItem(StorageConstants.Cookies),
        ENO_CSRF_TOKEN: localStorage.getItem(StorageConstants.CSRF_TOKEN),
        SecurityContext: localStorage.getItem(StorageConstants.Preferred),
      },
      payload,
    };
  }
  return data;
};
