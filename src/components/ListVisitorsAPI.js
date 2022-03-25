import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export const ListVisitorsAPI = () => {
    const [visitorList, setVisitorList] = useState([])

    const deleteVisitor = (visitorID) => {

        console.log(visitorID)
        
        axios.delete(`http://localhost:4000/visitors/` + visitorID).then(res => {
            console.log(res)
        })
    }

    const updateVisitor = (e) => {

        var visitor = {
            visitorName: "ria",
            // age : 20,
            // user : "",
            // house : ""
        }
        var id = e.target.value;

        axios.put(`http://localhost:4000/visitors/` + id, visitor).then(res => {
            console.log(res)
        })
    }

    const getData = () => {
        axios.get("http://localhost:4000/visitors/").then(res => {
            console.log(res.data.data)
            setVisitorList(res.data.data)
        })

    }
    useEffect(() => {
        console.log("use effect hook implemented")
        getData()
    }, [])

    var counter = 0

    return (
        <div className="container table-responsive-md" style={{maxWidth: "1290px"}}>
            <table className="table table-hover my-3">
                <thead className="table_head">
                    <tr>
                        <th scope="col" className=''>Sr. No.</th>
                        <th scope="col">Visitor Name</th>
                        <th scope="col">Date</th>
                        <th scope="col">Entry Time</th>
                        <th scope="col">Exit Time</th>
                        <th scope="col">Allowed</th>
                        <th scope="col">Prescheduled</th>
                        <th scope="col">Image</th>
                        <th scope="col">House</th>
                        <th scope="col">Category</th>
                        <th scope="col">Purpose</th>
                        <th scope="col">Contact No.</th> 
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        visitorList.map((visitor) => {
                            counter += 1
                            return (
                                <tr key={visitor._id}>
                                    <th scope="row">{counter}</th>
                                    <td>{visitor.visitorName}</td>
                                    <td>{visitor.date}</td>
                                    <td>{visitor.entryTime}</td>
                                    <td>{visitor.exitTime}</td>
                                    <td>{visitor.isAllowed ? <i className="bi bi-check-lg"></i> : <i className="bi bi-x-lg"></i>}</td>
                                    <td>{visitor.isPreScheduled ? <i className="bi bi-check-lg"></i> : <i className="bi bi-x-lg"></i>}</td>
                            <td><img src = {visitor.profilePhoto} alt="No image"></img></td>
                                    <td>{visitor.house.houseTitle}</td>
                                    <td>{visitor.visitorCategory.categoryName}</td>
                                    <td>{visitor.purpose}</td>
                                    <td>{visitor.mobileNo}</td>
                                 
                                    <td>
                                        <Link to="/listvisitors" className="btn btn-sm btn-danger mx-1" onClick={() => { deleteVisitor(visitor._id) }}><i className="bi bi-trash"></i></Link>
                                        <Link to={`/listvisitors/update/${visitor._id}`} className="btn btn-sm btn-primary" value={visitor._id} onClick={(e) => { updateVisitor(e) }}><i className="bi bi-pencil"></i></Link>
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