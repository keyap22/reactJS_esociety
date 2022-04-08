import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { FadeLoader } from 'react-spinners'


export const ListGuardsAPI = () => {
    const [guardList, setGuardList] = useState([])
    const [attendanceList, setAttendanceList] = useState([])
    const [search, setSearch] = useState('');
    var [display, setDisplay] = useState(0);
    var [attendancedisplay, setattendancedisplay] = useState(false)
    var [counter, setcounter] = useState(0)
    var [userId, setUserId] = useState('')
    const  [isLoading, setIsLoading] = useState(true)

    var userid 

    var GuardList = []
    var AttendanceList = []

    const getSecurityGuardByID = (guardId) => {
        //var id = "622725e74ceac4ee8ffb582a"
        axios.get(`http://localhost:4000/guards/` + guardId).then(res => {
            console.log(res)
            console.log("res user - ",res.data.data.user)
            userid = res.data.data.user
            console.log("userid : ",userid);
            setUserId(userid)
        })
    }

    const deleteGuard = async (guardID) => {
        //console.log("value : ",value)
        console.log(guardID)
        
        //delete guard
        await axios.delete(`http://localhost:4000/guards/` + guardID).then(res => {
            console.log(res)
        })

        //delete user
        await axios.delete(`http://localhost:4000/users/` + userId).then(res => {
            console.log(res)
            console.log("user is deleted successfully");
        })

        //delete guardattendances
        console.log("guardid "+ guardID)
        await axios.delete(`http://localhost:4000/dropguardAttendances/` + guardID).then(res => {
            console.log(res)
            console.log("all attendances of given guard are deleted");
        })
    }

    const getSecurityGuard = async () => {
        await axios.get('http://localhost:4000/guards/').then(res => {
            console.log("guard response : ", res)
            GuardList = res.data.data
            setGuardList(GuardList)
            //guardList = res.data.data
            //console.log("security guard id before for each : ", res.data.data._id)
            //guardID = res.data.data._id
            console.log("guard list : ", guardList)
            console.log("GuardList : ", GuardList)
            getGuardAttendance()
        })
    }

    const getGuardAttendance = () => {



        GuardList.forEach(guard => {
            //  console.log("in for each guard id : ",guard._id)

            if (guard._id !== null || guard._id !== undefined) {
                var formdata = {
                    "guard": guard._id
                }
                axios.post('http://localhost:4000/countattendances/', formdata).then(res => {
                    //  console.log("guardid :" + guard._id)

                    console.log("==========================new guard attendance api response : ", res.data.data)
                    AttendanceList.push(res.data.data)
                    attendanceList.push(res.data.data)
                })
                //setAttendanceList(AttendanceList)

                //console.log("======AttendanceList : ",AttendanceList)
                console.log("======attendanceList usestate : ", attendanceList)


            }
        })
        if (attendanceList !== null) {
            setattendancedisplay(true)
        }

    }

    const handleSearch = (e) => {
        console.log(e.target.value)
        setSearch(e.target.value);
    }

    useEffect(() => {
        console.log("use effect hook implemented")
        const timer = setTimeout(() => {
setIsLoading(false)
            console.log('This will run after 1 second!')
          }, 3000);
          
        getSecurityGuard()

        if (attendancedisplay === true) {

            getGuardAttendance()
        }
        return () => clearTimeout(timer);

    }, (attendanceList.length < 8 ? [guardList] : [])
    )

    return (
       
        <div className="container table-responsive-md" >
            {isLoading ? <div align="center" style={{marginBottom : "50px" , marginTop : "50px", paddingBottom:"50px"
    }}><FadeLoader ></FadeLoader></div>:
            <div>

            <div className="input-group mb-3 ">
                <span className="input-group-text my-3 ml-8" id="basic-addon1"><i className="bi bi-search " ></i></span>

                <input id="search" type="search" placeholder="Search" className="form-control col-md-3 my-3 ml-8" aria-label="Search" onChange={(e) => handleSearch(e)} />

            </div>

            <table className="table table-hover my-2">
                <thead className="table_head">
                    <tr>
                        <th scope="col" className=''>Sr. No.</th>
                        <th scope="col">Guard Name</th>
                        <th scope="col">Scheduled Time</th>
                        <th scope="col">Attendance</th>
                        {/*<th scope="col">Image</th>*/}
                        <th scope="col">Contact No.</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>

                <tbody>

                    {search === "" ?
                        guardList.map((guard) => {
                            counter += 1
                            console.log("search : " + search)
                            return (
                                <tr key={guard._id}>
                                    <th scope="row">{counter}</th>
                                    <td>{guard.guardName}</td>
                                    <td>{guard.scheduleTime}</td>
                                    {attendancedisplay ? <td >{attendanceList[counter - 1] !== undefined ? attendanceList[counter - 1] : ""}</td> : <td></td>}
                                    {/*<td><img src={guard.profilePhoto}></img></td> */}
                                    <td>{guard.mobileNo}</td>


                                    <td>
                                        <Link to="/listguards" className="btn btn-sm btn-danger mx-1" value={guard.user} onChange={getSecurityGuardByID(guard._id)} onClick={() => { deleteGuard(guard._id) }}><i className="bi bi-trash"></i></Link>
                                        <Link to={`/listguards/update/${guard._id}`} className="btn btn-sm btn-primary" value={guard._id}><i className="bi bi-pencil"></i></Link>
                                    </td>
                                </tr>
                            )
                        }) : guardList.map((guard) => {
                            counter += 1
                            console.log("filter")
                            if ((guard.guardName).includes(search) || (guard.scheduleTime).includes(search) ||
                                (guard.mobileNo).includes(search)) {

                                console.log("search : " + search)
                                return (
                                    <tr key={guard._id}>
                                        <th scope="row">{counter}</th>
                                        <td>{guard.guardName}</td>
                                        <td>{guard.scheduleTime}</td>
                                        {attendancedisplay ? <td >{attendanceList[counter - 1] !== undefined ? attendanceList[counter - 1] : ""}</td> : <td></td>}
                                        {/*<td><img src={guard.profilePhoto}></img></td> */}
                                        <td>{guard.mobileNo}</td>

                                        <td>
                                            <Link to="/listguards" className="btn btn-sm btn-danger mx-1" onClick={() => { deleteGuard(guard._id) }}><i className="bi bi-trash"></i></Link>
                                            <Link to={`/listguards/update/${guard._id}`} className="btn btn-sm btn-primary" value={guard._id}><i className="bi bi-pencil"></i></Link>
                                        </td>
                                    </tr>
                                )
                            }
                        })
                    }
                </tbody>
            </table>
</div>}
        </div>
    
    )
                
    setattendancedisplay(false)
}