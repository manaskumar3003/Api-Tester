import axios from 'axios';

const testGetApi = async (url, headers = {}) => {
  const config = {
    method: 'get',
    url,
    headers,
    validateStatus: () => true,
  };
  const start = Date.now();
  const response = await axios(config);
  const time = Date.now() - start;

  return {
    status: response.status,
    headers: response.headers,
    data: response.data,
    time, // Add time
  };
};

const testCustomApi = async (method, url, headers = {}, body = {}) => {
  const config = {
    method: method.toLowerCase(),
    url,
    headers,
    data: body,
    validateStatus: () => true,
  };
  const start = Date.now();
  const response = await axios(config);
  const time = Date.now() - start;

  return {
    status: response.status,
    headers: response.headers,
    data: response.data,
    time, // Add time
  };
};

const testPostApi = async (url, headers = {}, body = {}) => {
  const config = {
    method: 'post',
    url,
    headers,
    data: body,
    validateStatus: () => true,
  };
  const start = Date.now();
  const response = await axios(config);
  const time = Date.now() - start;

  return {
    status: response.status,
    headers: response.headers,
    data: response.data,
    time, // Add time
  };
};

export { testGetApi, testCustomApi, testPostApi };
