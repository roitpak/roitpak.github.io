import axios from 'axios';
import {Platform} from 'react-native';
import Config from 'react-native-config';
import {getUniqueId} from 'react-native-device-info';
import {v4 as uuidv4} from 'uuid';

const myConfig = Platform.OS === 'web' ? process.env : Config;

export function formatDate(date: Date) {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const day = String(date.getDate()).padStart(2, '0');
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${month} ${day}, ${year}`;
}

export function extractVideoId(url: string) {
  var pattern =
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]+)/;
  var match = url.match(pattern);
  if (match) {
    return match[1].toString();
  } else {
    return '';
  }
}

export const getGeoLocation = () =>
  axios.get(
    `https://ipinfo.io/json?token=${myConfig.REACT_APP_GEO_LOGIN_TOKEN}`,
  );

export const getUserUniqueID = async (): Promise<string> => {
  if (Platform.OS === 'web') {
    let uniqueId = localStorage.getItem('deviceId');
    if (uniqueId) {
      return uniqueId;
    } else {
      const newId = uuidv4();
      localStorage.setItem('deviceId', newId);
      return newId;
    }
  } else {
    const id = await getUniqueId();
    return id;
  }
};

export function getValueFromUrl(url: string | null) {
  if (!url) {
    return null;
  }
  if (url.indexOf('verify') !== -1) {
    return 'verify';
  }
  // Regular expression to match URLs with "/<value>" format
  const regex = /\/([a-zA-Z0-9]+)$/;

  const match = regex.exec(url);

  if (match) {
    return match[1];
  }

  return null;
}

export function calculateReadingTime(wordCount: number, wordsPerMinute = 200) {
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return minutes;
}
