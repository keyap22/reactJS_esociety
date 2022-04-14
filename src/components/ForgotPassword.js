import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'


export const ForgotPassword = () => {

  var userID = ""
  const navigation = useNavigate()

  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [email, setEmail] = useState('')
  const [userId, setUserId] = useState('')
  const [userList, setUserList] = useState('')
  var [emailotp, setemailotp] = useState('')
  const [sysotp, setSysotp] = useState(Math.floor((Math.random() * 1000000) + 1)) //emailotp
  var [validOtp, setValidOtp] = useState()
   
  const [haveEmail, setHaveEmail] = useState(false)
  var [pwdError, setPwdError] = useState(false);
  const [isSubmitted , setIsSubmitted] = useState(false)
   

  const validPassword = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,14})');
   

  const findUserByEmail = () => {
    var formdata = {
      email: email
    }
    console.log("email before post request :", email)
    axios.post("http://localhost:4000/forgotpwd/", formdata).then(res => {
      console.log("User found successfully!")
      console.log("response : ", res)
      console.log("user id :", res.data.data._id)
      userID = res.data.data._id

      console.log("found user status :", res.data.data)
      console.log("userID : " + userID)
      setUserList(res.data.data)
      setUserId(userID)
      console.log("after setting userId : " + userId)

      setHaveEmail(true)
    })
  }

  const passwordHandler = (e) => {

    if (!validPassword.test(e.target.value)) {
      setPwdError(true);
   }
   else{
      setPwdError(false);
      console.log("password : ", e.target.value)
    
       setPassword(e.target.value)
   }
    }

  const confirmpasswordHandler = (e) => {
    console.log("confirm password : ", e.target.value)
    setPassword2(e.target.value)
  }

  const submit = (e) => {
    e.preventDefault()
    if (password !== password2) {
      alert("Please enter same password in both the fields!")
    }
    else if (password.length < 8) {
      alert("Please enter password of atleast 8 characters!")
    }
    else {
      // var user = {
      //   email: userList.email,
      //   password: password,
      //   mobileNo: userList.mobileNo,
      //   firstName: userList.firstName,
      //   lastName: userList.lastName,
      //   role: userList.role,
      //   profilePhoto: userList.profilePhoto
      // }
      // console.log("===================================" + userId)
      // console.log(`http://localhost:4000/users/` + userId)
      // axios.put(`http://localhost:4000/users/` + userId, user).then(res => {
      //   console.log(res.status)
      //   console.log("user updation status :", res.data.data)
      //   console.log("user in put method : ", user)
      //   alert("Password updated successfully!")
      //   navigation('/login')
      // })
      var isSubmit =true
      setIsSubmitted(isSubmit);

      sendMail(e);
    }
    console.log("submit called.....")
    console.log(`password : ${password},password2 : ${password2}`)

    // navigation('/login')
  }

  const getEmail = (e) => {

    e.preventDefault()

    findUserByEmail()

    console.log("email id received.....")
    console.log("email passed : ", email)

    //navigation('/login')
  }


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


  const verifyemail = async (e) => {
    e.preventDefault()

    console.log("otp entered by user : ", emailotp)
    console.log("system generated otp : ", sysotp)
     console.log("valid otp use state var in verify email method : ", validOtp)


    if (emailotp.toString() === sysotp.toString()) {
        console.log("correct otp")
        var user = {
          email: userList.email,
          password: password,
          mobileNo: userList.mobileNo,
          firstName: userList.firstName,
          lastName: userList.lastName,
          role: userList.role,
          profilePhoto: userList.profilePhoto
        }
        console.log("===================================" + userId)
        console.log(`http://localhost:4000/resetpwd/` + userId)
        axios.put(`http://localhost:4000/resetpwd/` + userId, user).then(res => {
          console.log(res.status)
          console.log("user updation status :", res.data.data)
          console.log("user in put method : ", user)
          alert("Password updated successfully!")
          navigation('/login')
        })
  
    }

    else {
        alert("incorrect otp")
        
        //return false
    }
}


  return (
    <>

      <section id="services" className="services section-bg">
{!isSubmitted?
        <div className='mycard my-5 '>
          <div className="align-items-center">

            <form className="form-horizontal" align="center" id="emailForm" style={{ height: "380px", display: `${haveEmail ? "none" : "block"}` }} onSubmit={getEmail}>

              <h3 className="align-title my-5"><strong>RESET PASSWORD</strong></h3>
              <div className="form-row"></div>

              <div className="form-group row my-3 mr-2 mb-3">
                <label className="col-sm-2 col-form-label"><strong>Email  </strong></label>
                <div className="col-sm-10">
                  <input type="email" id="email" className="form-control" name="Email"
                    placeholder="Enter your email address" required onChange={(e) => { setEmail(e.target.value) }} />
                </div>
              </div>

              <div className="form-grp row my-5" style={{ marginLeft: "150px" }}>
                <div className="col-sm-10">
                  <input type="submit" className='btn-centre' value="Continue" />
                  {/* onChange={setHaveEmail(true)}  */}
                </div>
              </div>

              <div className="form-grp row">
                <div className="col-sm-12">
                  Remember Password?
                                <Link to="/login"> Login</Link>
                </div>
              </div>
            </form>

            {haveEmail ? <form className="form-horizontal" align="center" id="passwordForm" style={{ height: "480px", display: `${haveEmail ? "block" : "none"}` }} onSubmit={submit}>

              <h3 className="align-title my-5"><strong>RESET PASSWORD</strong></h3>


              <div className="form-group row my-3 mr-2 mb-3">
                <label className="col-sm-2 col-form-label"><strong>Password  </strong></label>
                <div className="col-sm-10">
                  <input type="password" id="Password1" className="form-control" name="Password1" autoComplete="off"
                    placeholder="Create a strong password" required onChange={(e) => { passwordHandler(e) }} />
                  <small id="passwordHelpBlock" className="form-text text-muted">
                    Your password  MUST contain at least 8 characters,at least one uppercase letter,at least one number and at least one special character.
                </small>
                  {/* {
                    password.length > 0 && password.length < 8 ? "please enter password of atleast 8 characters" : ""
                  } */}
                    {pwdError && <p>Your password is invalid</p>}

                </div>
              </div>

              <div className="form-group row my-3 mr-2 mb-3">
                <label className="col-sm-2 col-form-label"><strong>Confirm Password  </strong></label>
                <div className="col-sm-10">
                  <input type="password" id="Password2" className="form-control" name="Password2" autoComplete="off"
                    placeholder="Re-enter password" required onChange={(e) => { confirmpasswordHandler(e) }} />
                </div>
              </div>

              <div className="form-grp row my-5" style={{ marginLeft: "150px" }}>
                <div className="col-sm-10">
                  <input type="submit" className='btn-centre' value="Update Password" />
                </div>
              </div>

              <div className="form-grp row">
                <div className="col-sm-12">
                  Remember Password?
                                <Link to="/login"> Login</Link>
                </div>
              </div>

            </form> : ""}
          </div>
        </div> :
        <form className="form-horizontal" align="center" id="checkemailForm"
        style={{ height: "380px" }} onSubmit={verifyemail}>

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
        }
      </section>
    </>
  )
}