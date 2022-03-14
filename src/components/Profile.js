import React, { useEffect, useState } from 'react'

export const Profile = () => {
    const[email,setemail]=useState('')

    useEffect(()=>{
        setemail(localStorage.getItem('email'))
    }, [])

    const logout =() =>{
        localStorage.removeItem('email')   
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
