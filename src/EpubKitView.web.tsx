import * as React from 'react';

import { EpubKitViewProps } from './EpubKit.types';

export default function EpubKitView(props: EpubKitViewProps) {
  return (
    <div>
      <iframe
        style={{ flex: 1 }}
        src={props.url}
        onLoad={() => props.onLoad({ nativeEvent: { url: props.url } })}
      />
    </div>
  );
}
