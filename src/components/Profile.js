import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export const Profile = () => {

    var Counter = 0

    const [email, setemail] = useState('')
    const [role, setRole] = useState('')
    const [roleName, setRoleName] = useState('')
    var [counter, setCounter] = useState(0)
    var addattendance
    //const [guard, setGuard] = useState('')
    const [GuardAttendanceList, setGuardAttendanceList] = useState()
    var guardAttendanceList = []

    var currentdate = new Date();
    var date = currentdate.getDate() + "/" + (currentdate.getMonth() + 1) + "/" + currentdate.getFullYear()


    var isLogin = false

    const navigation = useNavigate()
    var guardID = ""
    var guardAttendanceList = []

    useEffect(() => {
        setemail(localStorage.getItem('email'))
        setRole(localStorage.getItem('role'))
        guardID = localStorage.getItem('guardID');
        console.log("guardid in profile :" + guardID)
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

        axios.get(`http://localhost:4000/guardAttendances/`).then(res => {
            console.log("get guard attendances response : " + res)
            guardAttendanceList = res.data.data
            setGuardAttendanceList(guardAttendanceList)
            //console.log("guard id via response : ", res.data.data.guard)
            console.log("guard id via local storage : ", guardID)
            console.log("guard attendance list : ", guardAttendanceList)
            countAttendance()
        })
    }

    const countAttendance = () => {

        guardAttendanceList.forEach(attendance => {

            if (attendance.guard._id === localStorage.getItem("guardID")) {

                console.log("attendance guard : ", attendance.guard._id)
                Counter = Counter + 1
                console.log("Counter : ", Counter)
                console.log("counter value incremented")
                setCounter(Counter)
            }

        });
    }

    const AddAttendance = () => {

        GuardAttendanceList.forEach(attendance => {
            console.log("in for each")

            if (attendance.guard._id === localStorage.getItem("guardID")) {

                console.log("attendance guard id : ", attendance.guard._id)
                console.log("date from get all attendances", attendance.date)
                console.log("datatype of date : ", typeof (attendance.date))
                console.log("datatype of current date : ", typeof (date.toString()))
                if (attendance.date === date.toString()) {
                    addattendance = false
                    console.log("addAttendance in forEach : ", addattendance)

                }
                else {
                    addattendance = true

                }
            }

        });
        console.log("add attendance value : ", addattendance)
        if ((localStorage.getItem("guardID") !== "") && addattendance === true) {
            console.log("above if statement of get guard attendances")

            console.log("addAttendance value===============> :" + addattendance)
            console.log(localStorage.getItem("guardID") !== "")

            var GuardAttendances = {
                isPresent: 'true',
                guard: localStorage.getItem("guardID"),
                date: date
            }
            console.log("before post, guard id : ", localStorage.getItem("guardID"))
            axios.post('http://localhost:4000/guardAttendances/', GuardAttendances).then(res => {
                console.log("attendance response : ", res)

                console.log("guard attendances : ", GuardAttendances)
                console.log("in post guard id : ", GuardAttendances.guard)
            })
        }

    }

    return (
        <div>
            {
                email ? <h1>Hello <br /> {email}<br /> {roleName}</h1> : <h1>Please login first</h1>
            }
            {
                email ? isLogin = true : isLogin = false
            }
            {
                role==="620dda4cbaf661b44817ee63" ? <h2>Hello, Chairman</h2> : ""
            }
            {
                role === "620c88535e051978662b0379" ? <h2>Security guard attendance - {counter}</h2> : ""
            }
            {
                role === "620c88535e051978662b0379" ? <input type="button" className='btn btn-warning mx-3' value="Add Attendance" onClick={AddAttendance} /> : ""
            }
            <input type="button" className={isLogin ? 'btn btn-primary mx-3' : "btn btn-primary mx-3 hidden"} value="Logout" onClick={logout} />
        </div>
    )
}