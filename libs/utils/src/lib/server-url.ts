import { join } from 'path';

import { addUrlPath } from './path';

export class ServerURL {
  static get host() {
    return process.env['SERVER_HOST']!;
  }

  static get basepath() {
    return process.env['SERVER_BASE_PATH']!;
  }

  static get get() {
    return addUrlPath(this.host, this.basepath);
  }

  static join(path: string) {
    return addUrlPath(this.host, join(this.basepath, path));
  }

  static get parsed() {
    return new URL(this.get);
  }
}
