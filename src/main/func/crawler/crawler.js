import { OPCUAClient, NodeCrawler } from 'node-opcua';
import * as path from 'path';
import * as fs from 'fs';
import _ from 'lodash';
import { Okido } from './coduck.js';

export const crawle = async (data) => {
  const { ipaddress } = data;
  const { username } = data;
  const { password } = data;

  try {
    const client = OPCUAClient.create({
      endpointMustExist: true,
    });

    const endpoint = `opc.tcp://${ipaddress}:4840`;
    const nodeId =
      'ns=4;s=|var|CODESYS Control for Raspberry Pi MC SL.Application.PLC_PRG';
    await client.connect(endpoint);

    const session = await client.createSession({
      userName: username,
      password,
    });

    const crawler = new NodeCrawler(session);

    const data = await crawler.read(nodeId);

    const sharpData = Okido(data);

    // console.log(typeof data)
    // let jsonData = await JSON.stringify(sharpData)

    // fs.writeFileSync("data.json", jsonData)

    await session.close();
    await client.disconnect();

    return sharpData;
  } catch (err) {
    console.log('err = ', err.message);
  }
};
