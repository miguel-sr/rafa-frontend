export interface UserData {
    _id?: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    gender?: string;
    permissions: string[]
    
}

export interface UserLoginRequest {
    email: string;
    password: string;
}
  
export interface UserResponse {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    gender?: string;
    token: string;
    permissions: string[]
  }

export interface UserUpdateRequest {
    _id?: string;
    firstName?: string; 
    email?: string; 
  }