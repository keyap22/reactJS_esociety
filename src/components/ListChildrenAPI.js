import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export const ListChildrenAPI = () => {
    const [childrenList, setchildrenList] = useState([])

   

    const getData = () => {
        axios.get("http://localhost:4000/childSchedules/").then(res => {
            console.log(res.data.data)
            setchildrenList(res.data.data)
        })

    }
    useEffect(() => {
        console.log("use effect hook implemented")
        getData()
    }, [])

    const deleteChild = (id) => {

        axios.delete(`http://localhost:4000/childSchedules/` + id).then(res => {
            console.log(res)
        })
    }

    var counter = 0

    return (
        <div className="container table-responsive-md ">
            <table className="table table-hover my-3">
                <thead className="table_head">
                    <tr>
                        <th scope="col" className=''>Sr. No.</th>
                        <th scope="col">Name</th>
                        <th scope="col">Age</th>
                        <th scope="col">Contact Person</th>
                        <th scope="col">Contact Number</th>
                        <th scope="col">House Title</th>
                        <th scope="col">Allowed Time</th>
                        <th scope="col">Profile Photo</th> 
                        <th scope="col">Action</th>
                   </tr>
                </thead>
                <tbody>
                    {
                        childrenList.map((child) => {
                            counter += 1
                            return (
                                <tr key={child._id}>
                                    {/* <th scope="row">{member.user.firstName}</th> */}
                                    <th scope="row">{counter}</th>
                                    <td>{child.childName}</td>
                                    <td>{child.age}</td>
                                    <td>{child.contactName}</td>
                                    <td>{child.contactNo}</td>
                                    <td>{child.house.houseTitle}</td>
                                    <td>{child.allowedStartingTime + " - " + child.allowedEndingTime}</td>
                                   <td><img src = {child.profilePhoto} alt="No image" style={{height:"80px", width:"80px"}}></img></td> 
                                   <td>
                                        <Link to="/listchildren" className="btn btn-sm btn-danger mx-1" onClick={() => { deleteChild(child._id) }}><i className="bi bi-trash"></i></Link>
                                        <Link to={`/listchildren/update/${child._id}`} className="btn btn-sm btn-primary" value={child._id}><i className="bi bi-pencil"></i></Link>
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
