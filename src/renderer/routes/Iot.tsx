import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import CheckboxTree from 'react-checkbox-tree';
import '../styles/react-checkbox-tree.css';
import { SessionData } from '@/@types/sessionData';
import { MonitorItem } from '@/@types/monitorItem';

import TableLayout from '../components/table/layout';

const initData: SessionData = {
  ipAddress: '',
  userName: '',
  password: '',
  monitorItems: [],
  status: false,
};

const Iot = () => {
  const [sessionData, setSessionData] = useState<SessionData>(initData);
  const [nodes, setNodes] = useState<string[] | null>([]);
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [monitor, setMonitor] = useState<MonitorItem[]>([]);
  const [isConnectStatus, setIsConnectStatus] = useState<boolean>(false);

  window.electron.ipcRenderer.changeValue(
    'changeValue',
    (monitorItems: MonitorItem[]) => {
      setMonitor(monitorItems);
    }
  );

  const { register, handleSubmit } = useForm();
  const onSubmit = async (crawleSessionData: SessionData) => {
    const json = await window.electron.ipcRenderer.nodeCrawler(
      'nodeCrawler',
      crawleSessionData
    );
    const opcUaNodeIdTree: string[] = [];
    opcUaNodeIdTree.push(json);
    await setNodes(opcUaNodeIdTree);
    await setSessionData(crawleSessionData);
  };

  // OpcUaServerとの通信開始

  const connect = async () => {
    sessionData.monitorItems = createMonitorItemArray(checked);
    sessionData.status = isConnectStatus;

    const connectStatus = await window.electron.ipcRenderer.getData(
      'sessionStart',
      sessionData
    );
    setIsConnectStatus(connectStatus);
  };

  const checkNode = async () => {
    console.log({ nodes });
    console.log({ checked });
    console.log({ expanded });
    console.log({ sessionData });
    createMonitorItemArray(checked);
    console.log({ isConnectStatus });
  };

  // OpcUaServerとの通信終了

  const disconnect = async () => {
    const disConnectStatus: boolean =
      await window.electron.ipcRenderer.disconnect('disconnect', {
        status: isConnectStatus,
      });
    setIsConnectStatus(disConnectStatus);
  };

  const createMonitorItemArray = (preSubstringMonitorItems: string[]) => {
    const postSubstringMonitorItems: string[] = preSubstringMonitorItems.map(
      (x) => {
        const tmp = x.substring(x.indexOf('//') + 2);
        return tmp;
      }
    );
    return postSubstringMonitorItems;
  };

  return (
    <>
      <div className="grid grid-cols-6 h-screen mx-8">
        <div className="col-span-2 flex flex-col justify-center">
          <div className="mt-1">
            <form
              className="text-gray-700 text-center form-control mx-8"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <label
                  className="label label-text text-white"
                  htmlFor="ipAddress"
                >
                  IP Address
                </label>
                <input
                  defaultValue="192.168.10.10"
                  className="input input-bordered w-full max-w-xs"
                  type="text"
                  id="ipAddress"
                  {...register('ipAddress')}
                />
              </div>
              <div>
                <label
                  className="label label-text text-white"
                  htmlFor="username"
                >
                  UserName
                </label>
                <input
                  defaultValue="ihorie"
                  className="input input-bordered w-full max-w-xs"
                  type="text"
                  id="userName"
                  {...register('userName')}
                />
              </div>
              <div>
                <label
                  className="label label-text text-white"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  defaultValue="raspberry"
                  className="input input-bordered w-full max-w-xs"
                  type="password"
                  id="password"
                  {...register('password')}
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="btn glass mt-5 w-full max-w-xs"
                >
                  nodeIDを取得
                </button>
              </div>
              <div>
                {isConnectStatus ? (
                  <button
                    className="btn glass  mt-5 w-full max-w-xs"
                    onClick={disconnect}
                  >
                    disconnect
                  </button>
                ) : (
                  <button
                    className="btn glass mt-5 w-full max-w-xs"
                    onClick={connect}
                  >
                    connect
                  </button>
                )}
              </div>
            </form>
          </div>
          <div className="text-white truncate ml-16 mt-6">
            <CheckboxTree
              nodes={nodes}
              checked={checked}
              expanded={expanded}
              onCheck={(s) => {
                setChecked(s);
              }}
              onExpand={(s) => {
                setExpanded(s);
              }}
            />
          </div>

          <div className="mt-5"></div>
        </div>
        <div className="col-span-4 flex ">
          <div className="mt-8 ">
            {isConnectStatus ? (
              <TableLayout monitorItems={monitor} />
            ) : (
              <div className="text-white">disconnected...</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Iot;
