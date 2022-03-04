import React from 'react'
import { useState } from 'react'

export const LoginForm = () => {
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')

    const emailHandler = (e) => {

        console.log(e.target.value)
        setemail(e.target.value)
    }

    const passwordHandler = (e) => {

        setpassword(e.target.value)

    }
    const submit = (e) => {

        e.preventDefault()
        alert("email: " + email)
        console.log("submit called.....")
    }
    return (
        <div className="form-center">

            <form className="login-form" align="center" onSubmit={submit}>

                {/* <div className="form-group row mb-3 mt-3">
                    <label for="email" className="col-form-label"><strong>Email : </strong></label>
                    <div className="col-sm-10">
                        <input type="email" className="form-control" id="email" placeholder="Enter email" name="email"
                            required onChange={(e) => { emailHandler(e) }} />
                    </div>
                </div>

                <div className="form-group row mb-3">
                    <label for="pwd" className="col-form-label"><strong> Password : </strong></label>
                    <div className="col-sm-10">
                        <input type="password" className="form-control" id="password" placeholder="Enter password"
                            name="password" required onChange={(e) => { passwordHandler(e) }} />
                    </div>
                </div> */}

                <div className="form-group row my-3 mr-2 mb-3">
                    <label htmlFor="Email" className="col-sm-2 col-form-label"><strong>Email  </strong></label>
                    <div className="col-sm-10">
                        <input type="email" id="Email" className="form-control" name="email"
                            placeholder="Enter Your Email" required onChange={(e) => { emailHandler(e) }} />
                    </div>
                </div>

                <div className="form-group row my-3 mr-2 mb-3">
                    <label htmlFor="Password1" className="col-sm-2 col-form-label"><strong>Password  </strong></label>
                    <div className="col-sm-10">
                        <input type="password" id="Password1" className="form-control" name="Password1"
                            placeholder="Enter your password" required onChange={(e) => { passwordHandler(e) }} />
                    </div>
                </div>


                <div className="form-group form-check mb-3">
                    <label className="form-check-label">
                        <input className="form-check-input" type="checkbox" name="remember" /> Remember me
                    </label>
                </div>

                <input type="submit" className='btn-centre' value="Login" />

            </form>
        </div>
    )
}