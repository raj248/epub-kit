import { NativeModule, requireNativeModule } from 'expo';


declare class EpubKitModule extends NativeModule {
  getTheme(): string;
  requestStoragePermission();
  scanEpubFiles();
  extractMetadata(filePath:string): Promise<any>

}

// This call loads the native module object from the JSI.
export default requireNativeModule<EpubKitModule>('EpubKit');
