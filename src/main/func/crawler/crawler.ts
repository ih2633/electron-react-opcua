import {
  OPCUAClient,
  NodeCrawler,
  UserIdentityInfoUserName,
  UserTokenType,
} from 'node-opcua';
import _ from 'lodash';
import { SessionData } from '@/@types/SessionData';
import { NodeInfo } from '@/@types/sessionData';
import { v4 as uuidv4 } from 'uuid';

export class NodeTree {
  renameNodeId = (nodeIds: any) => {
    console.log('renameNodeId');
    console.log(nodeIds);
    const replaceNodeIds = _.mapKeys(nodeIds, (value, key) => {
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
    const pickTargetNodeIds = _.pick(replaceNodeIds, [
      'label',
      'id',
      'children',
    ]);
    const stringAddNodeIds = _.defaults(pickTargetNodeIds, {
      value: `${uuidv4()}//${pickTargetNodeIds.id}`,
    });

    return stringAddNodeIds;
  };

  createOpcUaTree = (nodeOpcUaIds: any) => {
    console.log('aaaa');
    const parent = this.renameNodeId(nodeOpcUaIds);
    console.log({ parent });
    const children = _.map(parent.children, this.renameNodeId);

    const nodeTree = _.set(parent, 'children', children);
    return nodeTree;
  };

  public crawle = async (sessionData: SessionData) => {
    try {
      const { ipAddress, userName, password } = sessionData;
      const client = OPCUAClient.create({
        endpointMustExist: true,
      });

      const endpoint = `opc.tcp://${ipAddress}:4840`;
      const nodeId =
        'ns=4;s=|var|CODESYS Control for Raspberry Pi MC SL.Application.PLC_PRG';
      await client.connect(endpoint);

      console.log('connect');
      const session = await client.createSession(<UserIdentityInfoUserName>{
        type: UserTokenType.UserName,
        userName: userName,
        password: password,
      });

      const crawler = new NodeCrawler(session);

      const publicOpcUaNodeIds = await crawler.read(nodeId);

      console.log({ publicOpcUaNodeIds });
      const shapeData = this.createOpcUaTree(publicOpcUaNodeIds);

      await session.close();
      await client.disconnect();

      return shapeData;
    } catch (err: any) {
      console.log('err = ', err.message);
    } finally {
      console.log('end');
    }
  };
}
