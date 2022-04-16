import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export const ListvehiclesAPI = () => {
    const [vehicleList, setvehicleList] = useState([])
    const [search, setSearch] = useState('');

    const getData = () => {
        axios.get("http://localhost:4000/vehicles/").then(res => {
            console.log(res.data.data)
            setvehicleList(res.data.data)
        })
    }

    const handleSearch = (e) => {
        console.log(e.target.value)
        setSearch(e.target.value);
    }

    useEffect(() => {
        console.log("use effect hook implemented")
        getData()
    }, [])

    const deleteVehicle = (id, vehicleNo) => {

        var confirmationResult = window.confirm(`Are you sure you want to delete the record of ${vehicleNo}?`)
        if (confirmationResult)     //if confirmationResult===true
        {
            axios.delete(`http://localhost:4000/vehicles/` + id).then(res => {
                console.log(res)
            })
        }
    }

    var counter = 0

    return (
        <div className="container table-responsive-md ">
            <div className="input-group mb-3 ">
                <span className="input-group-text my-3 ml-8" id="basic-addon1"><i className="bi bi-search " ></i></span>

                <input id="search" type="search" placeholder="Search" className="form-control col-md-3 my-3 ml-8" aria-label="Search" onChange={(e) => handleSearch(e)} />

            </div>
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
                        {localStorage.getItem('roleName') === 'Chairman' || localStorage.getItem('roleName') === 'ADMIN' ?

                            <th scope="col">Action</th> : ""}
                    </tr>
                </thead>
                <tbody>
                    {search === "" ?
                        vehicleList.map((vehicle) => {
                            counter += 1
                            return (
                                <tr key={vehicle._id}>
                                    <th scope="row">{counter}</th>
                                    <td>{vehicle.user.firstName + " " + vehicle.user.lastName}</td>
                                    <td>{vehicle.vehicleNo}</td>
                                    <td>{vehicle.vehicleType}</td>
                                    <td>{vehicle.parkingId}</td>
                                    <td>{vehicle.user.mobileNo}</td>
                                    <td><img src={vehicle.user.profilePhoto} alt="No image" style={{ height: "80px", width: "80px" }}></img></td>
                                    {localStorage.getItem('roleName') === 'Chairman' || localStorage.getItem('roleName') === 'ADMIN' ?

                                        <td>
                                            <Link to="/listvehicle" className="btn btn-sm btn-danger mx-1" onClick={(e) => { deleteVehicle(vehicle._id, vehicle.vehicleNo) }}><i className="bi bi-trash"></i></Link>
                                            <Link to={`/listvehicle/update/${vehicle._id}`} className="btn btn-sm btn-primary" value={vehicle._id}><i className="bi bi-pencil"></i></Link>
                                        </td> : ""}
                                </tr>
                            )
                        }) :
                        vehicleList.map((vehicle) => {
                            counter += 1
                            console.log("filter")
                            if ((vehicle.user.firstName).includes(search) || (vehicle.user.lastName).includes(search) ||
                                (vehicle.vehicleNo).includes(search) || (vehicle.vehicleType).includes(search) ||
                                (vehicle.parkingId).includes(search) || (vehicle.user.mobileNo).includes(search)) {

                                return (
                                    <tr key={vehicle._id}>
                                        <th scope="row">{counter}</th>
                                        <td>{vehicle.user.firstName + " " + vehicle.user.lastName}</td>
                                        <td>{vehicle.vehicleNo}</td>
                                        <td>{vehicle.vehicleType}</td>
                                        <td>{vehicle.parkingId}</td>
                                        <td>{vehicle.user.mobileNo}</td>
                                        <td><img src={vehicle.user.profilePhoto} alt="No image" style={{ height: "80px", width: "80px" }}></img></td>
                                        {localStorage.getItem('roleName') === 'Chairman' || localStorage.getItem('roleName') === 'ADMIN' ?

                                            <td>
                                                <Link to="/listvehicle" className="btn btn-sm btn-danger mx-1" onClick={(e) => { deleteVehicle(vehicle._id, vehicle.vehicleNo) }}><i className="bi bi-trash"></i></Link>
                                                <Link to={`/listvehicle/update/${vehicle._id}`} className="btn btn-sm btn-primary" value={vehicle._id}><i className="bi bi-pencil"></i></Link>
                                            </td> : ""}
                                    </tr>
                                )
                            }
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}