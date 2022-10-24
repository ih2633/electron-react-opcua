import _ from 'lodash';
import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

const Pikachu = (data) => {
  const array = _.mapKeys(data, (value, key) => {
    const valueObj = typeof value === 'object';
    const valVal = key === 'dataValue';
    if (valueObj && !valVal) {
      return 'children';
    }
    switch (key) {
      case 'browseName':
        return 'label';
      case 'nodeId':
        return 'id';
      default:
    }
  });
  const compObj = _.pick(array, ['label', 'id', 'children']);
  const valueObj = _.defaults(compObj, { value: `${uuidv4()}//${compObj.id}` });

  return valueObj;
};

const Purin = (arr) => {
  const arrSharp = _.map(arr, Pikachu);
  return arrSharp;
};

export const Okido = (data) => {
  const aaa = Pikachu(data);
  const bbb = Purin(aaa.children);

  const ccc = _.set(aaa, 'children', bbb);
  console.log(ccc);
  return ccc;
};
