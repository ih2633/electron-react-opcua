import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import CheckboxTree from 'react-checkbox-tree';
import '../styles/react-checkbox-tree.css';

import TableLayout from '../components/table/layout';

type SessionData = {
  ipaddress: string;
  username: string;
  password: string;
  status: boolean;
  monitorItems: string[];
};

const initData = {
  ipaddress: '',
  username: '',
  password: '',
  status: false,
  monitorItems: [],
};

const Iot = () => {
  const [sessionData, setSessionData] = useState<SessionData>(initData);
  const [nodes, setNodes] = useState([]);
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [monitor, setMonitor] = useState<any>([]);

  console.log('Rendering!!!!');

  window.electron.ipcRenderer.changeValue('changeValue', (arg: any) => {
    console.log(arg);
    setMonitor(arg);
    console.log({ monitor });
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data: any) => {
    data.status = false;
    const treeArray = [];
    const jsond = await window.electron.ipcRenderer.nodeCrawler(
      'nodeCrawler',
      data
    );
    await treeArray.push(jsond);
    console.log(treeArray);
    console.log(typeof treeArray);
    console.log(Array.isArray(treeArray));
    await setNodes(treeArray);
    await setSessionData(data);

    // data.status = status;
    // console.log(data);
    // let retData = await window.electron.ipcRenderer.getData(
    //   'sessionStart',
    //   data
    // );
    // await console.log(retData);
    // await setSessionData(retData);
  };

  const subscription = async () => {
    console.log(sessionData);
    const monitorItems = await substValue(checked);
    sessionData.monitorItems = await monitorItems;
    console.log(sessionData);
    const retData = await window.electron.ipcRenderer.getData(
      'sessionStart',
      sessionData
    );
    await console.log(retData);
    await setSessionData(retData);
  };

  const nodeCheck = async () => {
    console.log({ nodes });
    console.log({ checked });
    console.log({ expanded });
    console.log({ sessionData });
    substValue(checked);
  };

  const disconnect = async () => {
    console.log(sessionData);
    const disconData = await window.electron.ipcRenderer.disconnect(
      'disconnect',
      sessionData
    );
    await console.log(disconData);
    await setSessionData(disconData);
    await setMonitor(undefined);
  };

  //  window.electron.ipcRenderer.changeValue('changeValue',(arg)=>{
  //       console.log(arg)
  //     })

  const substValue = (data: Array<any>) => {
    const returnArray = data.map((str) => {
      const tempValue = str.substr(str.indexOf('//') + 2);
      return tempValue;
    });
    console.log(returnArray);
    return returnArray;
  };

  return (
    <>
      <div className="grid grid-cols-6 h-screen">
        <div className="col-span-1 flex flex-col justify-center">
          <div className="mt-1">
            <form
              className="text-gray-700 text-center form-control w-full max-w-xs"
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
                  {...register('ipaddress')}
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
                  id="username"
                  {...register('username')}
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
              <button type="submit" className="btn glass mt-5">
                crawler
              </button>
            </form>
          </div>
          <div className="text-white mt-6">
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
          <div className="mt-6 flex">
            <button className="btn glass" onClick={subscription}>
              subscription
            </button>
            <button className="btn glass ml-4" onClick={nodeCheck}>
              nodecheck
            </button>
          </div>
          <div className="mt-5">
            <button className="btn glass" onClick={disconnect}>
              disconnect
            </button>
          </div>
        </div>
        <div className="col-span-5 flex justify-center ">
          {/*// test */}

          <div className="mt-8 ">
            <TableLayout monitorItems={monitor} />
          </div>
          {/* <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Value</th>
                </tr>
              </thead>

              {monitor ? (
                <tbody className="bg-red-200 ">
                  {monitor.map((item, idx) => {
                    return (
                        <tr className="bg-red-200 ">
                          <th key={idx}>{idx}</th>
                          <td>{item.id}</td>
                          <td>{item.value.toString()}</td>
                        </tr>
                    );
                  })}
                </tbody>
              ) : (
                'Loading...'
              )}
              
            </table>
          </div> */}
          {/* test// */}
        </div>
      </div>
    </>
  );
};

export default Iot;
