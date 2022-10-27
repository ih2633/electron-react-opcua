import {
  OPCUAClient,
  MessageSecurityMode,
  SecurityPolicy,
  AttributeIds,
  makeBrowsePath,
  ClientSubscription,
  ClientMonitoredItem,
  TimestampsToReturn,
  ClientSession,
  UserIdentityInfoUserName,
  UserTokenType,
} from 'node-opcua';

import { subscribe } from './subscribe';
import {SessionData} from '@/@types/SessionData';

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

export const multipleSession = async (sessionData: SessionData) => {
  const isConnectStatus = sessionData.status;
  if (isConnectStatus) {
    await client.disconnect();
    console.log('disconnect');
    /**
     * @returns 通信状態の有無
     */
    return false;
  } else {
    const session = await connectAndSession(sessionData);
    console.log('session created !');

    const subscription = ClientSubscription.create(session, {
      requestedPublishingInterval: 1000,
      requestedLifetimeCount: 100,
      requestedMaxKeepAliveCount: 10,
      maxNotificationsPerPublish: 100,
      publishingEnabled: true,
      priority: 10,
    });

    await subscribe(subscription, sessionData.monitorItems);

    console.log('start subscribe');

    /**
     * @param sessionData - セッションに必要なデータ
     * @returns 通信状態の有無
     */

    return true;
  }
};

const connectAndSession = async (sessionData: SessionData) => {
  const { userName, password } = sessionData;
  const endPointUrl = `opc.tcp://${sessionData.ipAddress}:4840`;
  await client.connect(endPointUrl);
  
  // step 2 : createSession

  return await client.createSession(<UserIdentityInfoUserName>{
    type: UserTokenType.UserName,
    userName: userName,
    password: password,
  });
};
