import React from 'react'
import { useState } from 'react'
import {Link} from 'react-router-dom'

export const SignupForm = () => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [contactNumber, setContactNumber] = useState('')
    const [role, setRole] = useState('')
    const [profilePhoto, setProfilePhoto] = useState('')

    const firstNameHandler = (e) => {
        console.log(e.target.value)
        setFirstName(e.target.value)
    }

    const lastNameHandler = (e) => {
        console.log(e.target.value)
        setLastName(e.target.value)
    }

    const emailHandler = (e) => {
        console.log(e.target.value)
        setEmail(e.target.value)
    }



    const passwordHandler = (e) => {

        console.log(e.target.value)
        setPassword(e.target.value)

    }
    const confirmpasswordHandler = (e) => {

        console.log(e.target.value)
        setPassword2(e.target.value)

    }

    const contactNumberHandler = (e) => {
        console.log(e.target.value)
        setContactNumber(e.target.value)
    }

    const roleHandler = (e) => {
        console.log(e.target.value)
        setRole(e.target.value)
    }

    const profilePhotoHandler = (e) => {
        console.log(e.target.value)
        setProfilePhoto(e.target.value)
    }

    const submit = (e) => {
        e.preventDefault()
        if (password !== password2) {
            alert("Please enter same password in both the fields!")

        }
        else {
            alert("Submitted successfully!")

        }

        console.log("submit called.....")
        console.log(`email : ${email}, password : ${password},password2 : ${password2}, first name : ${firstName}, last name : ${lastName}`)
        console.log(`contact number : ${contactNumber}, role : ${role}, profile photo : ${profilePhoto}`)
    }

    return (
        <div className='mycard my-5 '>
        <div className="align-items-center">
            <form className="form-horizontal" align="center" onSubmit={submit}>

                <h3 className="align-title my-5"><strong>CREATE ACCOUNT</strong></h3>

                <div class="form-row">
                    
                    <div class="form-group col-md-2 my-3">
                        <label for="firstName"><strong>First Name</strong></label></div>
                    <div class="form-group col-md-3 my-3 mr-5 ">
                        <input type="text" class="form-control" name="firstName" id="FirstName"
                            placeholder="Enter Your First Name" required onChange={(e) => { firstNameHandler(e) }} />
                    </div>

                    <div class="form-group col-md-0.1 my-3 mx-5">
                        <label for="lastName"><strong>Last Name</strong></label></div>
                    <div class="form-group col-md-3 my-3">
                        <input type="LastName" class="form-control" id="LastName" name="firstName"
                            placeholder="Enter Your Last Name" required onChange={(e) => { lastNameHandler(e) }} />
                    </div>

                </div>

               
                <div className="form-group row my-3 mr-2 mb-3">
                    <label htmlFor="Email" className="col-sm-2 col-form-label"><strong>Email  </strong></label>
                    <div className="col-sm-10">
                        <input type="email" id="Email" className="form-control" name="email"
                            placeholder="Enter Your Email" required onChange={(e) => { emailHandler(e) }} />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                </div>

                <div className="form-group row my-3 mr-2 mb-3">
                    <label htmlFor="Password1" className="col-sm-2 col-form-label"><strong>Password  </strong></label>
                    <div className="col-sm-10">
                        <input type="password" id="Password1" className="form-control" name="Password1"
                            placeholder="Create a strong password" required onChange={(e) => { passwordHandler(e) }} />
                        <small id="passwordHelpBlock" className="form-text text-muted">
                            Your password  MUST contain at least 8 characters,at least one uppercase letter,at least one number and at least one special character.
                        </small>
                    </div>
                </div>

                <div className="form-group row my-3 mr-2 mb-3">
                    <label htmlFor="Password2" className="col-sm-2 col-form-label"><strong>Confirm Password  </strong></label>
                    <div className="col-sm-10">
                        <input type="password" id="Password2" className="form-control" name="Password2" placeholder="Re-enter password" required onChange={(e) => { confirmpasswordHandler(e) }} />
                    </div>
                </div>

                <div className="form-group row my-3 mr-2 mb-3">
                    <label for="contactNo" className="col-sm-2 col-form-label"><strong>Contact Number  </strong></label>
                    <div className="col-sm-10">
                        <input type="tel" id="ContactNumber" className="form-control" name="contactNumber"
                            placeholder="Enter Your Mobile Number" required onChange={(e) => { contactNumberHandler(e) }} />
                    </div>
                </div>

                <div className="form-group row my-3 mr-2 mb-3">
                    <label for="role" className="col-sm-2 col-form-label"><strong>Role  </strong></label>
                    <div className="col-sm-10">
                        <select className="form-select" id="role" required onChange={(e) => { roleHandler(e) }}>
                            <option selected>Select your role</option>
                            <option value="1">Admin</option>
                            <option value="2">Society Member</option>
                            <option value="3">Security guard</option>
                            <option value="4">Chairman</option>
                        </select>
                    </div>
                </div>

                <div className="form-group row my-3 mr-2 mb-3">
                    <label for="profilePhoto" className="col-sm-2 col-form-label"><strong>Profile Photo  </strong></label>
                    <div className="col-sm-10">
                        <input type="file" id="ProfilePhoto" className="form-control-file" name="profilePhoto"
                            placeholder="Upload Your Profile Photo" onChange={(e) => { profilePhotoHandler(e) }} />
                    </div>
                </div>

                <div className="form-group my-3">
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="invalidCheck" required />
                        <label className="form-check-label" htmlFor="invalidCheck">
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
                        Already a User?
                <Link to="/login"> Login</Link>
                    </div>
                </div>

            </form>

        </div>
        </div>
    )
}