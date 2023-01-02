import toast from '../helper/toast';
import { getObjectAttributes } from './ActionsUtils';
import { flatten } from './ArrayUtils';
import { getMassAttributeLabels, getMassAttributeNames } from './ServiceUtils';

const getAttributePreviousValues = (data, attribute) => {
  try {
    const attributeRanges = {};
    data.forEach(({ name, objectOldDetails, objectNewDetails }) => {
      const oldAttributes = getObjectAttributes(objectOldDetails);
      const newAttributes = getObjectAttributes(objectNewDetails);
      const attrValues = Object.prototype.hasOwnProperty.call(
        attributeRanges,
        name
      )
        ? new Set([
            ...attributeRanges[name],
            oldAttributes[attribute],
            newAttributes[attribute],
          ])
        : new Set([oldAttributes[attribute], newAttributes[attribute]]);
      attributeRanges[name] = attrValues;
    });
    return attributeRanges;
  } catch (error) {
    console.error(error);
    toast.error(error);
    throw error;
  }
};

const getObjectsCount = (data) => {
  const objectsCount = {};
  data.forEach(({ name }) => {
    const count = Object.prototype.hasOwnProperty.call(objectsCount, name)
      ? objectsCount[name] + 1
      : 1;
    objectsCount[name] = count;
  });
  return objectsCount;
};

const getStatesCount = (data) => {
  const objectsCount = {};
  data.forEach(({ state }) => {
    const count = Object.prototype.hasOwnProperty.call(objectsCount, state)
      ? objectsCount[state] + 1
      : 1;
    objectsCount[state] = count;
  });
  return objectsCount;
};

const getAttributesCurrentValue = (data, attributeName) => {
  const attributeValues = {};
  data?.forEach((row) => {
    const { name } = row;
    attributeValues[name] = row[attributeName];
  });
  return attributeValues;
};

export const getAttributeRangeSeries = (data, type) => {
  try {
    const attributes = getMassAttributeNames(type);
    const series = [];
    attributes.forEach((attribute) => {
      const serie = {
        name: getMassAttributeLabels(attribute, type),
        data: [],
      };
      const attributeRanges = getAttributePreviousValues(data, attribute);
      Object.keys(attributeRanges).forEach((key) => {
        const attrValues = attributeRanges[key];
        let max = Number(Math.max.apply(this, [...attrValues]));
        const min = Number(Math.min.apply(this, [...attrValues]));
        if (attrValues.size === 1) {
          max += 1;
        }
        serie.data.push({
          x: key,
          y: [min, max],
        });
      });
      series.push(serie);
    });
    return series;
  } catch (error) {
    console.error(error);
    toast.error(error);
    throw error;
  }
};

export const getActionsCountSeries = (data) => {
  try {
    const series = [];
    const serie = {
      name: 'Actions Count',
      data: [],
    };
    const objectsCount = getObjectsCount(data);
    Object.keys(objectsCount).forEach((key) => {
      const count = objectsCount[key];
      serie.data.push({
        x: key,
        y: count,
      });
    });
    series.push(serie);
    return series;
  } catch (error) {
    console.error(error);
    toast.error(error);
    throw error;
  }
};

export const getStateSeriesAndLabels = (rows) => {
  try {
    const series = [];
    const labels = [];
    const data = flatten(rows);
    const statesCount = getStatesCount(data);

    Object.keys(statesCount).forEach((key) => {
      const count = statesCount[key];
      series.push(count);
      labels.push(key);
    });
    return [series, labels];
  } catch (error) {
    console.error(error);
    toast.error(error);
    throw error;
  }
};

export const getAttributeSeries = (rows, type) => {
  try {
    const attributes = getMassAttributeNames(type);
    const labels = new Set();
    const series = [];
    const data = flatten(rows);

    attributes.forEach((attribute) => {
      const serie = {
        name: getMassAttributeLabels(attribute, type),
        type: 'line',
        data: [],
      };
      const objectsAttributeValues = getAttributesCurrentValue(data, attribute);
      Object.keys(objectsAttributeValues).forEach((key) => {
        const attrValue = objectsAttributeValues[key];
        if (!Number.isNaN(attrValue)) serie.data.push(attrValue);
        labels.add(key);
      });
      // eslint-disable-next-line no-plusplus
      // for (let i = 0; i < 1000; i++) {
      //   serie.data.push(Math.floor(Math.random() * (60 - 30 + 1)) + 30);
      //   labels.add(`key${Math.random()}`);
      // }
      series.push(serie);
    });
    return [series, [...labels]];
  } catch (error) {
    console.error(error);
    toast.error(error);
    throw error;
  }
};

export const getMassSeriesAndLabels = (data, type) => {
  try {
    const attributes = getMassAttributeNames(type);
    const series = [];
    const labels = [];

    attributes?.forEach((attribute) => {
      const attrLabel = getMassAttributeLabels(attribute, type);
      if (attrLabel.includes('Mass')) {
        const attributeVals = getAttributesCurrentValue(data, attribute);
        Object.keys(attributeVals).forEach((key) => {
          const val = attributeVals[key];
          series.push(val || 0);
          labels.push(attrLabel);
        });
      }
    });
    return [series, labels];
  } catch (error) {
    console.error(error);
    toast.error(error);
    throw error;
  }
};

export const getAttributesBarSeries = (data, type) => {
  try {
    const attributes = getMassAttributeNames(type);
    const series = [
      {
        data: [],
      },
    ];
    const labels = [];

    attributes?.forEach((attribute) => {
      const attributeVals = getAttributesCurrentValue(data, attribute);
      Object.keys(attributeVals).forEach((key) => {
        const val = attributeVals[key];
        series[0].data.push(val || 0);
        labels.push(getMassAttributeLabels(attribute, type));
      });
    });
    return [series, labels];
  } catch (error) {
    console.error(error);
    toast.error(error);
    throw error;
  }
};
