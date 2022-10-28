// import {
//   OPCUAClient,
//   NodeCrawler,
//   UserIdentityInfoUserName,
//   UserTokenType,
// } from "node-opcua";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
import * as fs from "fs";

const renameNodeId = (nodeIds) => {
  console.log("renameNodeId");
  console.log(nodeIds);
  const replaceNodeIds = _.mapKeys(nodeIds, (value, key) => {
    const isObject = typeof value === "object";
    switch (key) {
      case "browseName":
        return "label";
      case "nodeId":
        return "id";
      default:
        const isNotDataValue = key !== "dataValue";
        if (isObject && isNotDataValue) {
          return "children";
        }
    }
  });
  const pickTargetNodeIds = _.pick(replaceNodeIds, ["label", "id", "children"]);
  const stringAddNodeIds = _.defaults(pickTargetNodeIds, {
    value: `${uuidv4()}//${pickTargetNodeIds.id}`,
  });

  return stringAddNodeIds;
};

const createOpcUaTree = (nodeOpcUaIds) => {
  console.log("aaaa");
  const parent = this.renameNodeId(nodeOpcUaIds);
  console.log({ parent });
  const children = _.map(parent.children, this.renameNodeId);

  const nodeTree = _.set(parent, "children", children);
  return nodeTree;
};

const crawle = async (sessionData) => {
  try {
    const { ipAddress, userName, password } = sessionData;
    const client = OPCUAClient.create({
      endpointMustExist: true,
    });

    const endpoint = `opc.tcp://${ipAddress}:4840`;
    const nodeId =
      "ns=4;s=|var|CODESYS Control for Raspberry Pi MC SL.Application.PLC_PRG";
    await client.connect(endpoint);

    console.log("connect");
    const session = await client.createSession({
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
  } catch (err) {
    console.log("err = ", err.message);
  } finally {
    console.log("end");
  }
};

const renameInfo = (nodeInfo) => {
  const renamed = Object.entries(nodeInfo).map(([key, value]) => {
    const isValueObject = typeof value === "object";

    if (isValueObject) {
      const isNotDataValue = key !== "dataValue";

      if (isNotDataValue) {
        const mapValue = value.map((x) => {
          const aaa = renameInfo(x)
          return aaa
        })
        return ["children", mapValue];
      }
    }

    switch (key) {
      case "browseName":
        return ["label", value];
      case "nodeId":
        return ["id", value];
    }
  });
  const arrayToObject = Object.fromEntries(renamed.filter((v) => v));

  arrayToObject.value = `${uuidv4()}//${arrayToObject.id}`;
  console.log(arrayToObject);
  return arrayToObject;
};

const main = async () => {
  let renamedNodeInfo = renameInfo(data);

  let jsonData = await JSON.stringify(renamedNodeInfo);

  fs.writeFileSync("postData.json", jsonData)
  console.log("完了")
};
const json = fs.readFileSync("refrefData.json", "utf-8");
const data = JSON.parse(json);

main(data);
