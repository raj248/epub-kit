// import { EpubKit } from 'epub-kit';
import EpubKit from './EpubKitModule';

export function getTheme(): string {
  return EpubKit.getTheme();
}

export async function scanEpubFiles(){
  const files = []
  return await EpubKit.scanEpubFiles();
}

export async function extractMetadata(filePath:string) {
  return await EpubKit.extractMetadata(filePath)
  .catch((e) => {
    console.error("file path is: ", filePath);
    console.error("the error is: ", e.message);
  });
}


export async function requestStoragePermission() {
  return await EpubKit.requestStoragePermission();
}
