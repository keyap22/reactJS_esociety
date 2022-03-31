import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export const ListvehiclesAPI = () => {
    const [vehicleList, setvehicleList] = useState([])

   

    const getData = () => {
        axios.get("http://localhost:4000/vehicles/").then(res => {
            console.log(res.data.data)
            setvehicleList(res.data.data)
        })

    }
    useEffect(() => {
        console.log("use effect hook implemented")
        getData()
    }, [])

    const deleteVehicle = (id) => {

        axios.delete(`http://localhost:4000/vehicles/` + id).then(res => {
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
                        <th scope="col">Owner Name</th>
                        <th scope="col">Vehicle Number</th>
                        <th scope="col">Vehicle Type</th>
                        <th scope="col">Parking ID</th>
                        <th scope="col">Contact Number</th>
                        <th scope="col">Profile Photo</th> 
                        <th scope="col">Action</th>
                   </tr>
                </thead>
                <tbody>
                    {
                        vehicleList.map((vehicle) => {
                            counter += 1
                            return (
                                <tr key={vehicle._id}>
                                    {/* <th scope="row">{member.user.firstName}</th> */}
                                    <th scope="row">{counter}</th>
                                    <td>{vehicle.user.firstName + " " + vehicle.user.lastName}</td>
                                    <td>{vehicle.vehicleNo}</td>
                                    <td>{vehicle.vehicleType}</td>
                                    <td>{vehicle.parkingId}</td>
                                    <td>{vehicle.user.mobileNo}</td>
                                <td><img src = {vehicle.user.profilePhoto} alt="No image" style={{height:"80px", width:"80px"}}></img></td> 
                                   <td>
                                        <Link to="/listvehicle" className="btn btn-sm btn-danger mx-1" onClick={() => { deleteVehicle(vehicle._id) }}><i className="bi bi-trash"></i></Link>
                                        <Link to={`/listvehicle/update/${vehicle._id}`} className="btn btn-sm btn-primary" value={vehicle._id}><i className="bi bi-pencil"></i></Link>
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