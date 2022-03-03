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
            <form>
                <div className="mb-3 mt-3">
                    <label for="email" className="form-label">Email:</label>
                    <input type="email" className="form-control" id="email" placeholder="Enter email" name="email" required onChange={(e) => { emailHandler(e) }} />
                </div>
                <div className="mb-3">
                    <label for="pwd" className="form-label">Password:</label>
                    <input type="password" className="form-control" id="password" placeholder="Enter password" name="password" required onChange={(e) => { passwordHandler(e) }} />
                </div>
                <div className="form-check mb-3">
                    <label className="form-check-label">
                        <input className="form-check-input" type="checkbox" name="remember" /> Remember me
                    </label>
                </div>
                <button type="submit" className='btn-centre' >Login</button>
            </form>
        </div>
    )
}
