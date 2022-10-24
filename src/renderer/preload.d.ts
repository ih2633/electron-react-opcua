import { Channels } from 'main/preload';

declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        sendMessage(channel: Channels, args: unknown[]): void;
        on(
          channel: Channels,
          func: (...args: unknown[]) => void
        ): (() => void) | undefined;
        once(channel: Channels, func: (...args: unknown[]) => void): void;
        getData(channel: 'sessionStart', data: any): any;
        disconnect(channel: 'disconnect', data: any): any;
        changeValue(
          channnel: 'changeValue',
          func: (...args: unknown[]) => any
        ): any;
        nodeCrawler(channel: 'nodeCrawler', data: any): any;
      };
    };
  }
}
