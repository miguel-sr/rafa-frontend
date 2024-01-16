import axios from "axios";
import { UserData, UserLoginRequest, UserUpdateRequest } from "./interface";

const API_URL = "/api/users/";



const register = async (userData: UserData) => {
  const response = await axios.post(API_URL, userData);

  if (response.data) {
    if( typeof localStorage !== "undefined"){
      localStorage.setItem("user", JSON.stringify(response.data));
    }
  }
  
  return response.data;
};

const login = async (userData: UserLoginRequest) => {
  const response = await axios.post(API_URL + "login", userData);
  
  if (response.data) {
    if( typeof localStorage !== "undefined"){
      localStorage.setItem("user", JSON.stringify(response.data));
    }
  }
  return response.data;
};

const updateUser = async (updatedUserData: UserUpdateRequest): Promise<any> => {
  try {
    const {_id, ...rest} = updatedUserData
    const response = await axios.put(API_URL + 'edit', rest, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('user') || '{}').token}`, 
      },
      params:{
        userId: _id
      }
    });
    localStorage.setItem('user', JSON.stringify(response.data));
    return response.data; 
  } catch (error) {
    
    throw error; 
  }
}


const logout = () => localStorage.removeItem("user");

const authService = {
  register,
  logout,
  login,
  updateUser
};

export default authService;
