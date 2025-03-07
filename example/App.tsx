import * as EpubKit from 'epub-kit';
import { useState } from 'react';
import { Button, Text, View } from 'react-native';

export default function App() {
  const [epubFiles, setEpubFiles] = useState<string[]>([]);

  const requestPermission = async () => {
    const granted = await EpubKit.requestStoragePermission();
    if (granted) {
      console.log('Storage permission granted');
      scanEpubFiles();
    } else {
      console.log('Storage permission denied');
    }
  };

  const scanEpubFiles = async () => {
    const files = await EpubKit.scanEpubFiles();
    setEpubFiles(files);
    console.log('EPUB files found:', files);
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Theme: {EpubKit.getTheme()}</Text>
      <Button title="Request Storage Permission" onPress={requestPermission} />
      <Button title="Scan Epub Files" onPress={scanEpubFiles} />
      {epubFiles.map((file, index) => (
        <Text key={index}>{file}</Text>
      ))}
    </View>
  );
}
