import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export const Profile = () => {
    const [email, setemail] = useState('')
    const [role, setRole] = useState('')
    const [roleName, setRoleName] = useState('')
    //const [guard, setGuard] = useState('')
    //const [guardAttendanceList, setGuardAttendanceList] = useState()

    var isLogin = false

    const navigation = useNavigate()
    var guard
    var guardAttendanceList = []

    useEffect(() => {
        setemail(localStorage.getItem('email'))
        setRole(localStorage.getItem('role'))
        guard =  localStorage.getItem('guardID');
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
    var counter = 0
    //var guard = localStorage.getItem('guardID')
    const getGuardAttendances = () => {

        axios.get('http://localhost:4000/guardAttendances/').then(res => {
            console.log("get guard attendances response : ",res.data.data)
            guardAttendanceList = res.data.data
            //console.log("guard id via response : ", res.data.data.guard)
            console.log("guard id via local storage : ", localStorage.getItem('guardID'))
            console.log("guard attendance list : ", guardAttendanceList)
            countAttendance()
        })
    }

    function countAttendance(){
        guardAttendanceList.map((attendance) => {
            console.log("in map")
            console.log("attendance guard : ",attendance.guard)
            console.log("guard : ",guard)
            if (attendance.guard === guard) {
                counter += 1
                console.log("counter : ",counter)
            }
       })
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