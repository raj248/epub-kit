// Reexport the native module. On web, it will be resolved to EpubKitModule.web.ts
// and on native platforms to EpubKitModule.ts
export { default } from './EpubKitModule';
export { default as EpubKitView } from './EpubKitView';
export * from  './EpubKit.types';
