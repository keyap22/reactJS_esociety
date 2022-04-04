import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export const Profile = () => {

    var Counter = 0

    const [email, setemail] = useState('')
    const [role, setRole] = useState('')
    const [roleName, setRoleName] = useState('')
    const [user, setUser] = useState('')
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
    var userid = ''
    var User = ""

    useEffect(() => {
        setemail(localStorage.getItem('email'))
        setRole(localStorage.getItem('role'))
        guardID = localStorage.getItem('guardID');
        console.log("guardid in profile :" + guardID)
        setRoleName(localStorage.getItem('roleName'))
        getRoleByID()
        getGuardAttendances()
        userid = localStorage.getItem("userid")
        console.log("userid in profile :" + userid)
        getUserById()
    }, [])

    const getRoleByID = async () => {
        var id = role
        await axios.get(`http://localhost:4000/roles/` + id).then(res => {
            console.log("response in profile :", res)
            console.log("role name in profile :", res.data.data.roleName)
            setRoleName(res.data.data.roleName)
        })
    }

    const getUserById = async () => {
        //var id = "622740a09d7544ebc551ba15";
        console.log("userid in getuserbyid :" + userid)
        await axios.get('http://localhost:4000/users/' + userid).then(res => {
            console.log("user by id response : ", res)
            User = res.data.data
            setUser(User)
            console.log("user data : ", res.data.data)
            console.log("user : ", user)
            console.log("User : ", User)
        })
    }

    const logout = (e) => {
        e.preventDefault()
        localStorage.removeItem('email')
        localStorage.removeItem('role')
        localStorage.removeItem('roleName')
        localStorage.removeItem('userid')
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
        <section id="services" className="services section-bg">

            <div>
                {
                    email ? "" : <h1>Please login first</h1>
                }
                {
                    email ? isLogin = true : isLogin = false
                }
                {
                    role === "620dda4cbaf661b44817ee63" ? <h2>Hello, Chairman</h2> : ""
                }
                {
                    role === "620c88535e051978662b0379" ? <h2>Security guard attendance - {counter}</h2> : ""
                }
                {
                    role === "620c88535e051978662b0379" ? <input type="button" className='btn btn-warning mx-3' value="Add Attendance" onClick={AddAttendance} /> : ""
                }
                
            </div>

            <div className="container emp-profile">
                <form method="post">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="profile-img">
                                <img src={user.profilePhoto} alt="" />
                                <div className="file btn btn-lg btn-primary">
                                    Change Photo
                    <input type="file" name="file" />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="profile-head">
                                <h5>
                                    {user.firstName + " " + user.lastName}
                                </h5>
                                <h6>
                                    Role name
                                    {/* {user.role._id} */}
                                </h6>
                                {/* <p className="proile-rating">RANKINGS : <span>8/10</span></p> */}
                                <ul className="nav nav-tabs" id="myTab" role="tablist">
                                    <li className="nav-item">
                                        <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">About</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Timeline</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <input type="submit" className="profile-edit-btn" name="btnAddMore" value="Edit Profile" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <div className="profile-work">
                            <input type="button" className={isLogin ? 'btn btn-primary' : "btn btn-primary hidden"} value="Logout" onClick={logout} />
                                {/* <p>WORK LINK</p>
                                <a href="">Website Link</a><br />
                                <a href="">Bootsnipp Profile</a><br />
                                <a href="">Bootply Profile</a>
                                <p>SKILLS</p>
                                <a href="">Web Designer</a><br />
                                <a href="">Web Developer</a><br />
                                <a href="">WordPress</a><br />
                                <a href="">WooCommerce</a><br />
                                <a href="">PHP, .Net</a><br /> */}
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="tab-content profile-tab" id="myTabContent">
                                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>ID</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{user._id}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Mail Id</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{user.email}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Name</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{user.firstName + " " + user.lastName}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Phone</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{user.mobileNo}</p>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Role</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>Role name</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Experience</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>Expert</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Hourly Rate</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>10$/hr</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Total Projects</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>230</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>English Level</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>Expert</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Availability</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>6 months</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <label>Your Bio</label><br />
                                            <p>Your detail description</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    )
}