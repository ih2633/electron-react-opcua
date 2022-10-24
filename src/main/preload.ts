import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

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
    getData(channel: 'sessionStart', data: any) {
      console.log({ data });
      return ipcRenderer.invoke(channel, data);
    },
    disconnect(channel: 'disconnect', data: any) {
      return ipcRenderer.invoke(channel, data);
    },
    changeValue(channel: 'changeValue', func: (...args: unknown[]) => any) {
      const subsc = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subsc);

      return () => {
        ipcRenderer.removeListener(channel, subsc);
      };
    },
    nodeCrawler(channel: 'nodeCrawler', data: any) {
      return ipcRenderer.invoke(channel, data);
    },
  },
});
