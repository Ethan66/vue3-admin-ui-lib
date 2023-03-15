import axios from 'axios'
import type { AxiosResponse, InternalAxiosRequestConfig, AxiosRequestConfig } from 'axios'
import { ElMessage } from 'element-plus'

// 创建 axios 实例
const service = axios.create({
  timeout: 50000,
  headers: {}
})

// 请求拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config
  },
  (error: any) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const { code, msg } = response.data
    if (code === '000000' || response.config.third) {
      return response.data
    } else {
      ElMessage({
        message: msg || '系统出错',
        type: 'error'
      })
      return Promise.reject(new Error(msg || 'Error'))
    }
  },
  (error: any) => {
    if (error?.response?.data) {
      const { msg } = error.response.data
      ElMessage({
        message: msg || '系统出错',
        type: 'error'
      })
      return Promise.reject(error.message)
    }
    ElMessage({
      message: '系统出错',
      type: 'error'
    })
    return Promise.reject(error.message)
  }
)

const request = <T, K, F>(
  config: AxiosRequestConfig<T>
): Promise<F extends { third: boolean } ? K : { code: number; msg: string; data: K }> => {
  return service.request(config)
}
export default {
  get: <K = any, F = string, T = {}>(config: AxiosRequestConfig<T>) => {
    return request<T, K, F>({ ...config, method: 'get' })
  },
  post: <K = any, F = string, T = {}>(config: AxiosRequestConfig<T>) => {
    return request<T, K, F>({ ...config, method: 'post' })
  }
}
