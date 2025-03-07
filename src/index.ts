// import { EpubKit } from 'epub-kit';
import EpubKit from './EpubKitModule';

export function getTheme(): string {
  return EpubKit.getTheme();
}

export async function scanEpubFiles(){
  const files = []
  return await EpubKit.scanEpubFiles();
}

export async function requestStoragePermission() {
  return await EpubKit.requestStoragePermission();
}
