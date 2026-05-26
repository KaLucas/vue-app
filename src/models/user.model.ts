export interface User {
  id: string
  data: {
    email: string
    last_name: string
    first_name: string
  }
  created_at: string
  updated_at: string
}

export interface GetUsersResponse {
  data: User[]
  meta: {
    page: number
    limit: number
    total: number
    pages: number
  }
}

export interface GetUsersParams {
  page?: number
}

export interface DatagridUsersList {
  id: string
  email: string
  first_name: string
  last_name: string
  created_at: string
  updated_at: string
}

export interface UserFormData {
  first_name: string
  last_name: string
  email: string
}
