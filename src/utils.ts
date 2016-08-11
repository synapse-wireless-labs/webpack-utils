import { resolve } from 'path';

export class UrlProxy {
  constructor(
    public target: string,
    public prependPath: boolean = false,
    public changeOrigin: boolean = true,
    public ws: boolean = true
  ) { }
}

export function createPathTo(dirName: string) {
  return function (location: string) {
    return resolve(dirName, location);
  }
}
