import React from 'react'

export const SignupForm = () => {
    return (
        <div className="align-items-center">
            <form className="form-horizontal" align="center">

               <div className="form-group row my-3 mr-2 mb-3"> 
                     {/* <div className="form-group col">*/}
                        <label for="FirstName" className="col-sm-2 col-form-label"><strong>First Name : </strong></label>
                        <div className="col-sm-10">
                            <input type="text" id="FirstName" className="form-control" name="firstName" placeholder="Enter Your First Name" required />
                        </div>
                    </div>

                    {/* <div className="form-group col"> */}
                    <div className="form-group row my-3 mr-2 mb-3">
                        <label for="LastName" className="col-sm-2 col-form-label"><strong>Last Name : </strong></label>
                        <div className="col-sm-10">
                            <input type="text" id="LastName" className="form-control" name="lastName" placeholder="Enter Your Last Name" required />
                        </div>
                    </div>
                {/* </div> */}

                <div className="form-group row my-3 mr-2 mb-3">
                    <label htmlFor="Email" className="col-sm-2 col-form-label"><strong>Email : </strong></label>
                    <div className="col-sm-10">
                        <input type="email" id="Email" className="form-control" name="email" placeholder="Enter Your Email" required />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                </div>

                <div className="form-group row my-3 mr-2 mb-3">
                    <label htmlFor="Password1" className="col-sm-2 col-form-label"><strong>Password : </strong></label>
                    <div className="col-sm-10">
                        <input type="password" id="Password1" className="form-control" name="PassWord1" placeholder="Create a strong password" required />
                        <small id="passwordHelpBlock" className="form-text text-muted">
                            Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
                        </small>
                    </div>
                </div>

                <div className="form-group row my-3 mr-2 mb-3">
                    <label htmlFor="Password2" className="col-sm-2 col-form-label"><strong>Confirm Password : </strong></label>
                    <div className="col-sm-10">
                        <input type="password" id="Password2" className="form-control" name="PassWord2" placeholder="Re-enter password" required />
                    </div>
                </div>

                <div className="form-group row my-3 mr-2 mb-3">
                    <label for="contactNo" className="col-sm-2 col-form-label"><strong>Contact Number : </strong></label>
                    <div className="col-sm-10">
                        <input type="tel" id="ContactNumber" className="form-control" name="contactNumber" placeholder="Enter Your Mobile Number" required />
                    </div>
                </div>

                <div className="form-group row my-3 mr-2 mb-3">
                    <label for="role" className="col-sm-2 col-form-label"><strong>Role : </strong></label>
                    <div className="col-sm-10">
                        <select className="form-control" id="role" required>
                            <option>Admin</option>
                            <option>Society Member</option>
                            <option>Security guard</option>
                            <option>Chairman</option>
                        </select>
                    </div>
                </div>

                <div className="form-group row my-3 mr-2 mb-3">
                    <label for="profilePhoto" className="col-sm-2 col-form-label"><strong>Profile Photo : </strong></label>
                    <div className="col-sm-10">
                        <input type="file" id="ProfilePhoto" className="form-control-file" name="profilePhoto" placeholder="Upload Your Profile Photo" />
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


            </form>

        </div>
    )
}
