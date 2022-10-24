<ref *1> ClientMonitoredItemImpl {
  _events: [Object: null prototype] { changed: [Function (anonymous)] },
  _eventsCount: 1,
  _maxListeners: undefined,
  statusCode: ConstantStatusCode {
    _value: 0,
    _description: 'The operation succeeded.',
    _name: 'Good'
  },
  subscription: ClientSubscriptionImpl {
    _events: [Object: null prototype] {
      started: [Function (anonymous)],
      keepalive: [Function (anonymous)],
      terminated: [Function (anonymous)]
    },
    _eventsCount: 3,
    _maxListeners: undefined,
    monitoredItemGroups: [ [ClientMonitoredItemGroupImpl] ],
    timeoutHint: 20000,
    _nextClientHandle: 2,
    publishEngine: ClientSidePublishEngine {
      session: [ClientSessionImpl],
      subscriptionAcknowledgements: [Array],
      subscriptionMap: [Object],
      timeoutHint: 20000,
      activeSubscriptionCount: 1,
      nbPendingPublishRequests: 4,
      nbMaxPublishRequestsAcceptedByServer: 1000,
      isSuspended: false
    },
    lastSequenceNumber: 1,
    publishingInterval: 1000,
    lifetimeCount: 100,
    maxKeepAliveCount: 10,
    maxNotificationsPerPublish: 100,
    publishingEnabled: true,
    priority: 10,
    subscriptionId: 2,
    monitoredItems: { '1': [ClientMonitoredItemImpl], '2': [Circular *1] },
    lastRequestSentTime: 1906-06-23T15:00:00.000Z,
    hasTimedOut: false,
    [Symbol(kCapture)]: false
  },
  itemToMonitor: ReadValueId {
    nodeId: NodeId {
      identifierType: 2,
      value: '|var|CODESYS Control for Raspberry Pi MC SL.Application.PLC_PRG.Y000',
      namespace: 4
    },
    attributeId: 13,
    indexRange: NumericRange { type: 0, value: '<invalid>' },
    dataEncoding: QualifiedName { namespaceIndex: 0, name: null }
  },
  monitoringParameters: MonitoringParameters {
    clientHandle: 2,
    samplingInterval: 100,
    filter: null,
    queueSize: 10,
    discardOldest: true
  },
  monitoringMode: 2,
  timestampsToReturn: 2,
  result: MonitoredItemCreateResult {
    statusCode: ConstantStatusCode {
      _value: 0,
      _description: 'The operation succeeded.',
      _name: 'Good'
    },
    monitoredItemId: 2,
    revisedSamplingInterval: 100,
    revisedQueueSize: 10,
    filterResult: null
  },
  monitoredItemId: 2,
  filterResult: undefined,
  [Symbol(kCapture)]: false
}
------------------------------------------
DataValue {
  statusCode: ConstantStatusCode {
    _value: 0,
    _description: 'The operation succeeded.',
    _name: 'Good'
  },
  sourceTimestamp: 2022-09-26T13:11:58.544Z {
    high_low: [ 30986665, -1896635136 ],
    picoseconds: 0
  },
  sourcePicoseconds: 0,
  serverTimestamp: 2022-09-26T13:11:58.544Z {
    high_low: [ 30986665, -1896635136 ],
    picoseconds: 0
  },
  serverPicoseconds: 0,
  value: Variant { dataType: 1, arrayType: 0, value: true, dimensions: null }
}
------------------------------------------
1
------------------------------------------
------------------------------------------
<ref *1> ClientMonitoredItemImpl {
  _events: [Object: null prototype] { changed: [Function (anonymous)] },
  _eventsCount: 1,
  _maxListeners: undefined,
  statusCode: ConstantStatusCode {
    _value: 0,
    _description: 'The operation succeeded.',
    _name: 'Good'
  },
  subscription: ClientSubscriptionImpl {
    _events: [Object: null prototype] {
      started: [Function (anonymous)],
      keepalive: [Function (anonymous)],
      terminated: [Function (anonymous)]
    },
    _eventsCount: 3,
    _maxListeners: undefined,
    monitoredItemGroups: [ [ClientMonitoredItemGroupImpl] ],
    timeoutHint: 20000,
    _nextClientHandle: 2,
    publishEngine: ClientSidePublishEngine {
      session: [ClientSessionImpl],
      subscriptionAcknowledgements: [Array],
      subscriptionMap: [Object],
      timeoutHint: 20000,
      activeSubscriptionCount: 1,
      nbPendingPublishRequests: 4,
      nbMaxPublishRequestsAcceptedByServer: 1000,
      isSuspended: false
    },
    lastSequenceNumber: 1,
    publishingInterval: 1000,
    lifetimeCount: 100,
    maxKeepAliveCount: 10,
    maxNotificationsPerPublish: 100,
    publishingEnabled: true,
    priority: 10,
    subscriptionId: 2,
    monitoredItems: { '1': [Circular *1], '2': [ClientMonitoredItemImpl] },
    lastRequestSentTime: 1906-06-23T15:00:00.000Z,
    hasTimedOut: false,
    [Symbol(kCapture)]: false
  },
  itemToMonitor: ReadValueId {
    nodeId: NodeId {
      identifierType: 2,
      value: '|var|CODESYS Control for Raspberry Pi MC SL.Application.PLC_PRG.X001',
      namespace: 4
    },
    attributeId: 13,
    indexRange: NumericRange { type: 0, value: '<invalid>' },
    dataEncoding: QualifiedName { namespaceIndex: 0, name: null }
  },
  monitoringParameters: MonitoringParameters {
    clientHandle: 1,
    samplingInterval: 100,
    filter: null,
    queueSize: 10,
    discardOldest: true
  },
  monitoringMode: 2,
  timestampsToReturn: 2,
  result: MonitoredItemCreateResult {
    statusCode: ConstantStatusCode {
      _value: 0,
      _description: 'The operation succeeded.',
      _name: 'Good'
    },
    monitoredItemId: 1,
    revisedSamplingInterval: 100,
    revisedQueueSize: 10,
    filterResult: null
  },
  monitoredItemId: 1,
  filterResult: undefined,
  [Symbol(kCapture)]: false
}
------------------------------------------
DataValue {
  statusCode: ConstantStatusCode {
    _value: 0,
    _description: 'The operation succeeded.',
    _name: 'Good'
  },
  sourceTimestamp: 2022-09-26T13:11:58.544Z {
    high_low: [ 30986665, -1896635136 ],
    picoseconds: 0
  },
  sourcePicoseconds: 0,
  serverTimestamp: 2022-09-26T13:11:58.544Z {
    high_low: [ 30986665, -1896635136 ],
    picoseconds: 0
  },
  serverPicoseconds: 0,
  value: Variant { dataType: 1, arrayType: 0, value: false, dimensions: null }
}
------------------------------------------
0
------------------------------------------