import { mainWin } from "../main"
import {
  OPCUAClient,
  MessageSecurityMode,
  SecurityPolicy,
  AttributeIds,
  makeBrowsePath,
  ClientSubscription,
  ClientMonitoredItem,
  TimestampsToReturn,
} from 'node-opcua';

import { MonitorItem } from "@/@types/monitorItem"

export const subscribe = async (
  subscription: ClientSubscription,
  monitorItems: string[]
) => {
  const itemsToMonitor = monitorItems.map((item) => {
    return { nodeId: item, attributeId: AttributeIds.Value };
  });

  const group = await subscription.monitorItems(
    itemsToMonitor,
    {
      samplingInterval: 100,
      discardOldest: true,
      queueSize: 10,
    },
    TimestampsToReturn.Both
  );

  const changeValues = new Array<MonitorItem>();
  group.on('changed', (monitoredItem, dataValue, index) => {
    changeValues[index] = {
      value: dataValue.value.value,
      id: monitoredItem.itemToMonitor.nodeId.value,
    };

    console.log(changeValues);
    const isEmpty = changeValues[0] == null;
    if (isEmpty) {
      console.log('dame');
    } else {
      console.log('zennbuhaitta');
      mainWin()?.webContents.send('changeValue', changeValues);
    }
  });
};