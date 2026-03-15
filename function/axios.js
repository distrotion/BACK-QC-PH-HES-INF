const axios = require('axios')
const https = require('https')
const http = require('http')

const instance = axios.create({
  timeout: 30000,
  httpsAgent: new https.Agent({ keepAlive: true }),
  httpAgent: new http.Agent({ keepAlive: true }),
})

exports.post = async (url, body) => {
  try {
    const res = await instance.post(url, body)
    return res.data
  } catch (error) {
    console.error(error.response?.status)
    return error.response?.status
  }
}

exports.get = async (url) => {
  try {
    const res = await instance.get(url)
    return res.data
  } catch (error) {
    console.error(error.response?.status)
    return error.response?.status
  }
}
