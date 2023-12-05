import BaseService from "../BaseService";
import { ApiResponse } from "../types";
import { Employee } from "./types";

class EmployeeService extends BaseService{
    constructor(){
        super("/employee")
    }

    createAsync = async (request: Employee) => {
        try {
            const response = await this.client.post<ApiResponse>('', request)
        
            return response.data
        } catch (error) {
            return this.handleError(error)
        }
    }

    listAsync =  async () => {
        try {
            const response = await this.client.get<ApiResponse<Employee[]>>('')
        
            return response.data
        } catch (error) {
            return this.handleError<Employee[]>(error)
        }
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new EmployeeService()