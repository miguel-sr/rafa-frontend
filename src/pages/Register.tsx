import { useState, useEffect } from "react"
import {useNavigate} from "react-router-dom"
import { toast } from "react-toastify"
import { FaUser } from "react-icons/fa"
import {useSelector, useDispatch} from "react-redux"
import {register, reset} from "../features/auth/authSlice"
import Spinner from "../components/Spinner"
import { RootState } from "../app/rootReducer"
import React from 'react';
import { AppDispatch } from "../app/store"

//Register a user
//By default, the user will have the permission to see the form in a readonly state

function Register() {
    const [formData, setFormData] = useState({
        firstName: "",
        email: "",
        password: "",
        password2: "",
        gender: "", 
        lastName: "",
        permissions: []   
    })
    const { firstName, lastName, email, password, password2, gender, permissions } = formData

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
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const handleSubmit = (e:any) => {
        e.preventDefault()
        if (password !== password2) {
            toast.error("Password and password confirmation must be the same")
        }else{
            const userData = {
                firstName,
                lastName,
                email,
                password,
                gender,
                permissions: ["user:profile:view"]
                
            }
            dispatch(register(userData))
        }
    }
    if(isLoading){
        return <Spinner />
    }

    return (
        <>
            <section className="heading">
                <h1>
                    <FaUser /> Register 
                </h1>
                <p>Create your account</p>
            </section>
            <section className="form">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            id="firstName"
                            name="firstName"
                            value={firstName}
                            onChange={handleChange}
                            placeholder="First Name"
                            required />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            id="lastName"
                            name="lastName"
                            value={lastName}
                            onChange={handleChange}
                            placeholder="Last Name"
                            required />
                    </div>
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
                        <input
                            type="password"
                            className="form-control"
                            id="password2"
                            name="password2"
                            value={password2}
                            onChange={handleChange}
                            placeholder="Password confirmation"
                            required />
                    </div>
                    <div className="form-group">
                        <select
                            className="form-control"
                            id="gender"
                            name="gender"
                            value={gender}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Gender</option>
                            <option value="M">Male</option>
                            <option value="F">Female</option>
                            <option value="O">Other/Prefer not to say</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <button className="btn btn-block">
                            Register
                        </button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default Register
