import React from 'react'

export const SignupForm = () => {
    return (
        <div>
            <form className="form-center">

                <div className="form-group row">
                    <label for="FirstName" className="col-sm-2 col-form-label"><strong>First Name : </strong></label>
                    <div className="col-sm-10">
                        <input type="text" id="FirstName" className="form-control" name="firstName" placeholder="Enter Your First Name" required />
                    </div>
                </div>

                <div className="form-group row">
                    <label htmlFor="Email" className="col-sm-2 col-form-label"><strong>Email : </strong></label>
                    <div className="col-sm-10">
                        <input type="email" id="Email" className="form-control" name="email" placeholder="Enter Your Email" required />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                </div>

                <div className="form-group row">
                    <label htmlFor="Password1" className="col-sm-2 col-form-label"><strong>Password : </strong></label>
                    <div className="col-sm-10">
                        <input type="password" id="Password1" className="form-control" name="PassWord1" placeholder="Create a strong password" required />
                        <small id="passwordHelpBlock" className="form-text text-muted">
                            Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
                        </small>
                    </div>
                </div>

                <div className="form-group row">
                    <label htmlFor="Password2" className="col-sm-2 col-form-label"><strong>Confirm Password : </strong></label>
                    <div className="col-sm-10">
                        <input type="password" id="Password2" className="form-control" name="PassWord2" placeholder="Re-enter password" required />
                    </div>
                </div>

                <div className="form-group">
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

                <div className="form-group row" >
                    <div className="col-sm-10">
                        <input type="submit" className='btn-centre' value="Sign in" />
                    </div>
                </div>


            </form>

        </div>
    )
}
