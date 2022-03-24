import React from 'react'
import { useState } from 'react'
import { Link,  useNavigate } from 'react-router-dom'
import axios from 'axios'

export const SignupForm = () => {

    const navigation = useNavigate()

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [contactNumber, setContactNumber] = useState('')
    const [role, setRole] = useState('')
    const [profilePhoto, setProfilePhoto] = useState('')
    const [age, setAge] = useState('')
    const [house, setHouse] = useState()
    var [showHouse , setShowHouse]=useState(false)

   
    const [roleList, setroleList] = useState([])
    const [houseList, sethouseList] = useState([])

    var userid = ""

    const roleHandler = (e) => {
        console.log("role : "+e.target.value)
        if(e.target.value === "620dd424e608c720fa0f1be8"){
            console.log("society member selected")
            setShowHouse(true)
            
        }
        else if(e.target.value === "620dda4cbaf661b44817ee63")
        {
            console.log("chairman selected")
            setShowHouse(true)
            
            
        }
        else
        {
            setShowHouse(false)
            
        }
         setRole(e.target.value)
         console.log("role state : "+role)

         
       
        
    }

    const whichRole = (e)=> {
        
        if(e.target.value === "620dd424e608c720fa0f1be8"){
            console.log("society member selected")
           // isAdmin = true
        }  
    }

    const profilePhotoHandler = (e) => {
        console.log(e.target.files[0])
        console.log(e.target.files[0].name)
        setProfilePhoto("D:/esociety_images/" + e.target.files[0].name)
        console.log("D:/esociety_images/" + e.target.files[0].name)
        //setProfilePhoto(e.target.value)
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


    const submit = async (e) => {
        e.preventDefault()
        if (password !== password2) {
            alert("Please enter same password in both the fields!")
        }
        else {
            // const data = new FormData()
            // data.append("file", profilePhoto)
            // data.append("upload_preset", "esociety")
            // data.append("cloud_name","kpproject-esociety")
            // // "http://res.cloudinary.com/kpproject-esociety/image/upload/cld-sample"
            // axios.post("https://api.cloudinary.com/v1_1/kpproject-esociety/image/upload/",data)
            // .then(res => 
            //     console.log(data)
            // )
            // .catch(err => {
            //     console.log(err)
            // })
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
                alert("Account created successfully!")
                navigation('/login')

                console.log("user id : ", res.data.data._id)
                console.log("type of user id : ", typeof (res.data.data._id))
                console.log("type of profile photo : ", typeof (profilePhoto))
                userid = res.data.data._id

            })

            console.log("========================================" + userid)

            //keya - 620dd424e608c720fa0f1be8
            //jeel - "620de87cbe1ad93e25b557c9"
            if (role === "620dd424e608c720fa0f1be8") {
                if (userid !== "") {

                    var member = {
                        age: age,
                        house: house,
                        user: userid,
                        memberName: firstName + lastName
                    }


                    await axios.post('http://localhost:4000/members/', member).then(res => {
                        console.log(res)
                        console.log("member added ")
                        //console.log("while adding in member table : ", typeof(res.data.data.user.profilePhoto))
                    })
                }
            }


        }
        console.log("submit called.....")
        //console.log(`email : ${email}, password : ${password},password2 : ${password2}, first name : ${firstName}, last name : ${lastName}`)
        //console.log(`contact number : ${contactNumber}, role : ${role}, profile photo : ${profilePhoto}`)
        //roleList.roleName
        console.log(`role : ${role}`)
        //console.log(e.target)
        // alert("Submitted successfully!")

        //clearing out the details of the form after pressing submit button
        e.target.reset()
    }
    //}

    return (
        <section id="services" className="services section-bg">

            <div className='mycard my-5 '>
                <div className="align-items-center">
                    <form className="form-horizontal" align="center" id="signIn" onSubmit={submit}>

                        <h3 className="align-title my-5"><strong>CREATE ACCOUNT</strong></h3>

                        <div className="form-row">

                            <div className="form-group col-md-2 my-3">
                                <label><strong>First Name</strong></label></div>
                            <div className="form-group col-md-3 my-3 mr-5 ">
                                <input type="text" className="form-control" name="firstName" id="FirstName"
                                    placeholder="Enter Your First Name" required onChange={(e) => { setFirstName(e.target.value) }} />
                            </div>

                            <div className="form-group col-md-0.1 my-3 mx-5">
                                <label><strong>Last Name</strong></label></div>
                            <div className="form-group col-md-3 my-3">
                                <input type="text" className="form-control" id="LastName" name="lastName"
                                    placeholder="Enter Your Last Name" required onChange={(e) => { setLastName(e.target.value) }} />
                            </div>

                        </div>


                        <div className="form-group row my-3 mr-2 mb-3">
                            <label className="col-sm-2 col-form-label"><strong>Email  </strong></label>
                            <div className="col-sm-10">
                                <input type="email" id="Email" className="form-control" name="email"
                                    placeholder="Enter Your Email" required onChange={(e) => { setEmail(e.target.value) }} />
                                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                            </div>
                        </div>

                        <div className="form-group row my-3 mr-2 mb-3">
                            <label className="col-sm-2 col-form-label"><strong>Password  </strong></label>
                            <div className="col-sm-10">
                                <input type="password" id="Password1" className="form-control" name="Password1" autoComplete="off"
                                    placeholder="Create a strong password" required
                                    onChange={(e) => { setPassword(e.target.value) }} minLength="8" />
                                <small id="passwordHelpBlock" className="form-text text-muted">
                                    Your password  MUST contain at least 8 characters.
                                    {/* ,at least one uppercase letter,at least one number and at least one special character. */}
                                </small>
                                {
                                    password.length >= 0 && password.length < 8 ? "please enter password of atleast 8 characters" : ""
                                }
                            </div>
                        </div>

                        <div className="form-group row my-3 mr-2 mb-3">
                            <label className="col-sm-2 col-form-label"><strong>Confirm Password  </strong></label>
                            <div className="col-sm-10">
                                <input type="password" id="Password2" className="form-control" name="Password2" autoComplete="off"
                                    placeholder="Re-enter password" required onChange={(e) => { setPassword2(e.target.value) }} />
                                {
                                    password2 !== password ? "Both the password should be same" : ""
                                }

                            </div>
                        </div>

                        <div className="form-group row my-3 mr-2 mb-3">
                            <label className="col-sm-2 col-form-label"><strong>Contact Number  </strong></label>
                            <div className="col-sm-10">
                                <input type="tel" id="ContactNumber" className="form-control" name="contactNumber"
                                    placeholder="Enter Your Mobile Number" required onChange={(e) => { setContactNumber(e.target.value) }} />
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
                                                <option key={role._id} value={role._id} onClick={(e) => {whichRole(e)}}>{role.roleName}</option>
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
                            </div>
                        </div>

                        <div className="form-group row my-3 mr-2 mb-3">
                            <label className="col-sm-2 col-form-label"><strong>Age </strong></label>
                            <div className="col-sm-10">
                                <input type="number" min="0" max="150" id="age" className="form-control" name="age"
                                    placeholder="Enter your age" onChange={(e => { setAge(e.target.value) })} />
                            </div>
                        </div>
                        
                        
{ showHouse==true?
                        <div className= "form-group row my-3 mr-2 mb-3">
                            <label className={ "col-sm-2 col-form-label"}><strong>House Title  </strong></label>
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
                        </div>:<div></div>}
                       

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

                        <div className="form-grp row my-3">
                            <div className="col-sm-10">
                                <input type="submit" className='btn-centre' value="Sign in" />
                            </div>
                        </div>

                        <div className="form-grp row my-3">
                            <div className="col-sm-10">
                                Already have an account?
                                <Link to="/login"> Login</Link>
                            </div>
                        </div>

                    </form>

                </div>
            </div>
        </section>
    )
}