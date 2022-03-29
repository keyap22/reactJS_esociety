import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const LoginForm = () => {
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [role, setRole] = useState('')
    const [roleName, setRoleName] = useState('')
    const [guardID, setGuardID] = useState('')
    const [visibility, setvisibility] = useState('')

    const [roleList, setroleList] = useState([])
    var [addAttendance, setAddAttendance] = useState(false)

    var [emailError, setEmailError] = useState(false);
    var [loggedIn, setLoggedIn] = useState(false);



    var guardId = ""
    var userId = ""
    var guardAttendanceList = []

    //const validPassword = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,14})');
    const validMail = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+(?=.)+(?=.[a-zA-Z]$)');

    const showtoast = () => {

        var status = "success"
        toast.warn('Logged in', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
    }

    useEffect(() => {

        // getGuardAttendances()

        if(localStorage.getItem("email")!==null)
        {
            setLoggedIn(true)
        }

    }, [])

    const navigation = useNavigate()

    // const getGuardAttendances = () => {
    //     axios.get('http://localhost:4000/guardAttendances/').then(res => {
    //         console.log(res)
    //         guardAttendanceList = res.data.data
    //         console.log("guard attendance list : ", guardAttendanceList)
    //         guardAttendanceList.forEach(attendance => {

    //             if (attendance.guard._id === localStorage.getItem("guardID")) {

    //                 console.log("attendance guard id : ", attendance.guard._id)
    //                 console.log("date from get all attendances", attendance.date)
    //                 if ((attendance.date === date.toString())) {
    //                     //setAddAttendance(false)
    //                     console.log("addAttendance in forEach : ", addAttendance)
    //                     return false
    //                 }
    //                 else {
    //                     //setAddAttendance(true) 
    //                     return true
    //                 }
    //             }

    //         });
    //         //console.log("guard id from get all attendances : ", res.data.data.guard)

    //     })
    // }



    const emailHandler = (e) => {
        if (!validMail.test(e.target.value)) {
            setEmailError(true);
        }
        else {
            setEmailError(false);
            setemail(e.target.value)
        }

    }




    const displayRole = () => {
        axios.get("http://localhost:4000/roles/").then(res => {
            setroleList(res.data.data)
        })
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

    //find particular guard using userID
    const postSecurityGuard = async () => {

        var formData = {
            user: userId
        }

        await axios.post('http://localhost:4000/guardAttendance/', formData).then(res => {
            console.log(res)
            console.log("guard id : ", res.data.id)
            guardId = res.data.id
            setGuardID(res.data.id)
            localStorage.setItem("guardID", res.data.id)
            console.log("after setting guard id : ", guardId)
        })
    }

    const submit = async (e) => {

        e.preventDefault()
        var formdata = {
            email: email,
            password: password,
            role: role
        }
        getRoleByID()

        await axios.post('http://localhost:4000/login/', formdata).then(res => {
            console.log("login response : ", res)
            if (res.data.status === 200) {
                console.log("Login successful")
                console.log("role name in submit : ", roleName)
                console.log("user id : ", res.data.id)
                userId = res.data.id
console.log(localStorage.getItem("email"))
                if (localStorage.getItem("email") === null) {
                    localStorage.setItem('email', email)
                    localStorage.setItem("role", role)
                    localStorage.setItem("roleName", roleName)
                    console.log("-================----" + role)
                    navigation('/profile')

                    if (role === "620c88535e051978662b0379") {
                        //security guard attendance
                        postSecurityGuard()


                        //check attendance list to know whether guard has already loggedin or not 
                         axios.get('http://localhost:4000/guardAttendances/').then(res => {
                            console.log(res)
                            guardAttendanceList = res.data.data
                            console.log("guard attendance list : ", guardAttendanceList)
                            //guardAttendanceList.forEach(attendance => 
                            for (let attendance of guardAttendanceList) {

                                if (attendance.guard._id === localStorage.getItem("guardID")) {
                                    console.log("in if part of setting add attendance")


                                    console.log("attendance guard id : ", attendance.guard._id)
                                    console.log("date from get all attendances", attendance.date)
                                    if ((attendance.date === date.toString())) {
                                        //setAddAttendance(false)
                                        addAttendance = false
                                        console.log("addAttendance in forEach : ", addAttendance)
                                        return false

                                    }
                                    else {
                                        addAttendance = true

                                    }

                                }
                                else {
                                    console.log("in else part of setting add attendance")
                                    addAttendance = true
                                    //setAddAttendance(true) 
                                    return true
                                }
                                // if (addAttendance === false) {
                                //     break;
                                // }

                            }
                            // );
                            console.log("guard id from get all attendances : ", res.data.data.guard)
                            console.log("==========================>" + addAttendance)
                            if ((localStorage.getItem("guardID") !== "") && addAttendance === true) {
                                console.log("above if statement of get guard attendances")

                                console.log("addAttendance value===============> :" + addAttendance)
                                console.log(localStorage.getItem("guardID") !== "")
                                var GuardAttendances = {
                                    isPresent: 'true',
                                    guard: localStorage.getItem("guardID"),
                                    date: date
                                }
                                console.log("before post, guard id : ", localStorage.getItem("guardID"))
                               axios.post('http://localhost:4000/guardAttendances/', GuardAttendances).then(res => {
                                    console.log("attendance response : ", res)

                                    console.log("guard attendances : ", GuardAttendances)
                                    console.log("in post guard id : ", GuardAttendances.guard)
                                    localStorage.setItem("guardID", GuardAttendances.guard)
                                })

                            }


                        })

                        navigation('/profile')
                    }
                }
                else {
                    JSON.parse(localStorage.getItem("email"))
                    JSON.parse(localStorage.getItem("role"))
                    JSON.parse(localStorage.getItem("guardID"))
                }

                //navigation('/profile')
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
                {!loggedIn ?

                    <form className="login-form" align="center" onSubmit={submit}>

                        <h4 className="align-title my-5"><strong>LOGIN</strong></h4>
                        <div className="form-group row my-3 mr-2 mb-3">
                            <label className="col-sm-2 col-form-label"><strong>Role  </strong></label>
                            <div className="col-sm-9 ml-3">
                                <select className="form-select" id="role" required
                                    onClick={(e) => { displayRole(e) }} onChange={(e) => { setRole(e.target.value) }}>
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
                                {emailError && <p>Your email is invalid</p>}

                            </div>
                        </div>

                        <div className="form-group row my-3 mr-2 mb-3">
                            <label htmlFor="Password1" className="col-sm-2 col-form-label"><strong>Password</strong></label>
                            <div className="formField col-sm-9 ml-3">

                                <input type="password" id="password" name="password" className="form-control" maxLength="14" placeholder="Enter your password" required
                                    autoComplete="off" onChange={(e) => { setpassword(e.target.value) }} />


                                <Link to="" className="showPassword" onClick={(e) => { showPassword(e) }}><i className={`bi ${visibility ? "bi-eye" : "bi-eye-slash"}`} id="visibility" name="visibility"></i></Link>

                            </div>
                        </div>

                        <div className="form-group form-check mb-3">
                            <label className="form-check-label">
                                <input className="form-check-input" type="checkbox" name="remember" /> Remember me
                            </label>
                        </div>

                        <div className="my-5">
                            <input type="submit" className='btn-centre' value="Login" onClick={showtoast} /><br />
                            <ToastContainer
                                    position="top-right"
                                    autoClose={5000}
                                    hideProgressBar={false}
                                    newestOnTop={false}
                                    closeOnClick
                                    rtl={false}
                                    pauseOnFocusLoss
                                    draggable
                                    pauseOnHover
                                />

                            New User?
                            <Link to="/signup" className="my-1"> Create an account</Link>
                        </div>

                        <div className="my-2">
                            <Link to="/forgotpassword" className="forgotPassword">Forgot Password?</Link>
                        </div>
                    </form> : <div><h3>Please log out from your device first</h3></div>}
                </div>
            </div>
        </section>
    )
}