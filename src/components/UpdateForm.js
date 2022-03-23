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
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [contactNumber, setContactNumber] = useState('')
    const [role, setRole] = useState('')
    const [profilePhoto, setProfilePhoto] = useState('')
    const [age, setAge] = useState('')
    const [house, setHouse] = useState()

    const [roleList, setroleList] = useState([])
    const [houseList, sethouseList] = useState([])
    const [userList, setuserList] = useState([])
    const [memberList, setmemberList] = useState([])
    const [roleById, setRoleById] = useState([])
    const [houseById, setHouseById] = useState([])

    var finalemail, finalfn, finalln, finalage, finalmob;

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

    const passwordHandler = (e) => {
        //console.log(e.target.value)
        setPassword(e.target.value)
    }

    const confirmpasswordHandler = (e) => {
        //console.log(e.target.value)
        setPassword2(e.target.value)
    }

    const profilePhotoHandler = (e) => {
        //console.log(e.target.value)
        //setProfilePhoto(e.target.files[0])
        setProfilePhoto(e.target.value)
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

    const submit = (e) => {
        e.preventDefault()
        if (password !== password2) {
            alert("Please enter same password in both the fields!")
        }
        else {
            finalmob = contactNumber === "" ? userList.mobileNo : contactNumber
            finalemail = email === "" ? userList.email : email
            finalfn = firstName === "" ? userList.firstName : firstName
            finalage = age === "" ? memberList.age : age
            finalln = lastName === "" ? userList.lastName : lastName

            var user = {
                email: finalemail,
                //password: password,
                mobileNo: finalmob,
                firstName: finalfn,
                lastName: finalln,
                //role: role,
                //profilePhoto: profilePhoto
            }

            var member = {
                age: finalage,
                //house: house,
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
        }
        console.log("submit called.....")
        console.log(`email : ${finalemail}, password : ${password},password2 : ${password2}, first name : ${finalfn}, last name : ${finalln}`)
        console.log(`contact number : ${finalmob}, role : ${role}, profile photo : ${profilePhoto}`)
        console.log(`role : ${role}`)
        //console.log(e.target)
        alert("Updated successfully!")
        navigation('/listmembers')

        //clearing out the details of the form after pressing submit button
        e.target.reset()
    }
    //}

    return (
        <section id="services" className="services section-bg">

            <div className='mycard my-5 '>
                <div className="align-items-center">
                    <form className="form-horizontal" align="center" id="signIn" style={{height : "500px"}} onSubmit={submit}>

                        <h3 className="align-title my-5"><strong>UPDATE DETAILS</strong></h3>

                        <div className="form-row">

                            <div className="form-group col-md-2 my-3">
                                <label><strong>First Name</strong></label></div>
                            <div className="form-group col-md-3 my-3 mr-5 ">
                                <input type="text" className="form-control" name="firstName" id="FirstName" defaultValue={userList.firstName}
                                    placeholder="Enter Your First Name" required onChange={(e) => { setFirstName(e.target.value) }} />
                            </div>

                            <div className="form-group col-md-0.1 my-3 mx-5">
                                <label><strong>Last Name</strong></label></div>
                            <div className="form-group col-md-3 my-3">
                                <input type="text" className="form-control" id="LastName" name="lastName" defaultValue={userList.lastName}
                                    placeholder="Enter Your Last Name" required onChange={(e) => { setLastName(e.target.value) }} />
                            </div>

                        </div>


                        <div className="form-group row my-3 mr-2 mb-3">
                            <label className="col-sm-2 col-form-label"><strong>Email  </strong></label>
                            <div className="col-sm-10">
                                <input type="email" id="Email" className="form-control" name="email" defaultValue={userList.email}
                                    placeholder="Enter Your Email" required onChange={(e) => { setEmail(e.target.value) }} />
                                {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                            </div>
                        </div>

                        {/* <div className="form-group row my-3 mr-2 mb-3">
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
                        </div> */}

                        <div className="form-group row my-3 mr-2 mb-3">
                            <label className="col-sm-2 col-form-label"><strong>Contact Number  </strong></label>
                            <div className="col-sm-10">
                                <input type="tel" id="ContactNumber" className="form-control" name="contactNumber" defaultValue={userList.mobileNo}
                                    placeholder="Enter Your Mobile Number" required onChange={(e) => { e = null ? setContactNumber(userList.mobileNo) : setContactNumber(e.target.value) }} />
                            </div>
                        </div>

                        {/* <div className="form-group row my-3 mr-2 mb-3">
                            <label className="col-sm-2 col-form-label"><strong>Role  </strong></label>
                            <div className="col-sm-10">
                                <select className="form-select" id="role" required  onClick={(e) => { displayRole(e) }} onChange={(e) => { setRole(e.target.value) }}>
                                    <option  value={roleById._id}>{roleById.roleName}</option>
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
                            </div>
                        </div> */}

                        <div className="form-group row my-3 mr-2 mb-3">
                            <label className="col-sm-2 col-form-label"><strong>Age </strong></label>
                            <div className="col-sm-10">
                                <input type="number" min="0" max="150" id="age" className="form-control" name="age" defaultValue={memberList.age}
                                    placeholder="Enter your age" onChange={(e => { setAge(e.target.value) })} />
                            </div>
                        </div>

                        {/* <div className="form-group row my-3 mr-2 mb-3">
                            <label className="col-sm-2 col-form-label"><strong>House Title  </strong></label>
                            <div className="col-sm-10">
                                <select className="form-select" id="house" required defaultValue={houseById.houseTitle} onClick={(e) => { displayHouse(e) }} onChange={(e) => { setHouse(e.target.value) }}>
                                    <option value={houseById._id}>{houseById.houseTitle}</option>
                                    {
                                        houseList.map((house) => {

                                            return (
                                                <option key={house._id} value={house._id}>{house.houseTitle}</option>
                                            )
                                        })
                                    }
                                </select>

                            </div>
                        </div> */}

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

                        <div className="form-grp row my-5" style={{marginLeft:"150px"}}>
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