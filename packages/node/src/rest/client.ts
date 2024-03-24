import { ApiRequestConfig, requester } from "./request";

export class Client {
  private request = requester();

  async get<T>(url: string, options?: ApiRequestConfig) {
    return this.request.get<T>(url, options);
  }

  async post<T>(url: string, options?: ApiRequestConfig) {
    return this.request.post<T>(url, options);
  }

  async put<T>(url: string, options?: ApiRequestConfig) {
    return this.request.put<T>(url, options);
  }

  async delete<T>(url: string, options?: ApiRequestConfig) {
    return this.request.delete<T>(url, options);
  }
}
