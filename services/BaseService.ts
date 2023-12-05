import axios, { AxiosError, AxiosInstance } from "axios"
import { ApiResponse } from "./types"

class BaseService {
    private controllerName: string
    protected client: AxiosInstance
    protected handleError: <T = undefined>(error: any) => ApiResponse<T>
  
    constructor(controllerName: string) {
      this.controllerName = controllerName
      this.client = this.createAxiosInstance()
      this.handleError = this.handleAxiosError
    }
  
    private createAxiosInstance(): AxiosInstance {
      return axios.create({
        baseURL: `${process.env.NEXT_PUBLIC_API_URL}${this.controllerName}`,
        headers: {
          'Content-Type': 'application/json'
        }
      })
    }
  
    private handleAxiosError = <T = undefined>(error: any): ApiResponse<T> => {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError
        const data = axiosError.response?.data as ApiResponse<T>
  
        return {
          success: false,
          message: data?.message ?? "",
          content: undefined,
          errors: data.errors,
          statusCode: axiosError.status || 500
        }
      } else {
        console.error(error)
  
        return {
          success: false,
          content: undefined,
          message: 'An unexpected error has ocurred',
          errors: [
            {
              code: 'Unexpected error',
              message: 'An unexpected error has ocurred'
            }
          ],
          statusCode: 500
        }
      }
    }
  }

  export default BaseService