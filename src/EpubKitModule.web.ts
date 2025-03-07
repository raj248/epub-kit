import { registerWebModule, NativeModule } from 'expo';

import { EpubKitModuleEvents } from './EpubKit.types';

class EpubKitModule extends NativeModule<EpubKitModuleEvents> {
  PI = Math.PI;
  async setValueAsync(value: string): Promise<void> {
    this.emit('onChange', { value });
  }
  hello() {
    return 'Hello world! 👋';
  }
}

export default registerWebModule(EpubKitModule);
