import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export const Profile = () => {
    const [email, setemail] = useState('')
    const [role, setRole] = useState('')
    const [roleName, setRoleName] = useState('')

    var isLogin=false

    const navigation = useNavigate()

    useEffect(() => {
        setemail(localStorage.getItem('email'))
        setRole(localStorage.getItem('role'))
        getRoleByID()
    }, [])

    const getRoleByID = () => {
        var id = role
        axios.get(`http://localhost:4000/roles/` + id).then(res => {
            console.log("response in profile :", res)
            console.log("role name in profile :", res.data.data.roleName)
            setRoleName(res.data.data.roleName)
        })
    }

    const logout = (e) => {
        e.preventDefault()
        localStorage.removeItem('email')
        localStorage.removeItem('role')
        navigation('/login')
    }

    return (
        <div>
            {
                email ? <h1>Hello <br/> {email}<br /> {roleName}</h1> : <h1>Please login first</h1>
            }
            {
                email ? isLogin = true : isLogin = false
            }
            
            <input type="button" className={isLogin? 'btn btn-primary mx-3' : "btn btn-primary mx-3 hidden"} value="Logout" onClick={logout}/>        
          
        </div>
    )
}