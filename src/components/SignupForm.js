import React from 'react'
import { useState } from 'react'
import { Link, useNavigate, Navigate } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//import firebase_app, { requestForToken } from './components/Firebase';
import { auth } from './Firebase';

import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";


export const SignupForm = () => {

    const navigation = useNavigate()

    const [firstName, setFirstName] = useState('')  // smallest possible : om
    const [lastName, setLastName] = useState('') //smallest possible :jha
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [contactNumber, setContactNumber] = useState('')
    const [role, setRole] = useState('')
    const [profilePhoto, setProfilePhoto] = useState('')
    const [age, setAge] = useState('')
    const [house, setHouse] = useState()
    const [dutyStartingTime, setDutyStartingTime] = useState('')
    const [dutyEndingTime, setDutyEndingTime] = useState('')
    var [isMember, setIsMember] = useState(false)
    var [isGuard, setIsGuard] = useState(false)
    var [validEmail, setValidEmail] = useState(true)
    var [pwdError, setPwdError] = useState(false);
    var [emailError, setEmailError] = useState(false);
    var [haveSubmitted, setHaveSubmitted] = useState(false)   // true when details form is submitted , becomes false when email is verified
    var [emailotp, setemailotp] = useState('')
    const [sysotp, setSysotp] = useState(Math.floor((Math.random() * 1000000) + 1)) //emailotp
    var [validOtp, setValidOtp] = useState()

     var [emailVerified, setEmailVerified] = useState(false)
    //var validOTP=false;
    var [validOTP, setValidOTP] = useState(false) //phone

    var otp ="";//phone otp


    var HaveSubmitted;
    const [roleList, setroleList] = useState([])
    const [houseList, sethouseList] = useState([])

    const validPassword = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,14})');
    const validMail = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+(?=.)+(?=.[a-zA-Z]$)');

    //[a-zA-Z0-9]+)([\.{1}])?([a-zA-Z0-9]+)\@(?:gmail|GMAIL)([\.])(?:com|COM) 

    var userid = ""

    const roleHandler = (e) => {
        console.log("role : " + e.target.value)

        if (e.target.value === "620dd424e608c720fa0f1be8" || e.target.value === "620dda4cbaf661b44817ee63") {
            console.log("society member or chairman selected")
            setIsMember(true)
            setIsGuard(false)
        }
        else if (e.target.value === "620c88535e051978662b0379") {
            console.log("security guard selected")
            setIsGuard(true)
            setIsMember(false)
        }
        else {
            setIsGuard(false)
            setIsMember(false)
        }
        setRole(e.target.value)
    }

    const profilePhotoHandler = (e) => {
        console.log(e.target.files[0].name)
        setProfilePhoto(e.target.files[0].name)
    }

    const displayRole = () => {
        axios.get("http://localhost:4000/roles/").then(res => {
            setroleList(res.data.data)
        })
    }

    const displayHouse = () => {
        axios.get("http://localhost:4000/houses/").then(res => {
            //console.log(res.data.data)
            sethouseList(res.data.data)
        })
    }

    //if new user is trying to sign in using mail id used by existing user, then validEmail=false
    const findUserByEmail = (email) => {
        var formdata = {
            email: email
        }
        console.log("email before post request :", email)
        axios.post("http://localhost:4000/forgotpwd/", formdata).then(res => {
            console.log("===response : ", res.data.data)

            if (res.data.data !== null) {
                console.log("User with same email found successfully!")
                console.log("response : ", res.data.data)
                //console.log("user id :", res.data.data._id)
                //userID = res.data.data._id
                setValidEmail(false)
                console.log("valid email value : ", validEmail)
            }
            else {
                setValidEmail(true)
                console.log("valid email value : ", validEmail)

            }
        })

    }

    const emailHandler = (e) => {
        findUserByEmail(e.target.value)
        if (!validMail) {
            setEmailError(true);

        }
        else {
            setEmailError(false);
            setEmail(e.target.value)
        }
        console.log("email error :" + emailError)

    }

    const passwordHandler = (e) => {
        if (!validPassword.test(e.target.value)) {
            setPwdError(true);
        }
        else {
            setPwdError(false);
            setPassword(e.target.value)
        }
    }

    //==========mobile otp 
    const generateRecaptcha = () => {

        window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
            'size': 'invisible',
            'callback': (response) => {
                // reCAPTCHA solved, allow signInWithPhoneNumber.
                //onSignInSubmit();
            }
        }, auth);
    }

    //for phone no. verification
    const onSignInSubmit = (e) => {
        e.preventDefault();
        generateRecaptcha();
        const phoneNumber = "+91" + contactNumber
        // window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier()
        let appVerifier = window.recaptchaVerifier;
        console.log("=================validotp :" + validOTP)

        signInWithPhoneNumber(auth, phoneNumber, appVerifier)
            .then((confirmationResult) => {
                console.log("success phone :" + phoneNumber)
                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).

                window.confirmationResult = confirmationResult;
                                // }
                // ...
            }).catch((error) => {
                // Error; SMS not sent
                // ...
            });
    }

    
    const verifyOTP=(e)=>
{console.log(e.target.value)
  otp = e.target.value
  if(otp.length===6)
  {
      let confirmResult = window.confirmationResult ;
      confirmResult.confirm(otp).then((result) => {
        console.log("you have entered correct otp"+otp)
        setValidOTP(true);
        // User signed in successfully.
        //const user = result.user;
        console.log("success")
        // ...
      }).catch((error) => {
        // User couldn't sign in (bad verification code?)
       //alert("you have entered wrong otp")
       
        // ...
      });

  }
}
    
    const verifyPhone =async (e) => {
        console.log(validOTP)
       
        if(validOTP===true)
        {
            var user = {
                        email: email,
                        password: password,
                        mobileNo: contactNumber,
                        firstName: firstName,
                        lastName: lastName,
                        role: role,
                        profilePhoto: profilePhoto.toString()
                    }
        
                    await axios.post('http://localhost:4000/Users/', user).then(res => {
        
                        console.log(res.status)
                        alert("User account created successfully!")
                        navigation('/login')
        
                        console.log("user id : ", res.data.data._id)
                        console.log("type of user id : ", typeof (res.data.data._id))
                        console.log("type of profile photo : ", typeof (profilePhoto))
                        userid = res.data.data._id
        
                    })
        
                    console.log("========================================" + userid)
        
        
                    if (role === "620dd424e608c720fa0f1be8" || role === "620dda4cbaf661b44817ee63") {
                        if (userid !== "") {
        
                            var member = {
                                age: age,
                                house: house,
                                user: userid,
                                memberName: firstName + " " + lastName
                            }
        
        
                            await axios.post('http://localhost:4000/members/', member).then(res => {
                                console.log(res)
                                console.log("member added ")
                                //alert("Society member added successfully!")
                                //console.log("while adding in member table : ", typeof(res.data.data.user.profilePhoto))
                            })
                        }
                    }
        
                    else if (role === "620c88535e051978662b0379") {
                        if (userid !== "") {
        
                            var securityGuard = {
                                guardName: firstName + " " + lastName,
                                scheduleTime: dutyStartingTime.toString() + " to " + dutyEndingTime.toString(),
                                mobileNo: contactNumber,
                                user: userid
                            }
        
                            axios.post('http://localhost:4000/guards/', securityGuard).then(res => {
                                console.log(res)
                                console.log("guard added ")
                                //alert("Security Guard added successfully!")
                                console.log("while adding in guard table : ", securityGuard.scheduleTime)
                            })
                        }
                    }
        
            navigation('/login')
            
        }
        else{
            console.log("pppppppppp")
            alert("you have entered wrong otp")

        }

    }
//=======================mobile otp end ==========================================

    const verifyemail = async (e) => {
        e.preventDefault()

        console.log("otp entered by user : ", emailotp)
        console.log("system generated otp : ", sysotp)
        console.log("=================validotp :" + validOTP)
        console.log("valid otp use state var in verify email method : ", validOtp)
       

        if (emailotp.toString() === sysotp.toString()) {
            console.log("correct otp")
            setEmailVerified(true)
            console.log("email verified :" + emailVerified)
            HaveSubmitted = false
            setHaveSubmitted(HaveSubmitted)
          
        //     var user = {
        //         email: email,
        //         password: password,
        //         mobileNo: contactNumber,
        //         firstName: firstName,
        //         lastName: lastName,
        //         role: role,
        //         profilePhoto: profilePhoto.toString()
        //     }

        //     await axios.post('http://localhost:4000/Users/', user).then(res => {

        //         console.log(res.status)
        //         alert("User account created successfully!")
        //         navigation('/login')

        //         console.log("user id : ", res.data.data._id)
        //         console.log("type of user id : ", typeof (res.data.data._id))
        //         console.log("type of profile photo : ", typeof (profilePhoto))
        //         userid = res.data.data._id

        //     })

        //     console.log("========================================" + userid)


        //     if (role === "620dd424e608c720fa0f1be8" || role === "620dda4cbaf661b44817ee63") {
        //         if (userid !== "") {

        //             var member = {
        //                 age: age,
        //                 house: house,
        //                 user: userid,
        //                 memberName: firstName + " " + lastName
        //             }


        //             await axios.post('http://localhost:4000/members/', member).then(res => {
        //                 console.log(res)
        //                 console.log("member added ")
        //                 //alert("Society member added successfully!")
        //                 //console.log("while adding in member table : ", typeof(res.data.data.user.profilePhoto))
        //             })
        //         }
        //     }

        //     else if (role === "620c88535e051978662b0379") {
        //         if (userid !== "") {

        //             var securityGuard = {
        //                 guardName: firstName + " " + lastName,
        //                 scheduleTime: dutyStartingTime.toString() + " to " + dutyEndingTime.toString(),
        //                 mobileNo: contactNumber,
        //                 user: userid
        //             }

        //             axios.post('http://localhost:4000/guards/', securityGuard).then(res => {
        //                 console.log(res)
        //                 console.log("guard added ")
        //                 //alert("Security Guard added successfully!")
        //                 console.log("while adding in guard table : ", securityGuard.scheduleTime)
        //             })
        //         }
        //     }

        //     //   return true
         }
        
        else {
            alert("incorrect otp")
            //navigation('/signup')
            //return false
        }
    }

    const showtoast = () => {

        var status = "success"
        toast.warn('User Account Created', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
    }

    const submit = async (e) => {
        e.preventDefault()
        if (password !== password2) {
            alert("Please enter same password in both the fields!")
        }
        else if (validEmail === false || firstName.length <= 2 || lastName.length <= 3 || password.length < 8) {
            alert("Please consider validation messages and enter details accordingly!")
        }
        else {
            console.log("have submitted value : ", haveSubmitted)
            HaveSubmitted = true
            setHaveSubmitted(HaveSubmitted)
            console.log("after setting have submitted value : ", haveSubmitted)
            sendMail(e)


        }
       
        //console.log("submit called.....")
        //console.log(`email : ${email}, password : ${password},password2 : ${password2}, first name : ${firstName}, last name : ${lastName}`)
        //console.log(`contact number : ${contactNumber}, role : ${role}, profile photo : ${profilePhoto}`)
        //roleList.roleName
        //console.log(`role : ${role}`)
        //console.log(e.target)

        //clearing out the details of the form after pressing submit button
        //e.target.reset()
    }
    //}

    const sendMail = async (e) => {
        //6 digit random otp number
        console.log("sysotp : ", sysotp)

        var data = {
            email: email,
            otp: sysotp
        }

        await axios.post("http://localhost:4000/sendmail/", data)
            .then(res => {
                console.log("send mail status : ", res.data.data)
            });
    }

    return (
        <section id="services" className="services section-bg">

            <div className='mycard my-5 '>
                <div className="align-items-center">
                    <form className="form-horizontal" align="center" id="signIn" style={{ display: `${haveSubmitted ? "none" : "block"}` }} onSubmit={submit}>

                        <h3 className="align-title my-5"><strong>CREATE ACCOUNT</strong></h3>

                        <div className="form-row">

                            <div className="form-group col-md-2 my-3">
                                <label><strong>First Name</strong></label></div>
                            <div className="form-group col-md-3 my-3 mr-5 ">
                                <input type="text" className="form-control" name="firstName" id="FirstName"
                                    placeholder="Enter Your First Name" required onChange={(e) => { setFirstName(e.target.value) }} />
                                {
                                    firstName.length <= 1 && firstName.length > 0 ? "please enter valid first name" : ""
                                }
                            </div>

                            <div className="form-group col-md-0.1 my-3 mx-5">
                                <label><strong>Last Name</strong></label></div>
                            <div className="form-group col-md-3 my-3">
                                <input type="text" className="form-control" id="LastName" name="lastName"
                                    placeholder="Enter Your Last Name" required onChange={(e) => { setLastName(e.target.value) }} />
                                {
                                    lastName.length <= 2 && lastName.length > 0 ? "please enter valid last name" : ""
                                }
                            </div>
                        </div>


                        <div className="form-group row my-3 mr-2 mb-3">
                            <label className="col-sm-2 col-form-label"><strong>Email  </strong></label>
                            <div className="col-sm-10">
                                <input type="email" id="Email" className="form-control" name="email"
                                    placeholder="Enter Your Email" required onChange={(e) => { emailHandler(e) }} />
                                <small id="emailHelp" className="form-text text-muted">Please enter correct details. We'll send you a verification code via mail.
                                    {/* We'll never share your email with anyone else. */}
                                </small>
                                {
                                    validEmail || email >= 0 ? "" : "Email already exists.Please enter different mail id"
                                }
                                {emailError && <p>Your email is invalid </p>}

                            </div>
                        </div>

                        <div className="form-group row my-3 mr-2 mb-3">
                            <label className="col-sm-2 col-form-label"><strong>Password  </strong></label>
                            <div className="col-sm-10">
                                <input type="password" id="Password1" className="form-control" name="Password1" autoComplete="off"
                                    placeholder="Create a strong password" required
                                    onChange={(e) => { passwordHandler(e) }} minLength="8" />
                                <small id="passwordHelpBlock" className="form-text text-muted">
                                    Your password  MUST contain at least 8 characters.
                                    ,at least one uppercase letter,at least one number and at least one special character.
                                </small>
                                {/* {
                                    password.length > 0 && password.length < 8 ? "please enter password of atleast 8 characters" : ""
                                } */}
                                {pwdError && <p>Your password is weak.Please try with other password</p>}

                            </div>
                        </div>

                        <div className="form-group row my-3 mr-2 mb-3">
                            <label className="col-sm-2 col-form-label"><strong>Confirm Password  </strong></label>
                            <div className="col-sm-10">
                                <input type="password" id="Password2" className="form-control" name="Password2" autoComplete="off"
                                    placeholder="Re-enter password" required onChange={(e) => { setPassword2(e.target.value) }} />
                                {
                                    password2 !== password ? "Does not match password" : ""
                                }

                            </div>
                        </div>

                        <div className="form-group row my-3 mr-2 mb-3">
                            <label className="col-sm-2 col-form-label"><strong>Contact Number  </strong></label>
                            <div className="col-sm-10">
                                <input type="tel" id="ContactNumber" className="form-control" name="contactNumber"
                                    placeholder="Enter Your Mobile Number" required onChange={(e) => { setContactNumber(e.target.value) }} />
                                <small id="emailHelp" className="form-text text-muted">Please enter correct details. We'll send you a verification code via mail.</small>
                            </div>
                        </div>

                        <div className="form-group row my-3 mr-2 mb-3">
                            <label className="col-sm-2 col-form-label"><strong>Role  </strong></label>
                            <div className="col-sm-10">
                                <select className="form-select" id="role" required onClick={(e) => { displayRole(e) }}
                                    onChange={(e) => { roleHandler(e) }}>
                                    <option>Select your role</option>
                                    {
                                        roleList.map((role) => {

                                            return (
                                                <option key={role._id} value={role._id} >{role.roleName}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                        </div>

                        <div className="form-group row my-3 mr-2 mb-3">
                            <label className="col-sm-2 col-form-label"><strong>Profile Photo  </strong></label>
                            <div className="col-sm-10">
                                <input type="file" id="ProfilePhoto" className="form-control-file" name="profilePhoto"
                                    placeholder="Upload Your Profile Photo" onChange={(e => { profilePhotoHandler(e) })} />
                                {
                                    (profilePhoto.includes(".png") || profilePhoto.includes(".jpg") || profilePhoto.includes(".jpeg")) && profilePhoto !== "" ? "" : "Please enter valid image"
                                }

                            </div>
                        </div>

                        {isMember === true ?
                            <div className="form-group row my-3 mr-2 mb-3">
                                <label className="col-sm-2 col-form-label"><strong>Age </strong></label>
                                <div className="col-sm-10">
                                    <input type="number" min="0" max="150" id="age" className="form-control" name="age"
                                        placeholder="Enter your age" onChange={(e => { setAge(e.target.value) })} />
                                </div>
                            </div> : ""}


                        {isMember === true ?
                            <div className="form-group row my-3 mr-2 mb-3">
                                <label className={"col-sm-2 col-form-label"}><strong>House Title  </strong></label>
                                <div className="col-sm-10">
                                    <select className="form-select" id="house" required onClick={(e) => { displayHouse(e) }} onChange={(e) => { setHouse(e.target.value) }}>
                                        <option>Select your house title</option>
                                        {
                                            houseList.map((house) => {

                                                return (
                                                    <option key={house._id} value={house._id}>{house.houseTitle}</option>
                                                )
                                            })
                                        }
                                    </select>

                                </div>
                            </div> : ""}

                        {isGuard ?
                            <div className="form-group row my-3 mr-2 mb-3">
                                <label className="col-sm-2 col-form-label"><strong>Duty Starting Time </strong></label>
                                <div className="col-sm-10">
                                    <input type="time" id="entrytime" className="form-control" name="EntryTime"
                                        required onChange={(e) => { setDutyStartingTime(e.target.value) }} />
                                </div>
                            </div> : ""}

                        {isGuard ?
                            <div className="form-group row my-3 mr-2 mb-3">
                                <label className="col-sm-2 col-form-label"><strong>Duty Ending Time </strong></label>
                                <div className="col-sm-10">
                                    <input type="time" id="exittime" className="form-control" name="ExitTime"
                                        required onChange={(e) => { setDutyEndingTime(e.target.value) }} />
                                </div>
                            </div> : ""}

                        <div className="form-group my-3">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="invalidCheck" required />
                                <label className="form-check-label">
                                    Agree to terms and conditions
                                </label>
                                <div className="invalid-feedback">
                                    You must agree before submitting.
                                </div>
                            </div>
                        </div>

                        <div className="form-grp row my-5">
                            <div className="col-sm-15">
                                <input type="submit" className='btn-centre' value="Sign in" />
                                {/* onClick={showtoast} 
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
                                />*/}
                            </div>
                        </div>

                        <div className="form-grp row my-3">
                            <div className="col-sm-15">
                                Already have an account?
                                <Link to="/login"> Login</Link>
                            </div>
                        </div>

                    </form>

                    {haveSubmitted ?
                        <form className="form-horizontal" align="center" id="checkemailForm"
                        style={{ height: "380px", display: `${haveSubmitted ? "block" : "none"}` }} onSubmit={verifyemail}>

                        <h3 className="align-title my-5"><strong>VERIFY EMAIL</strong></h3>
                        <div className="form-row"></div>

                        <div className="form-group row my-3 mr-2 mb-3">
                            <label className="col-sm-2 col-form-label"><strong>Enter OTP  </strong></label>
                            <div className="col-sm-10">
                                <input type="text" id="otpEmail" className="form-control" name="OtpEmail"
                                    placeholder="Enter otp received in your email" required onChange={(e) => { setemailotp(e.target.value) }} />
                            </div>
                        </div>

                        <div className="form-grp row my-5" style={{ marginLeft: "150px" }}>
                            <div className="col-sm-10">
                                <input type="submit" className='btn-centre' value="Verify" />
                            </div>
                        </div>

                    </form> 
                        
                        : ""}

                    {emailVerified ?
                    
                        
                        
                        <form className="form-horizontal" align="center" id="checkemailForm"
                            style={{ height: "380px" }} onSubmit={(e) => verifyPhone(e)}>

                           

                            <h3 className="align-title my-5"><strong>VERIFY MOBILE NUMBER</strong></h3>

                            <button className="btn btn-primary" value="Send OTP" onClick={onSignInSubmit}>Send OTP</button> 
                            <div className="form-group row my-3 mr-2 mb-3">
                                <label className="col-sm-2 col-form-label"><strong>Enter OTP  </strong></label>
                                <div className="col-sm-10">
                                    <input type="text" id="otpMob" className="form-control" name="OtpMob"
                                        placeholder="Enter otp received in your mobile" required onChange={(e) => { verifyOTP(e) }} />
                                </div>
                            </div>
                            <div id="recaptcha-container"></div>


                            <div className="form-grp row my-5" style={{ marginLeft: "150px" }}>
                                <div className="col-sm-10">
                                    <input type="submit" className='btn-centre' value="Verify" />
                                </div>
                            </div>



                            {/* <div className="form-grp row">
                            <div className="col-sm-12">
                                Want to change email?
                  <Link to="/signup"> Sign Up</Link>
                                {
                                    setHaveSubmitted(false)
                                }
                            </div>
                        </div> */}


                        </form>
                        
                        
                        
                        : ""}
                </div>
            </div>
        </section>
    )
}