import {
  OPCUAClient,
  NodeCrawler,
  UserIdentityInfoUserName,
  UserTokenType,
  Pojo
} from 'node-opcua';
import { v4 as uuidv4 } from 'uuid';
import { SessionData, NodeInfo } from '@/@types/sessionData';


export const createTree = async (sessionData: SessionData) => {
  const { ipAddress, userName, password } = sessionData;

  const client = OPCUAClient.create({
    endpointMustExist: true,
  });

  const endpoint = `opc.tcp://${ipAddress}:4840`;
  const nodeId = 'ns=0;i=85';
  await client.connect(endpoint);

  console.log('connect');
  const session = await client.createSession(<UserIdentityInfoUserName>{
    type: UserTokenType.UserName,
    userName: userName,
    password: password,
  });

  const crawler = new NodeCrawler(session);

  const publicOpcUaNodeIds:Pojo = await crawler.read(nodeId);

  console.log({ publicOpcUaNodeIds });

  const shapeData = renameInfo(publicOpcUaNodeIds);

  await session.close();
  await client.disconnect();

  return shapeData;
};

const renameInfo = (nodeInfo:Pojo) => {

  const renamed = Object.entries(nodeInfo).map(([key, value]) => {
    const isValueArray = Array.isArray(value);
    if (isValueArray) {
      const isNotDataValue = key !== 'dataValue';

      if (isNotDataValue) {
        const mapValue = value?.map((x) => {
          const aaa = renameInfo(x);
          return aaa;
        });
        return ['children', mapValue];
      }
    }

    switch (key) {
      case 'browseName':
        let labelName:string = value as string
        if (labelName.length > 20) {
           return ['label', labelName.substring(0, 17) + '...'];
        }
        return ['label', labelName];
      case 'nodeId':
        return ['id', value];
    }
  }) as [string, any]

  const hituyounonai = renamed.filter((v) => v);
  const arrayToObject = Object.fromEntries(hituyounonai)
  arrayToObject.value = `${uuidv4()}//${arrayToObject.id}`;
  console.log(arrayToObject);
  return arrayToObject;
};
