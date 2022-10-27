import { OPCUAClient, NodeCrawler } from 'node-opcua';
import * as path from 'path';
import * as fs from 'fs';
import _ from 'lodash';
import { createOpcUaTree } from './treeNodeId';

export const crawle = async (sessionData) => {

  try {
    const { ipAddress, userName, password } = sessionData;
    const client = OPCUAClient.create({
      endpointMustExist: true,
    });

    const endPoint = `opc.tcp://${ipAddress}:4840`;
    const nodeId =
      'ns=4;s=|var|CODESYS Control for Raspberry Pi MC SL.Application.PLC_PRG';
    await client.connect(endPoint);

    const session = await client.createSession({ userName, password });

    const crawler = new NodeCrawler(session);

    const publicOpcUaNodeIds = await crawler.read(nodeId);

    const shapeData = createOpcUaTree(publicOpcUaNodeIds);

    await session.close();
    await client.disconnect();

    return shapeData;
  } catch (err) {
    console.log('err = ', err.message);
  }
};
