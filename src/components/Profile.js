import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const Profile = () => {
    const[email,setemail]=useState('')
    const[role,setRole]=useState('')

    const navigation = useNavigate()

    useEffect(()=>{
        setemail(localStorage.getItem('email'))
        setRole(localStorage.getItem('role'))
    }, [])

    const logout =(e) =>{
        e.preventDefault()
        localStorage.removeItem('email') 
        localStorage.removeItem('role')
        navigation('/login')
    }
  return (
    <div>
        {
            email ? <h1>{email}<br />Hello {role}</h1> :<h1>Please login first</h1>

        }
        <input type="button" className="btn btn-primary mx-3" value="Logout" onClick={logout} />
 
        </div>
  )
}
