export type ApiResponse<T = undefined> =
  | {
      success: true
      message: string
      statusCode: number
      errors: ApiError[]
      content: T
    }
  | {
      success: false
      message: string
      errors: ApiError[]
      content: undefined
      statusCode: number
    }

export type ApiError = {
  code: string
  message: string
}