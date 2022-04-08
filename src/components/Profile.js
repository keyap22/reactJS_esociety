import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { FadeLoader } from 'react-spinners'
export const Profile = () => {

    var Counter = 0

    const [email, setemail] = useState('')
    const [role, setRole] = useState('')
    const [roleName, setRoleName] = useState('')
    const [user, setUser] = useState('')
    const [member,setMember] = useState('')
    const [visitorList, setVisitorList] = useState([])
    var [counter, setCounter] = useState(0)
    const  [isLoading, setIsLoading] = useState(true)

    var addattendance=true
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
    var User = "", Member =""

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false)
                        console.log('This will run after 1 second!')
                      }, 400);
        setemail(localStorage.getItem('email'))
        setRole(localStorage.getItem('role'))
        guardID = localStorage.getItem('guardID');
        console.log("guardid in profile :" + guardID)
        setRoleName(localStorage.getItem('roleName'))
        //getGuardAttendances()
        userid = localStorage.getItem("userid")
        console.log("userid in profile :" + userid)
        getUserById()
        return () => clearTimeout(timer);

    }, [])

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

        console.log("rolename in getuserbyid : " + localStorage.getItem('roleName'))
        //if society member , fetch house 
        if(localStorage.getItem('roleName') ==='society member')
        {
            console.log(":in if ")
             getMemberByUser(userid)
        }
        
    }

    const getMemberByUser =  (userID)=>
    {

        console.log("inside get member by user")
        {
            var formdata = {
               user : userID
            }
            console.log(userid)
              axios.post('http://localhost:4000/membersByUser/' ,formdata).then(res => {
                console.log("user by id response : ", res)
                Member = res.data.data
                setMember(Member)
                console.log("member data : ", res.data.data)
                console.log(member.house.houseTitle)
                getVisitors(res.data.data.house)
                
            })
    
        }
    }
    const getVisitors =async (houseID)=>
    {
        var formdata={
            house : houseID
        }
        await axios.post('http://localhost:4000/findvisitors/' ,formdata).then(res => {
                console.log("visitors list  : ", res.data.data)
                setVisitorList(res.data.data)
                console.log(visitorList)
                
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
            console.log("in for each" +attendance)
console.log("guardid localStorage"+localStorage.getItem("guardID"))
console.log(attendance.guard._id)
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
            else{addattendance=true}

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
        else{
            alert("Today's attendance has already been recorded")
        }

    }

    return (
        
        <section id="services" className="services section-bg">
             {isLoading ? <div align="center" style={{marginBottom : "50px" , marginTop : "50px", paddingBottom:"50px"
    }}><FadeLoader ></FadeLoader></div>:
            <div>

            <div>
                {
                    email ? "" : <h1>Please login first</h1>
                }
                {
                    email ? isLogin = true : isLogin = false
                }
                {
                    role === "620dda4cbaf661b44817ee63" ? <h2>Hello, {roleName}</h2> : ""
                }
                {
                    role === "620c88535e051978662b0379" ? <h2>Security guard attendance - {counter}</h2> : ""
                }
                {
                    role === "620c88535e051978662b0379" ? <input type="button" className='btn-centre ml-5 mr-6' style={{width:"15%"}} value="Add Attendance" onClick={AddAttendance} /> : ""
                }
                
            </div>
                {isLogin === true ?
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
                                    {roleName}
                                    {/* {user.role._id} */}
                                </h6>
                                {/* <p className="proile-rating">RANKINGS : <span>8/10</span></p> */}
                                <ul className="nav nav-tabs" id="myTab" role="tablist">
                                    <li className="nav-item">
                                        <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">About</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Details</a>
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
                            <input type="button" style={{marginLeft : "80px" , width:"50%"}} className={isLogin ? 'btn-centre' : "btn btn-primary hidden"} value="Logout" onClick={logout} />
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
                                            <label>House No.</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{member.house.houseTitle}</p>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Role</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{roleName}</p>
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
            </div>  : ""}
            </div>}
        </section>
    )
}