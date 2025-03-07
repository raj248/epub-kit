import { requireNativeView } from 'expo';
import * as React from 'react';

import { EpubKitViewProps } from './EpubKit.types';

const NativeView: React.ComponentType<EpubKitViewProps> =
  requireNativeView('EpubKit');

export default function EpubKitView(props: EpubKitViewProps) {
  return <NativeView {...props} />;
}
