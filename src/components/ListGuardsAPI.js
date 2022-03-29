import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export const ListGuardsAPI = () => {
    const [guardList, setGuardList] = useState([])
    //var [attendanceList, setAttendanceList] = useState([])
    var guardID, attendance_counter
    //var guardList=[]
    var attendanceList=[]


    const deleteGuard = (guardID) => {

        console.log(guardID)

        axios.delete(`http://localhost:4000/guards/` + guardID).then(res => {
             console.log(res)
         })
    }

    const getSecurityGuard = async () => {
        await axios.get('http://localhost:4000/guards/').then(res => {
            console.log("guard response : ", res)
            setGuardList(res.data.data)
            //guardList = res.data.data
            //console.log("security guard id before for each : ", res.data.data._id)
            //guardID = res.data.data._id
            console.log("guard list : ", guardList)
           
    })
}

    const getGuardAttendance = () => {
        // axios.get('http://localhost:4000/guardAttendances/').then(res => {
        //     console.log("guard attendance response : ", res)

        //     //setAttendanceList(res.data.data)
        //     attendanceList = res.data.data
        //     console.log("attendance list : ", attendanceList)

        // })


        guardList.forEach(guard => {

            if(guard._id!=null){
            var formdata ={
                "guard" : guard._id
            }
            axios.post('http://localhost:4000/countattendances/' ,formdata).then(res => {
                console.log("guardid :" +guard._id)
           
        console.log("==========================new guard attendance api response : ", res.data.data)
        

        })
    }
    })
    }

    useEffect(() => {
        console.log("use effect hook implemented")
        getSecurityGuard()
        
        getGuardAttendance()
        
    }, [guardList])

    var counter = 0
    /*
    
    attendance_counter = 0
                             attendanceList.map(attendance => {
                                 console.log("attendance guard id : ", attendance.guard)
                                 console.log("guard id form guard list : ",guard._id)
                                 if (attendance.guard === guard._id) {
                                     attendance_counter += 1
                                     console.log("attendance count : ", attendance_counter)
                                 }
                                 //guardList.guard.push(attendance_counter)
                                 console.log("final attendance count : ", attendance_counter)
                                 console.log("guard list : ", guardList)
    
    
    */
    

    return (
        <div className="container table-responsive-md">

            <table className="table table-hover my-2">
                <thead className="table_head">
                    <tr>
                        <th scope="col" className=''>Sr. No.</th>
                        <th scope="col">Guard Name</th>
                        <th scope="col">Scheduled Time</th>
                        {/* <th scope="col">Attendance</th> */}
                        <th scope="col">Image</th>
                        <th scope="col">Contact No.</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        guardList.map((guard) => {
                            counter += 1
                            
                                return (
                                    <tr key={guard._id}>
                                        <th scope="row">{counter}</th>
                                        <td>{guard.guardName}</td>
                                        <td>{guard.scheduleTime}</td>
                                        {/* <td>{attendance_counter}</td> */}
                                        <td><img src={guard.profilePhoto}></img></td>
                                        <td>{guard.mobileNo}</td>

                                        <td>
                                            <Link to="/listguards" className="btn btn-sm btn-danger mx-1" onClick={() => { deleteGuard(guard._id) }}><i className="bi bi-trash"></i></Link>
                                            <Link to={`/listguards/update/${guard._id}`} className="btn btn-sm btn-primary" value={guard._id}><i className="bi bi-pencil"></i></Link>
                                        </td>
                                    </tr>
                                )
                            
                        })
                     } 
                </tbody>
            </table>
        </div>
    )
}