import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import {MonitorItem} from '@/@types/MonitorItem';
import {SessionData} from '@/@types/SessionData';

export type Channels = 'ipc-example';

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    sendMessage(channel: Channels, args: unknown[]) {
      ipcRenderer.send(channel, args);
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
    getData(channel: 'sessionStart', connectStatus: boolean) {
      console.log({ connectStatus });
      return ipcRenderer.invoke(channel, connectStatus);
    },
    disconnect(channel: 'disconnect', connectStatus: boolean) {
      return ipcRenderer.invoke(channel, connectStatus);
    },
    changeValue(channel: 'changeValue', func: (args: MonitorItem[]) => void) {
      const subsc = (_event: IpcRendererEvent, args: MonitorItem[]) =>
        func(args);
      ipcRenderer.on(channel, subsc);

      return () => {
        ipcRenderer.removeListener(channel, subsc);
      };
    },
    nodeCrawler(channel: 'nodeCrawler', data: SessionData) {
      return ipcRenderer.invoke(channel, data);
    },
  },
});
