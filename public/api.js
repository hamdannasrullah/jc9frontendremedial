import axios from 'axios';

export function gettasks() {
  return axios.get('http://localhost:3003/tasks');
}

export function gettask(id) {
  return axios({
    method: 'get',
    url: 'http://localhost:3003/tasks'+id,
    params: { id },
  })
}
