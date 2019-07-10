import axios from 'axios'

const apiUrl = 'https://ele-interface.herokuapp.com/api'
// const apiUrl = 'http://v.juhe.cn/sms'


// axios.interceptors.request.use(function (config) {
//   config.headers[`token`] = window.localStorage.token || ''
//   return config
// }, function (error) {
//   return Promise.reject(error)
// })

// 请求拦截
axios.interceptors.request.use(
  config => {
    if (config.method == 'post') {
      // config.data = qs.stringify(config.data);
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 响应拦截
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return Promise.reject(error);
  }
);


const serverApi = (url, data, succFoo, errorFoo) => {
  let obj = {}
  axios({
    method: 'post',
    url: apiUrl + url,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: Object.assign({}, data, obj),
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }]
  }).then(response => {
    succFoo(response)
  })
    .catch(error => {
      errorFoo(error)
    })
}

const getApi = (url, succFoo, errorFoo) => {
  axios({
    method: 'get',
    url: apiUrl + url
  }).then(response => {
    succFoo(response)
  })
    .catch(error => {
      errorFoo(error)
    })
}

export { getApi, serverApi }

