import axios, {AxiosRequestConfig, AxiosResponse, AxiosError, AxiosInstance} from 'axios'
import {BASE_API_PATH} from "./variable";
import {ElMessage} from 'element-plus'

const service: AxiosInstance = axios.create({
    baseURL: BASE_API_PATH,
    timeout: 10 * 1000, // 请求超时时间
    headers: {"Content-Type": "application/json;charset=UTF-8"}
});

// 请求
service.interceptors.request.use((config: AxiosRequestConfig) => {
    // 这里可以设置token: config!.headers!.Authorization = token
    return config;
});

// 响应
service.interceptors.response.use((response: AxiosResponse) => {
        const data = response.data;
        if (data.code === 200) {
            return data;
        } else {
            return Promise.reject(data);
        }
    },
    (err) => {
        return Promise.reject(err.response);
    }
);

// ...前面的省略
const request = {
    get<T = any>(url: string, data?: any): Promise<T> {
        return request.request("GET", url, {params: data});
    },
    post<T = any>(url: string, data?: any): Promise<T> {
        return request.request("POST", url, {data});
    },
    put<T = any>(url: string, data?: any): Promise<T> {
        return request.request("PUT", url, {data});
    },
    delete<T = any>(url: string, data?: any): Promise<T> {
        return request.request("DELETE", url, {params: data});
    },
    request<T = any>(method = "GET", url: string, data?: any): Promise<T> {
        return new Promise((resolve, reject) => {
            service({method, url, ...data})
                .then((res) => {
                    resolve(res as unknown as Promise<T>);
                })
                .catch((e: Error | AxiosError) => {
                    reject(e);
                })
        });
    }
};

export default request;


