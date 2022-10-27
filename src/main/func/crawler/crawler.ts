import {
  OPCUAClient,
  NodeCrawler,
  UserIdentityInfoUserName,
  UserTokenType,
} from 'node-opcua';
import _ from 'lodash';
import {SessionData} from '@/@types/SessionData'
import { NodeInfo } from '@/@types/sessionData';
import { v4 as uuidv4 } from 'uuid';


export const crawle = async (sessionData:SessionData) => {

  try {
    const { ipAddress, userName, password } = sessionData;
    const client = OPCUAClient.create({
      endpointMustExist: true,
    });

    const endPoint = `opc.tcp://${ipAddress}:4840`;
    const nodeId =
      'ns=4;s=|var|CODESYS Control for Raspberry Pi MC SL.Application.PLC_PRG';
    await client.connect(endPoint);

    const session = await client.createSession(<UserIdentityInfoUserName>{
      type: UserTokenType.UserName,
      userName: userName,
      password: password,
    });

    const crawler = new NodeCrawler(session);

    const publicOpcUaNodeIds = await crawler.read(nodeId);

    console.log(publicOpcUaNodeIds)
    const shapeData = createOpcUaTree(publicOpcUaNodeIds);

    await session.close();
    await client.disconnect();

    return shapeData;
  } catch (err) {
    console.log('err = ', err.message);
  }
};


const renameNodeId = (nodeIds: Map<string, NodeInfo>) => {
  const replaceNodeIds = _.mapKeys(nodeIds, (value: NodeInfo, key: string) => {
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

const createOpcUaTree = (nodeOpcUaIds: any) => {
  const parent = renameNodeId(nodeOpcUaIds);
  console.log(parent);
  const children = _.map(parent.children, renameNodeId);

  const nodeTree = _.set(parent, 'children', children);
  return nodeTree;
};

