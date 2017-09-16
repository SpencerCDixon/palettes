import axios from 'axios';
import qs from 'qs';
const apiUrl = 'https://lpjowhvxje.execute-api.us-east-1.amazonaws.com/development/api/palette'

export function getColors(data) {
  return axios.post(apiUrl, qs.stringify(data))
}
