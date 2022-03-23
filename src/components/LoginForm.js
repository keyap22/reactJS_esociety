import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

export const LoginForm = () => {
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [role, setRole] = useState('')
    const [roleName, setRoleName] = useState('')

    const [visibility, setvisibility] = useState('')

    const [roleList, setroleList] = useState([])


    const navigation = useNavigate()

    const displayRole = () => {
        axios.get("http://localhost:4000/roles/").then(res => {
            setroleList(res.data.data)
        })
    }

    const roleHandler = (e) => {
        //console.log(e.target.value)
        setRole(e.target.value)
    }

    const emailHandler = (e) => {

        console.log(e.target.value)
        setemail(e.target.value)
    }

    const passwordHandler = (e) => {

        setpassword(e.target.value)

    }

    const getRoleByID = () => {
        var id = role
        axios.get(`http://localhost:4000/roles/` + id).then(res => {
            console.log(res)
            console.log("role name :", res.data.data.roleName)
            setRoleName(res.data.data.roleName)
        })

    }

    var currentdate = new Date();
    var date = currentdate.getDate() + "/" + (currentdate.getMonth() + 1) + "/" + currentdate.getFullYear()

    const submit = async (e) => {

        e.preventDefault()
        var formdata = {
            email: email,
            password: password,
            role: role
        }
        getRoleByID()

        await axios.post('http://localhost:4000/login/', formdata).then(res => {
            console.log("login response : ",res)
            if (res.data.status === 200) {
                console.log("Login successful")
                console.log("role name in submit : ", roleName)


                if (localStorage.getItem("email") === null) {
                    localStorage.setItem('email', email)
                    localStorage.setItem("role", role)
                }
                else {
                    JSON.parse(localStorage.getItem("email"))
                    JSON.parse(localStorage.getItem("role"))
                }
                if (role === "620c88535e051978662b0379") {
                    //security guard attendance
                    var GuardAttendances = {
                        isPresent: 'true',
                        guard: res.data.id,
                        date: date
                    }
                    
                    axios.post('http://localhost:4000/guardAttendances/', GuardAttendances).then(res => {
                        console.log("attendance response : ",res)
                    })
                }
                navigation('/profile')
            }
            else if (res.data.status === -1) {

                alert("Incorrect credentials.....Please enter correct credentials")

                //clearing out the details of the form after pressing submit button
                e.target.reset()

            }
        })
        console.log("submit called.....")
    }

    const showPassword = () => {

        // console.log("show password method")
        var x = document.getElementById("password");
        if (x.type === "password") {
            x.type = "text";
            setvisibility(true);

        } else {
            x.type = "password";
            setvisibility(false)
        }
    }

    return (
        <section id="services" className="services section-bg">

            <div className='mycard my-5 '>
                <div className="form-center " >

                    <form className="login-form" align="center" onSubmit={submit}>

                        <h4 className="align-title my-5"><strong>LOGIN</strong></h4>
                        <div className="form-group row my-3 mr-2 mb-3">
                            <label className="col-sm-2 col-form-label"><strong>Role  </strong></label>
                            <div className="col-sm-9 ml-3">
                                <select className="form-select" id="role" required onClick={(e) => { displayRole(e) }} onChange={(e) => { roleHandler(e) }}>
                                    <option value="">Please Select</option>
                                    {
                                        roleList.map((role) => {

                                            return (
                                                <option key={role._id} value={role._id} name={role.roleName}>{role.roleName}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                        </div>


                        <div className="form-group row my-3 mr-2 mb-3 ">
                            <label htmlFor="Email" className="col-sm-2 col-form-label"><strong>Email</strong></label>
                            <div className="col-sm-9 ml-3">
                                <input type="email" id="Email" className="form-control" name="email"
                                    placeholder="Enter Your Email" onChange={(e) => { emailHandler(e) }} required />
                            </div>
                        </div>

                        <div className="form-group row my-3 mr-2 mb-3">
                            <label htmlFor="Password1" className="col-sm-2 col-form-label"><strong>Password</strong></label>
                            <div className="formField col-sm-9 ml-3">
                                {/* <input type="password" id="Password1" className="form-control md-9" name="Password1"
                                placeholder="Enter your password" required onChange={(e) => { passwordHandler(e) }} />
                            <div className="md-3"> </div> */}

                                <input type="password" id="password" name="password" className="form-control" maxLength="14" placeholder="Enter your password" required
                                    autoComplete="off" onChange={(e) => { passwordHandler(e) }} />

                                <Link to="" className="showPassword" onClick={(e) => { showPassword(e) }}><i className={`bi ${visibility ? "bi-eye" : "bi-eye-slash"}`} id="visibility" name="visibility"></i></Link>
                            </div>
                        </div>

                        <div className="form-group form-check mb-3">
                            <label className="form-check-label">
                                <input className="form-check-input" type="checkbox" name="remember" /> Remember me
                            </label>
                        </div>

                        <div className="my-5">
                            <input type="submit" className='btn-centre' value="Login" /><br />

                            New User?
                            <Link to="/signup" className="my-1"> Create an account</Link>
                        </div>

                        <div className="my-2">
                            <Link to="/forgotpassword" className="forgotPassword">Forgot Password?</Link>
                        </div>
                    </form>
                </div>
            </div>
        </section>

    )
}