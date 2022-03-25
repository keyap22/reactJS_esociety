import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

var userID = ""
export const ForgotPassword = () => {

  
  const navigation = useNavigate()

  // useEffect(() => {

  //   getUserById()

  // }, [userId])

  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [email, setEmail] = useState('')
  const [userId, setUserId] = useState('')
  const [userList, setUserList] = useState('')
  const [haveEmail, setHaveEmail] = useState(false)

 

  const findUserByEmail = () => {
    var formdata ={
email : email
    }
    console.log("email before post request :", email)
    axios.post("http://localhost:4000/forgotpwd/" ,formdata).then(res => {
      console.log("User found successfully!")
      console.log("response : ",res)
      console.log("user id :", res.data.data._id)
      userID = res.data.data._id

      console.log("found user status :", res.data.data)
      console.log("=======================================================" + userID)
      setUserList(res.data.data)
      setUserId(res.data.data._id)
      console.log("=======================================================" + userId)
      
      setHaveEmail(true)
    })
  }

  const passwordHandler = (e) => {
    console.log("password : ", e.target.value)
    setPassword(e.target.value)
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
    else {
      var user = {
        email : userList.email,
        password: password,
        mobileNo: userList.mobileNo,
        firstName: userList.firstName,
        lastName: userList.lastName,
        role: userList.role,
        profilePhoto: userList.profilePhoto
      }
console.log("==================================="+userID)
      axios.put(`http://localhost:4000/users/` + userID, user).then(res => {
        console.log(res.status)
        console.log("user updation status :", res.data.data)
      })
    }
    console.log("submit called.....")
    console.log(`password : ${password},password2 : ${password2}`)
    alert("Password updated successfully!")
  //  navigation('/login')
  }

  const getEmail = (e) => {

    e.preventDefault()

    findUserByEmail()
    // axios.get(`http://localhost:4000/users/` + email).then(res => {
    //   console.log(res.status)
    //   console.log("found user status :", res.data.data)
    //   setUserList(res.data.data)
    // })
  console.log("email id received.....")
  console.log("email passed : ",email)
  
  
  //navigation('/login')
}

return (
  <>

    <section id="services" className="services section-bg">

      <div className='mycard my-5 '>
        <div className="align-items-center">

          <form className="form-horizontal" align="center" id="signIn" style={{ height: "380px", display: `${haveEmail ? "none" : "block"}` }} onSubmit={getEmail}>
            
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

          {haveEmail ? <form className="form-horizontal" align="center" id="signIn" style={{ height: "480px", display: `${haveEmail ? "block" : "none"}` }} onSubmit={submit}>

            <h3 className="align-title my-5"><strong>RESET PASSWORD</strong></h3>


            <div className="form-group row my-3 mr-2 mb-3">
              <label className="col-sm-2 col-form-label"><strong>Password  </strong></label>
              <div className="col-sm-10">
                <input type="password" id="Password1" className="form-control" name="Password1" autoComplete="off"
                  placeholder="Create a strong password" required onChange={(e) => { passwordHandler(e) }} />
                <small id="passwordHelpBlock" className="form-text text-muted">
                  Your password  MUST contain at least 8 characters,at least one uppercase letter,at least one number and at least one special character.
                </small>
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
      </div>
    </section>
  </>
)
}