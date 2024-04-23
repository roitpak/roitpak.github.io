import axios from 'axios';
import {Platform} from 'react-native';
import {getUniqueId} from 'react-native-device-info';
import {v4 as uuidv4} from 'uuid';

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
  axios.get('http://www.geoplugin.net/json.gp');

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
  // Regular expression to match URLs with "/<value>" format
  const regex = /\/([a-zA-Z0-9]+)$/;

  // Executing the regular expression on the URL
  const match = regex.exec(url);

  // Check if the URL matches the pattern
  if (match) {
    // Extracting the captured ID
    return match[1];
  }

  // Return null if the URL doesn't match the pattern
  return null;
}
