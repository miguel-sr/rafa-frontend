import { useState, useEffect } from "react"
import {toast} from "react-toastify"
import { useNavigate } from "react-router-dom"
import { FaSignInAlt } from "react-icons/fa"
import {useSelector, useDispatch} from "react-redux"
import {login, reset} from "../features/auth/authSlice"
import Spinner from "../components/Spinner"
import React from 'react';
import { RootState} from "../app/rootReducer"
import { AppDispatch } from "../app/store"

function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })
    const { email, password } = formData

    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const {user, isLoading, isError, isSuccess, message} =
     useSelector((state: RootState) => state.auth)

     useEffect(() => {
        if(isError){
            toast.error(message)
        }
        if(isSuccess || user){
            navigate("/")
        }
        dispatch(reset())
    }, [isError, isSuccess, user, message, navigate, dispatch])
    
    const handleChange = (e:any) => {
        setFormData((prevState) =>({
            ...prevState,
            [e.target.name] : e.target.value,
        }))
    }

    const handleSubmit = (e:any) => {
        e.preventDefault()
        const userData = {
            email,
            password,
        }
        dispatch(login(userData));
    }

    if(isLoading){
        return <Spinner/>
    }
    return (
        <>
            <section className="heading">
                <h1>
                    <FaSignInAlt /> Login
                </h1>
            </section>
            <section className="form">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input 
                        type="email" 
                        className="form-control"
                        id="email" 
                        name="email"
                        value={email} 
                        onChange={handleChange}
                        placeholder="Email"
                        required />
                    </div>
                    <div className="form-group">
                        <input 
                        type="password" 
                        className="form-control"
                        id="password" 
                        name="password"
                        value={password} 
                        onChange={handleChange}
                        placeholder="Password"
                        required />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-block">
                            Login
                        </button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default Login
