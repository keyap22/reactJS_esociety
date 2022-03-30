import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export const ListGuardsAPI = () => {
    const [guardList, setGuardList] = useState([])
    const [attendanceList, setAttendanceList] = useState([])
    
    var GuardList=[]
    var AttendanceList = []
    var [attendancedisplay, setattendancedisplay] = useState(false)

    var [counter,setcounter] = useState(0)


    const deleteGuard = (guardID) => {

        console.log(guardID)

        axios.delete(`http://localhost:4000/guards/` + guardID).then(res => {
            console.log(res)
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

    const getGuardAttendance =  () => {
       


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
                    console.log("======attendanceList usestate : ",attendanceList)
                    
               
            }
        })
        if(attendanceList!==null){ setattendancedisplay(true)
        }
                       
    }

    var [display, setDisplay] = useState(0);

    // useEffect(() => {
    //    var s = setInterval(() => {
    //       setDisplay(state => (state +1));
    //     }, 10000);
    //     console.log(display)
    //   }, []);
    

    useEffect(() => {
        console.log("use effect hook implemented")

        getSecurityGuard()
      
        if(attendancedisplay===true)
        {
      
       getGuardAttendance()
       }
    //    if (performance.navigation.type === 1) {
    //     console.log("This page is  reloaded");
     
    //     setattendancedisplay(false)
    //   } else {
    //     console.log("This page is not reloaded");
    //   }

     

    },(attendanceList.length<8 ?[guardList]:[])
    )

    // [attendancedisplay ?[]: [  guardList,
    //     attendanceList]]

    return (
        <div className="container table-responsive-md" >

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
                        {/* <th scope="col">Attendance</th>  */}
                    </tr>
                </thead>
                
                <tbody>
                    
                    {
                        guardList.map((guard) => {
                            counter +=1
                            //console.log(counter)
                           // console.log(attendanceList[1])
                           // AttendanceList.map((attendance) => {
                             //   console.log("attendance in for loop : ",attendance)
                            // console.log(attendancedisplay)
                            return (
                                 <tr key={guard._id}>
                                    <th scope="row">{counter}</th>
                                    <td>{guard.guardName}</td>
                                    <td>{guard.scheduleTime}</td>
                                   {attendancedisplay? <td >{ attendanceList[counter-1]!==undefined ?attendanceList[counter-1]:""}</td> :<td></td>} 
                                     {/*<td><img src={guard.profilePhoto}></img></td> */}
                                    <td>{guard.mobileNo}</td>
                                    

                                    <td>
                                        <Link to="/listguards" className="btn btn-sm btn-danger mx-1" onClick={() => { deleteGuard(guard._id) }}><i className="bi bi-trash"></i></Link>
                                        <Link to={`/listguards/update/${guard._id}`} className="btn btn-sm btn-primary" value={guard._id}><i className="bi bi-pencil"></i></Link>
                                    </td>
                                </tr>
                            )
                            //})
                        })
                    }
                    {/* {
                        attendanceList.map((attendance)=>{
                            console.log("==========================...."+attendance)
                            return(
                                
                                    <td>{attendance}</td>
                                
                            )
                        })
                    }  */
                     }
                     
                    
                </tbody>
            </table>
        </div>
    )
    setattendancedisplay(false)
                  
}