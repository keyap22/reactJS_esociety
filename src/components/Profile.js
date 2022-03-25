import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export const Profile = () => {
    const [email, setemail] = useState('')
    const [role, setRole] = useState('')
    const [roleName, setRoleName] = useState('')
    const [counter , setCounter] = useState(0)
    //const [guard, setGuard] = useState('')
    //const [guardAttendanceList, setGuardAttendanceList] = useState()

    var isLogin = false

    const navigation = useNavigate()
    var guardID=""
    var guardAttendanceList = []

    useEffect(() => {
        setemail(localStorage.getItem('email'))
        setRole(localStorage.getItem('role'))
        guardID =  localStorage.getItem('guardID');
        console.log("guardid in profile :" +guardID)
        setRoleName(localStorage.getItem('roleName'))
        getRoleByID()
        getGuardAttendances()
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
        localStorage.removeItem('roleName')
        getGuardAttendances()
        navigation('/login')
    }
   
   
    const getGuardAttendances = () => {

        axios.get(`http://localhost:4000/guardAttendances/` ).then(res => {
            console.log("get guard attendances response : "+res.data.data)
            guardAttendanceList = res.data.data
            //console.log("guard id via response : ", res.data.data.guard)
            console.log("guard id via local storage : ", guardID)
            console.log("guard attendance list : ", guardAttendanceList)
             countAttendance()
        })
    }

    const countAttendance=()=>{

guardAttendanceList.forEach(attendance => {
    console.log("attendance guard : ",attendance.guard._id)
    if (attendance.guard._id === guardID) {
        setCounter(counter+1)
           }
           
});

    
    }

    return (
        <div>
            {
                email ? <h1>Hello <br /> {email}<br /> {roleName}</h1> : <h1>Please login first</h1>
            }
            {
                email ? isLogin = true : isLogin = false
            }


            <input type="button" className={isLogin ? 'btn btn-primary mx-3' : "btn btn-primary mx-3 hidden"} value="Logout" onClick={logout} />
            {
                role === "620c88535e051978662b0379" ? <h2>Security guard attendance - {counter}</h2> : ""
            }
        </div>
    )
}