import axios from 'axios'
function ajax (url, data={}, type='GET') {
  return new Promise((resolve, reject) => {
    let promise
    if(type.toUpperCase() === 'POST') {
      //post请求
      promise = axios.post(url, data)
    } else {
      //get请求
      promise = axios.get(url, {params: data})
    }
    promise.then((response) => {
      resolve(response.data)
    }).catch((err) => {
      reject(err)
    })
  })
}

export default ajax