import {
  OPCUAClient,
  MessageSecurityMode,
  SecurityPolicy,
  AttributeIds,
  makeBrowsePath,
  ClientSubscription,
  ClientMonitoredItem,
} from 'node-opcua';

import { mainWin } from '../main';

// const endpointUrl = "opc.tcp://opcuademo.sterfive.com:26543";

// const username = "ihorie"
// const password = "raspberry"
const connectionStrategy = {
  initialDelay: 1000,
  maxRetry: 1,
};

const client = OPCUAClient.create({
  applicationName: 'MyClient',
  connectionStrategy,
  securityMode: MessageSecurityMode.None,
  securityPolicy: SecurityPolicy.None,
  endpointMustExist: false,
});

export const session = async (data) => {
  const conState = data.status;
  const { ipaddress } = data;
  const { username } = data;
  const { password } = data;

  const endpointUrl = `opc.tcp://${ipaddress}:4840`;

  console.log(client._internalState);
  if (!conState) {
    // step 1 : connect to
    await client.connect(endpointUrl);
    console.log('connected !');
    // step 2 : createSession
    const session = await client.createSession({
      userName: username,
      password,
    });
    console.log('session created !');

    // step 3 : browse
    const browseResult = await session.browse('RootFolder');

    console.log('references of RootFolder :');
    for (const reference of browseResult.references) {
      console.log('   -> ', reference.browseName.toString());
    }

    // step 4 : read a variable with readVariableValue
    const maxAge = 0;
    const nodeToRead = {
      nodeId:
        'ns=4;s=|var|CODESYS Control for Raspberry Pi MC SL.Application.PLC_PRG.X000',
      attributeId: AttributeIds.Value,
    };
    const dataValue = await session.read(nodeToRead, maxAge);
    console.log(' value ', dataValue.toString());

    // step 4' : read a variable with read
    const dataValue2 = await session.read({
      nodeId:
        'ns=4;s=|var|CODESYS Control for Raspberry Pi MC SL.Application.PLC_PRG.X001',
      attributeId: AttributeIds.Value,
    });
    console.log(' value = ', dataValue2.toString());

    // step 5: install a subscription and install a monitored item for 10 seconds
    const subscription = ClientSubscription.create(session, {
      requestedPublishingInterval: 1000,
      requestedLifetimeCount: 100,
      requestedMaxKeepAliveCount: 10,
      maxNotificationsPerPublish: 100,
      publishingEnabled: true,
      priority: 10,
    });

    subscription
      .on('started', function () {
        console.log(
          'subscription started for 2 seconds - subscriptionId=',
          subscription.subscriptionId
        );
      })
      .on('keepalive', function () {
        console.log('keepalive');
      })
      .on('terminated', function () {
        console.log('terminated');
      });

    // install monitored item

    const itemToMonitor = {
      nodeId:
        'ns=4;s=|var|CODESYS Control for Raspberry Pi MC SL.Application.PLC_PRG.D000',
      attributeId: AttributeIds.Value,
    };
    const parameters = {
      samplingInterval: 100,
      discardOldest: true,
      queueSize: 10,
    };

    const monitoredItem = ClientMonitoredItem.create(
      subscription,
      itemToMonitor,
      parameters
      // TimestampsToReturn.Both
    );

    monitoredItem.on('changed', (dataValue) => {
      // console.log(' value has changed : ', dataValue.value.toString());
      // console.log("------------------------------------------")
      // console.log(itemToMonitor)
      // console.log("------------------------------------------")
      // console.log(parameters)
      // console.log("------------------------------------------")
      // console.log(dataValue.value)
      // console.log("------------------------------------------")
      // console.log(dataValue.value.value)
      // console.log("------------------------------------------")

      mainWin().webContents.send('changeValue', dataValue.value.toString());
    });

    // await timeout(10000);

    // console.log("now terminating subscription");
    // await subscription.terminate();

    // step 6: finding the nodeId of a node by Browse name
    const browsePath = makeBrowsePath(
      'RootFolder',
      '/Objects/Server.ServerStatus.BuildInfo.ProductName'
    );

    const result = await session.translateBrowsePath(browsePath);
    const productNameNodeId = result.targets[0].targetId;
    console.log(' Product Name nodeId = ', productNameNodeId.toString());

    const clientStatus = (await client._internalState) === 'connected';
    // const sessionData = await JSON.stringify(decycle(client))
    // console.log(sessionData)
    // console.log(typeof sessionData)

    return {
      status: clientStatus,
      ipaddress,
      username,
      password,
    };
  }
  // disconnecting
  await client.disconnect();
  console.log('done !');
  const clientStatus = (await client.__internalState) === 'connected';
  return {
    status: clientStatus,
    ipaddress,
    username,
    password,
  };

  /*
    const sessionData = data.sessionData
    console.log(sessionData)
    const obj = await JSON.parse(sessionData)
    const sessionD = await encycle(obj)
    console.log(sessionD)


      console.log("disconnectの分岐")
    // close session
    await sessionD.close();

    // disconnecting
    await client.disconnect();
      console.log("done !");
    return await client.__internalState
    */
};
