import toast from '../helper/toast';

export const getObjectAttributes = (objectDetails) => {
  try {
    const {
      type,
      title,
      state,
      description,
      cestamp,
      name,
      revision,
      owner,
      ...attributes
    } = JSON.parse(objectDetails);
    return attributes;
  } catch (error) {
    console.error(error);
    toast.error(error);
    throw error;
  }
};

const getObject = (objectDetails) => {
  const {
    type,
    title,
    state,
    description,
    cestamp,
    name,
    revision,
    owner,
    ...attributes
  } = objectDetails;
  return {
    type,
    title,
    state,
    description,
    ...attributes,
  };
};

export const formatActions = (results) => {
  try {
    const formattedActions = results.map((action) => {
      const { _id, createdAt, objectOldDetails, objectNewDetails, objectId } =
        action;
      const { name, state } = objectNewDetails;
      return {
        key: _id,
        type: 'VPMReference',
        id: objectId,
        createdAt: new Date(createdAt),
        name,
        state,
        objectOldDetails: JSON.stringify(getObject(objectOldDetails)),
        objectNewDetails: JSON.stringify(getObject(objectNewDetails)),
      };
    });
    return formattedActions;
  } catch (error) {
    console.error(error);
    toast.error(error);
    throw error;
  }
};
