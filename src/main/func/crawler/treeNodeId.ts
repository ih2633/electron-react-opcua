import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';


const renameNodeId = (nodeIds) => {
  const replaceNodeIds = _.mapKeys(nodeIds, (value, key:string) => {
    const isObject = typeof value === 'object';
    switch (key) {
      case 'browseName':
        return 'label';
      case 'nodeId':
        return 'id';
      default:
        const isNotDataValue = key !== 'dataValue';
        if (isObject && isNotDataValue) {
          return 'children';
        }
    }
  });
  const pickTargetNodeIds = _.pick(replaceNodeIds, ['label', 'id', 'children']);
  const stringAddNodeIds = _.defaults(pickTargetNodeIds, {
    value: `${uuidv4()}//${pickTargetNodeIds.id}`,
  });

  return stringAddNodeIds;
};

export const createOpcUaTree = (nodeOpcUaIds) => {
  const parent = renameNodeId(nodeOpcUaIds);
  const children = _.map(parent.children, renameNodeId);

  const nodeTree = _.set(parent, 'children', children);
  return nodeTree;
};
