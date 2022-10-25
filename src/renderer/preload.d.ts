import { Channels } from 'main/preload';
import MonitorItem from '@/@types/MonitorItem';
import SessionData from '@/@types/SessionData'

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
        getData(channel: 'sessionStart', data: SessionData): any;
        disconnect(channel: 'disconnect', data: object): any;
        changeValue(
          channnel: 'changeValue',
          func: (arg: MonitorItem[]) => void
        ): void;
        nodeCrawler(channel: 'nodeCrawler', data: SessionData): any;
      };
    };
  }
}
