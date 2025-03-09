import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as EpubKit from 'epub-kit';
import { useState } from 'react';
import { Button, Text, View } from 'react-native';
import { ScrollView } from 'react-native';
import RNFS from "react-native-fs";
export default function App() {
  const [epubFiles, setEpubFiles] = useState<string[]>([]);
  const [files, setFiles] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const EPUB_FILE_PATH = '/storage/emulated/0/Documents/LN/A_Late_Start_Tamer.epub';

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
    console.log("scanning completed")
    // console.log('EPUB files found:', files);
  };

  const listFilesRecursively = async (dirPath: string): Promise<string[]> => {
    let result: string[] = [];

    try {
      const items = await RNFS.readDir(dirPath);
      for (const item of items) {
        if (item.isDirectory()) {
          // Skip Android folder
          if (item.name.toLowerCase() === "android") continue;
          result = result.concat(await listFilesRecursively(item.path));
        } else if (item.name.endsWith(".epub")) {
          result.push(item.path);
        }
      }
    } catch (error) {
      console.log("Error reading directory:", error);
      console.log("dirPath:", dirPath)
    }

    return result;
  };

  const listFile = async () => {
    setLoading(true);

    const rootPath = RNFS.ExternalStorageDirectoryPath; // Root of Internal Storage
    const allFiles = await listFilesRecursively(rootPath);
    setFiles(allFiles);
    const parsedEpubs = await Promise.all(
      allFiles.map(async (file) => {
        try {
          console.log(file)
          const epubData = await EpubKit.extractMetadata(file);
          console.log("epubData:")
          console.log(epubData)
          if (epubData) {
            return { path: file, ...epubData };
          }
          return null;
        } catch (error) {
          console.error("Error parsing EPUB:", error);
          return null;
        }
      })
    );
    console.log("scanning completed")
    setLoading(false);
  }


  return (
    <GestureHandlerRootView>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button title="(Native) Request Manage Storage Permission" onPress={requestPermission} />
        <Button title="(Native) Scan Epub Files=> setEpub(result)" onPress={scanEpubFiles} />
        <Button title="List Recursively RNFS" onPress={listFile} />
        <Text>EPUB Files Found: {files.length}</Text>
        <Text>Loading: {loading ? "true" : "false"}</Text>
        <ScrollView>
          {loading ? (
            <Text>Scanning...</Text>
          ) : files.length > 0 ? (
            files.map((file, index) => <Text key={index}>{file}</Text>)
          ) : (
            <Text>No files found</Text>
          )}
        </ScrollView>
      </View>
    </GestureHandlerRootView>
  );
}
