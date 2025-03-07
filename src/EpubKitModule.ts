import { NativeModule, requireNativeModule } from 'expo';

import { EpubKitModuleEvents } from './EpubKit.types';

declare class EpubKitModule extends NativeModule<EpubKitModuleEvents> {
  PI: number;
  hello(): string;
  setValueAsync(value: string): Promise<void>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<EpubKitModule>('EpubKit');
