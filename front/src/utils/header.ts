import axiosInstance from '../api/axios';

function setHearder(key: string, value: string) {
  axiosInstance.defaults.headers.common[key] = value;
}

function removeHearder(key: string) {
  if (!axiosInstance.defaults.headers.common[key]) {
    return;
  }
  delete axiosInstance.defaults.headers.common[key];
}

export {setHearder, removeHearder};
