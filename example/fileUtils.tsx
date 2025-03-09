import * as FileSystem from 'expo-file-system';

const FILE_NAME = 'data.txt';
// const FILE_PATH = `${FileSystem.documentDirectory}${FILE_NAME}`;
const FILE_PATH = 'file:///storage/emulated/0/Documents/LN/data.txt';
const EPUB_FILE_PATH = 'file:///storage/emulated/0/Documents/LN/A_Late_Start_Tamer.epub';


// Function to write text to file (Create & Update)
export const writeToFile = async (text: string): Promise<void> => {
  try {
    await RNFS.writeFile(FILE_PATH, text, 'utf8');
    console.log('File written successfully');
  } catch (error) {
    console.error('Error writing file:', error);
  }
};

// Function to read text from file
export const readFromFile = async (): Promise<string | null> => {
  try {
    const fileExists = await RNFS.exists(FILE_PATH);
    if (!fileExists) {
      console.log('File does not exist.');
      return null;
    }

    const content = await RNFS.readFile(FILE_PATH, 'utf8');
    return content;
  } catch (error) {
    console.error('Error reading file:', error);
    return null;
  }
};

// Function to append text to the file
export const appendToFile = async (text: string): Promise<void> => {
  try {
    const fileExists = await RNFS.exists(FILE_PATH);
    if (fileExists) {
      await RNFS.appendFile(FILE_PATH, `\n${text}`, 'utf8');
    } else {
      await writeToFile(text);
    }
    console.log('Text appended successfully');
  } catch (error) {
    console.error('Error appending to file:', error);
  }
};

// Function to delete the file
export const deleteFile = async (): Promise<void> => {
  try {
    const fileExists = await RNFS.exists(FILE_PATH);
    if (!fileExists) {
      console.log('File does not exist.');
      return;
    }

    await RNFS.unlink(FILE_PATH);
    console.log('File deleted successfully');
  } catch (error) {
    console.error('Error deleting file:', error);
  }
};

import RNFS from 'react-native-fs';
import JSZip from 'jszip';

export const extractEpub = async () => {
  try {
    // Read EPUB as binary
    console.log('read as binary: start');
    const epubData = await RNFS.readFile(EPUB_FILE_PATH, 'base64');
    console.log('read as binary: complete');

    // Convert base64 to binary buffer
    const binaryString = atob(epubData);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    console.log('converted to Binary buffer: complete');

    // Extract ZIP contents using JSZip
    const zip = await JSZip.loadAsync(bytes.buffer);
    console.log("unziped the file")
    // Iterate through EPUB files
    zip.forEach(async (relativePath, file) => {
      if (!file.dir) {
        const content = await file.async('text');
        console.log(`File: ${relativePath}`);
        console.log(content);
      }
    });
  } catch (error) {
    console.error('EPUB extraction error:', error);
  }
};
