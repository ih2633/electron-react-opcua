export type SessionData = {
  ipAddress: string;
  userName: string;
  password: string;
  monitorItems: string[];
  status: boolean;
};


export type NodeInfo = {
  id: string;
  label: string;
  value: string;
  children: NodeInfo;
};
