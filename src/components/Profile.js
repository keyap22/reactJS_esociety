import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const Profile = () => {
    const[email,setemail]=useState('')

    const navigation = useNavigate()

    useEffect(()=>{
        setemail(localStorage.getItem('email'))
    }, [])

    const logout =(e) =>{
        e.preventDefault()
        localStorage.removeItem('email') 
        navigation('/login')
    }
  return (
    <div>
        {
            email ? <h1>{email}</h1> :<h1>Please login first</h1>
        }
        <input type="button" className="btn btn-primary mx-3" value="Logout" onClick={logout} />
 
        </div>
  )
}
