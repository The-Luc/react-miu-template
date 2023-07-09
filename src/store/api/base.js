/* eslint-disable no-underscore-dangle */
import Axios from 'axios';

const baseURL = 'http://10.84.0.185:90/api';

const axiosClient = Axios.create({
  baseURL,
  headers: {
    Accept: 'application/json',
  },
  timeout: 30000,
});

// Add a request interceptor
axiosClient.interceptors.request.use(
  config => {
    // Do something before request is sent
    return config;
  },
  error => Promise.reject(error),
);

// this.client.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   // eslint-disable-next-line consistent-return
//   async (error) => {
//       // Return the original error if we can't handle it
//       return Promise.reject(e);
//     }
//   }
// );

export default axiosClient;
