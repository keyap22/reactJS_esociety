import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router'
import { useNavigate } from 'react-router-dom'

export const UpdateForm = () => {
    var memberId = useParams().id2;
    var userId = useParams().id1;

    const navigation = useNavigate()

    useEffect(() => {

        getMemberById()
        getUserById()


    }, [userId, memberId])


    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [contactNumber, setContactNumber] = useState('')
    const [role, setRole] = useState('')
    const [profilePhoto, setProfilePhoto] = useState('')
    const [age, setAge] = useState('')
    const [house, setHouse] = useState()
    var [validEmail, setValidEmail] = useState(false)


    const [roleList, setroleList] = useState([])
    const [houseList, sethouseList] = useState([])
    const [userList, setuserList] = useState([])
    const [memberList, setmemberList] = useState([])
    const [roleById, setRoleById] = useState([])
    const [houseById, setHouseById] = useState([])
    var [emailError, setEmailError] = useState(false);

  
    const validMail = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+(?=.)+(?=.[a-zA-Z]$)');


    var finalemail, finalfn, finalln, finalage, finalmob,finalrole="",finalhouse="";

    //if new user is trying to sign in using mail id used by existing user, then validEmail=false
    const findUserByEmail = (email) => {
        var formdata = {
            email: email
        }
        console.log("email before post request :", email)
        axios.post("http://localhost:4000/forgotpwd/", formdata).then(res => {
            if (res.data.data !== null) {
                console.log("User with same email found successfully!")
                console.log("response : ", res)
                //console.log("user id :", res.data.data._id)
                //userID = res.data.data._id
                setValidEmail(false)
                console.log("valid email value : ", validEmail)
            }
        })
        console.log("valid email value : ", validEmail)
        setValidEmail(true)
    }


    //add id 
    const getUserById = () => {
        axios.get("http://localhost:4000/users/" + userId).then(res => {
            console.log(res.data.data)
            setuserList(res.data.data)
        })
        getRoleById()
        console.log("============================================" + roleById.roleName)

    }

    //add id in url
    const getMemberById = () => {
        axios.get("http://localhost:4000/members/" + memberId).then(res => {
            console.log(res.data.data)
            setmemberList(res.data.data)
            getHouseById()
        })
    }

    const profilePhotoHandler = (e) => {
        //console.log(e.target.value)
        setProfilePhoto(e.target.files[0].name)
        //setProfilePhoto(e.target.value)
    }

    const getRoleById = () => {
        //console.log(userList.role)
        axios.get("http://localhost:4000/roles/" + userList.role).then(res => {
            //console.log(res.data.data)
            setRoleById(res.data.data)
        })
    }
    const getHouseById = () => {
        axios.get("http://localhost:4000/houses/" + memberList.house).then(res => {
            //console.log(res.data.data)
            setHouseById(res.data.data)
        })
    }

    const displayRole = () => {
        axios.get("http://localhost:4000/roles/").then(res => {
            //console.log(res.data.data)
            setroleList(res.data.data)
        })
    }

    const displayHouse = () => {
        axios.get("http://localhost:4000/houses/").then(res => {
            //console.log(res.data.data)
            sethouseList(res.data.data)
        })
    }

    const emailHandler = (e) => {
        if (!validMail.test(e.target.value)) {
            setEmailError(true);
         }
         else{
            setEmailError(false);
             setEmail(e.target.value)  
        findUserByEmail(e.target.value)
   
         }
        
         }

    const submit = (e) => {
        e.preventDefault()
        if(email!=null )
        {
            if (validEmail === false )
                alert("Please consider validation messages and enter details accordingly!")
      


        }
        else if(firstName!==null ){
            if(firstName.length <= 1 )
                alert("Please consider validation messages and enter details accordingly!")
      

        }
        else if(lastName!==null)
        {
            if(lastName.length <= 2)
                alert("Please consider validation messages and enter details accordingly!")
      
        }
        else {
            finalmob = contactNumber === "" ? userList.mobileNo : contactNumber
            finalemail = email === "" ? userList.email : email
            finalfn = firstName === "" ? userList.firstName : firstName
            finalage = age === "" ? memberList.age : age
            finalln = lastName === "" ? userList.lastName : lastName
            finalrole = role ==="" ? userList.role : role
            finalhouse = house==="" ? memberList.house : house

            var user = {
                email: finalemail,
                password: userList.password,
                mobileNo: finalmob,
                firstName: finalfn,
                lastName: finalln,
                role: finalrole,
                profilePhoto: profilePhoto
            }

            var member = {
                age: finalage,
                house: finalhouse,
                user: userId,
                memberName: finalfn + finalln
            }

            axios.put(`http://localhost:4000/users/` + userId, user).then(res => {
                console.log(res.status)
                console.log("user updation status :", res.data.data)
            })

            //keya - 620dd424e608c720fa0f1be8
            //jeel - 62333e880323d0522ef16c63
            if (role === "620dd424e608c720fa0f1be8") {

                axios.put(`http://localhost:4000/members/` + memberId, member).then(res => {
                    console.log("member response : ", res)
                })
            }

            console.log("submit called.....")
            console.log(`email : ${finalemail}, first name : ${finalfn}, last name : ${finalln}`)
            console.log(`contact number : ${finalmob}, role : ${role}, profile photo : ${profilePhoto}`)
            console.log(`role : ${finalrole}`)
            console.log(`house : ${finalhouse}`)
            //console.log(e.target)
            alert("Updated successfully!")
            navigation('/listmembers')

            //clearing out the details of the form after pressing submit button
            e.target.reset()
        }
    }

    return (
        <section id="services" className="services section-bg">

            <div className='mycard my-5 '>
                <div className="align-items-center">
                    <form className="form-horizontal" align="center" id="signIn" style={{ height: "800px" }} onSubmit={submit}>

                        <h3 className="align-title my-5"><strong>UPDATE DETAILS</strong></h3>

                        <div className="form-row">

                            <div className="form-group col-md-2 my-3">
                                <label><strong>First Name</strong></label></div>
                            <div className="form-group col-md-3 my-3 mr-5 ">
                                <input type="text" className="form-control" name="firstName" id="FirstName" defaultValue={userList.firstName}
                                    placeholder="Enter Your First Name"  onChange={(e) => { setFirstName(e.target.value) }} />
                                {
                                    firstName.length <= 1 && firstName.length > 0 ? "please enter valid first name" : ""
                                }
                            </div>

                            <div className="form-group col-md-0.1 my-3 mx-5">
                                <label><strong>Last Name</strong></label></div>
                            <div className="form-group col-md-3 my-3">
                                <input type="text" className="form-control" id="LastName" name="lastName" defaultValue={userList.lastName}
                                    placeholder="Enter Your Last Name"  onChange={(e) => { setLastName(e.target.value) }} />
                                {
                                    lastName.length <= 2 && lastName.length > 0 ? "please enter valid last name" : ""
                                }
                            </div>

                        </div>


                        <div className="form-group row my-3 mr-2 mb-3">
                            <label className="col-sm-2 col-form-label"><strong>Email  </strong></label>
                            <div className="col-sm-10">
                                <input type="email" id="Email" className="form-control" name="email" defaultValue={userList.email}
                                    placeholder="Enter Your Email"  onChange={(e) => { emailHandler(e) }} />
                                {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                                {
                                    validEmail ? "" : "please enter different mail id"
                                }
                                  {emailError && <p>Your email is invalid</p>}

                            </div>
                        </div>


                        <div className="form-group row my-3 mr-2 mb-3">
                            <label className="col-sm-2 col-form-label"><strong>Contact Number  </strong></label>
                            <div className="col-sm-10">
                                <input type="tel" id="ContactNumber" className="form-control" name="contactNumber" defaultValue={userList.mobileNo}
                                    placeholder="Enter Your Mobile Number"  onChange={(e) => { e = null ? setContactNumber(userList.mobileNo) : setContactNumber(e.target.value) }} />
                            </div>
                        </div>

                        <div className="form-group row my-3 mr-2 mb-3">
                            <label className="col-sm-2 col-form-label"><strong>Role  </strong></label>
                            <div className="col-sm-10">
                                <select className="form-select" id="role"  onClick={(e) => { displayRole(e) }} onChange={(e) => { setRole(e.target.value) }}>
                                    <option>Please Select</option>
                                    {
                                        roleList.map((role) => {

                                            return (
                                                <option key={role._id} value={role._id}>{role.roleName}</option>
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
                                    profilePhoto.includes(".png") || profilePhoto.includes(".jpg") || profilePhoto.includes(".jpeg") ? "" : "Please enter valid image"
                                }
                            </div>
                        </div>

                        <div className="form-group row my-3 mr-2 mb-3">
                            <label className="col-sm-2 col-form-label"><strong>Age </strong></label>
                            <div className="col-sm-10">
                                <input type="number" min="0" max="150" id="age" className="form-control" name="age" defaultValue={memberList.age}
                                    placeholder="Enter your age" onChange={(e => { setAge(e.target.value) })} />
                            </div>
                        </div>

                        <div className="form-group row my-3 mr-2 mb-3">
                            <label className="col-sm-2 col-form-label"><strong>House Title  </strong></label>
                            <div className="col-sm-10">
                                <select className="form-select" id="house"   onClick={(e) => { displayHouse(e) }} onChange={(e) => { setHouse(e.target.value) }}>
                                    <option >Please Select</option>
                                    {
                                        houseList.map((house) => {

                                            return (
                                                <option key={house._id} value={house._id}>{house.houseTitle}</option>
                                            )
                                        })
                                    }
                                </select>

                            </div>
                        </div>

                        {/* <div className="form-group my-3">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="invalidCheck" required />
                                <label className="form-check-label">
                                    Agree to terms and conditions
                                </label>
                                <div className="invalid-feedback">
                                    You must agree before submitting.
                                </div>
                            </div>
                        </div> */}

                        <div className="form-grp row my-5" style={{ marginLeft: "150px" }}>
                            <div className="col-sm-10">
                                <input type="submit" className='btn-centre' value="Update" />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}