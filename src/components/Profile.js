import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { FadeLoader } from 'react-spinners'

export const Profile = () => {

    var Counter = 0

    const [email, setemail] = useState('')
    const [role, setRole] = useState('')
    const [roleName, setRoleName] = useState('')
    const [user, setUser] = useState('')
    var [member, setMember] = useState('')
    const [visitorList, setVisitorList] = useState([])
    var [counter, setCounter] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    var [profilePhoto, setProfilePhoto] = useState('')
    const [guardDetails, setGuardDetails] = useState('')

    var addattendance = true
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
    var Member = ""

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false)
            console.log('This will run after 1 second!')
        }, 3000);
        setemail(localStorage.getItem('email'))
        setRole(localStorage.getItem('role'))
        guardID = localStorage.getItem('guardID');
        console.log("guardid in profile :" + guardID)
        setRoleName(localStorage.getItem('roleName'))
        if (localStorage.getItem('roleName') === 'Security Guard') {
            getGuardAttendances()
        }
        userid = localStorage.getItem("userid")
        console.log("userid in profile :" + userid)
        getUserById()
        return () => { clearTimeout(timer); }

    }, [isLoading])

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
        if (localStorage.getItem('roleName') === 'Society Member') {
            console.log(":in if ")
            getMemberByUser(userid)
        }


    }

    const getMemberByUser = async (userID) => {

        console.log("inside get member by user")
        {
            var formdata = {
                user: userID
            }
            console.log(userid)
            await axios.post('http://localhost:4000/membersByUser/', formdata).then(res => {
                console.log("user by id response : ", res)
                Member = res.data.data
            }).then(res => {

                console.log("Member data : ", Member)
                setMember(Member)
                console.log("useState Member data : ", member)
                console.log(Member.house.houseTitle)
                getVisitors(Member.house)
                localStorage.setItem("house", Member.house._id)
            })

        }
    }

    const getVisitors = async (houseID) => {
        var formdata = {
            house: houseID
        }
        await axios.post('http://localhost:4000/findvisitors/', formdata).then(res => {
            console.log("visitors list  : ", res.data.data)
            //visitors = res.data.data
            setVisitorList(res.data.data)
            console.log(visitorList)
            localStorage.setItem('myVisitors', JSON.stringify(visitorList));
            console.log(localStorage.getItem('myVisitors'))
            var myVisitors = JSON.parse(localStorage.getItem('myVisitors'))
            console.log(houseID._id)
            localStorage.setItem('houseID', houseID._id)
            console.log(localStorage.getItem('houseID'))

        })
    }

    const logout = (e) => {
        e.preventDefault()
        localStorage.removeItem('email')
        localStorage.removeItem('role')
        localStorage.removeItem('roleName')
        localStorage.removeItem('userid')
        localStorage.removeItem('myVisitors')
        localStorage.removeItem('houseID')
        
        getGuardAttendances()
        navigation('/login')
        window.location.reload();
        
    }


    const getGuardAttendances = async () => {

        await axios.get(`http://localhost:4000/guardAttendances/`).then(res => {
            console.log("get guard attendances response : " + res)
            guardAttendanceList = res.data.data
            setGuardAttendanceList(guardAttendanceList)
            //console.log("guard id via response : ", res.data.data.guard)
            console.log("guard id via local storage : ", guardID)
            getGuardDetails(localStorage.getItem('guardID'))
            console.log("guard attendance list : ", guardAttendanceList)
            countAttendance()
        })
    }

    const getGuardDetails = async (id) => {
        console.log(id)
        await axios.get(`http://localhost:4000/guards/` + id).then(res => {
            console.log("get guard attendances response : " + res)
            const details = res.data.data;
            setGuardDetails(details)

        })

        console.log(guardDetails)
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
            console.log("in for each" + attendance)
            console.log("guardid localStorage" + localStorage.getItem("guardID"))
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
            else { addattendance = true }

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
                alert("Attendance recorded successfully")
            })
        }
        else {
            alert("Today's attendance has already been recorded")
        }

    }

    const editProfile = (e) => {
        e.preventDefault()
        alert("You don't have access to edit the details. Contact Admin. Thank You.")
    }

    const setImage = async () => {

        var data = {
            profilePhoto: profilePhoto
        }

        console.log("data : ", data)
        if (profilePhoto !== "") {
            console.log("put api request called")
            await axios.put(`http://localhost:4000/changePhoto/` + user._id, data).then(res => {
                console.log(res)
                if (res.data.status === 200) {
                    navigation('/profile')
                }

            })
        }
    }

    return (

        <section id="services" className="services section-bg">
            {isLoading ? <div align="center" style={{
                marginBottom: "50px", marginTop: "50px", paddingBottom: "50px"
            }}><FadeLoader color="#009970"></FadeLoader></div> :
                <div>

                    <div>
                        {
                            email ? "" : <h1>Please login first</h1>
                        }
                        {
                            email ? isLogin = true : isLogin = false
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
                    <input type="file" name="file" className="form-control-file" onChange={(e => { setProfilePhoto(e.target.files[0].name) })} onClick={setImage()} />

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
                                                    <a className="nav-link active" id="home-tab" style={{color : "black"}} data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">About</a>
                                                </li>
                                                <li className="nav-item">
                                                    {localStorage.getItem('roleName') === 'Society Member' || localStorage.getItem('roleName') === 'Security Guard' ?
                                                        <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" style={{color : "#009970"}} aria-controls="profile" aria-selected="false">Details</a>
                                                        : ""}
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="col-md-2">
                                        <Link className="profile-edit-btn" name="btnAddMore" to={`/updateUser/${user._id}`}
                                            onClick={localStorage.getItem('roleName') === 'ADMIN' ? "" : e => editProfile(e)}>Edit Profile</Link>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="profile-work">

                                            {localStorage.getItem("roleName") === "Security Guard" ?
                                                <input type="button" className='btn-centre ml-5 mr-6 my-3' style={{ width: "65%" }} value="Add Attendance" onClick={AddAttendance} />
                                                : ""
                                            }

                                            <input type="button" style={{ marginLeft: "65px", width: "50%" }} className={isLogin ? 'btn-centre' : "btn btn-primary hidden"} value="Logout" onClick={logout} />

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
                                                        <p>{roleName}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                                {/* {localStorage.getItem('roleName') === 'Chairman' || localStorage.getItem('roleName') === 'Society Member' ?  */}
                                                {/* <div className="row">
                                                    <div className="col-md-6">
                                                        <label>Visitor Name</label>
                                                    </div>
                                                    <div className="col-md-6">
                                                       
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <label>Purpose</label>
                                                    </div>
                                                    <div className="col-md-6">
                                                        
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <label>Contact Number</label>
                                                    </div>
                                                    <div className="col-md-6">
                                                       </div>
                                                </div>

                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <label>Date</label>
                                                    </div>
                                                    <div className="col-md-6">
                                                        
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <label>Your Visitor List</label><br />
                                                        <p>More detail description</p>
                                                    </div>
                                                </div> */}
                                                {/* : <></> }  */}
                                                {localStorage.getItem("roleName") === "Society Member" || localStorage.getItem('roleName') === "Chairman" ?
                                                    <>
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
                                                                <label>Age</label>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <p>{member.age}</p>
                                                            </div>
                                                        </div></> : ""}
                                                {localStorage.getItem('roleName') === 'Security Guard' ?
                                                    <>
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <label>Schedule Time</label>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <p>{guardDetails.scheduleTime}</p>
                                                            </div>
                                                        </div>

                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <label>Total Attendance Count</label>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <p>{counter}</p>
                                                            </div>
                                                        </div>


                                                    </>
                                                    :
                                                    <></>



                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div> : ""}
                </div>}
        </section>
    )
}