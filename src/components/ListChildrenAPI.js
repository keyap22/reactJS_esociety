import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export const ListChildrenAPI = () => {
    const [childrenList, setchildrenList] = useState([])
    const [search, setSearch] = useState('');

    const getData = () => {

        var data = {
            house: localStorage.getItem("house")
        }

        console.log("house data : ", data)
        axios.post("http://localhost:4000/findChild/", data).then(res => {
            console.log(res.data.data)
            setchildrenList(res.data.data)
        })
    }

    useEffect(() => {
        getData()
    }, [])

    const deleteChild = (id) => {

        axios.delete(`http://localhost:4000/childSchedules/` + id).then(res => {
            console.log(res)
        })
    }

    const handleSearch = (e) => {
        console.log(e.target.value)
        setSearch(e.target.value);
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
                        <th scope="col">Name</th>
                        <th scope="col">Age</th>
                        <th scope="col">Contact Person</th>
                        <th scope="col">Contact Number</th>
                        <th scope="col">House Title</th>
                        <th scope="col">Allowed Time</th>
                        <th scope="col">Profile Photo</th>
                        {localStorage.getItem('roleName') === 'Society Member' ?
                            <th scope="col">Action</th> : ""}
                    </tr>
                </thead>
                <tbody>
                    {
                        search === "" ?
                            childrenList.map((child) => {
                                counter += 1
                                console.log("search : " + search)
                                return (
                                    <tr key={child._id}>
                                        <th scope="row">{counter}</th>
                                        <td>{child.childName}</td>
                                        <td>{child.age}</td>
                                        <td>{child.contactName}</td>
                                        <td>{child.contactNo}</td>
                                        <td>{child.house.houseTitle}</td>
                                        <td>{child.allowedStartingTime + " - " + child.allowedEndingTime}</td>
                                        <td><img src={child.profilePhoto} alt="No image" style={{ height: "80px", width: "80px" }}></img></td>
                                        {localStorage.getItem('roleName') === 'Society Member' ?
                                            <td>
                                                <Link to="/listchildren" className="btn btn-sm btn-danger mx-1" onClick={() => { deleteChild(child._id) }}><i className="bi bi-trash"></i></Link>
                                                <Link to={`/listchildren/update/${child._id}`} className="btn btn-sm btn-primary" value={child._id}><i className="bi bi-pencil"></i></Link>
                                            </td> : ""}
                                    </tr>
                                )
                            }) :
                            childrenList.map((child) => {
                                counter += 1
                                console.log("filter")
                                if ((child.house.houseTitle).includes(search) || (child.childName).includes(search) ||
                                    (child.contactName).includes(search) || (child.contactNo).includes(search)
                                    || (child.allowedStartingTime).includes(search) || (child.allowedEndingTime).includes(search)) {

                                    //|| (child.age).includes(search) || (counter).includes(search)
                                    console.log("search : " + search)
                                    return (
                                        <tr key={child._id}>
                                            <th scope="row">{counter}</th>
                                            <td>{child.childName}</td>
                                            <td>{child.age}</td>
                                            <td>{child.contactName}</td>
                                            <td>{child.contactNo}</td>
                                            <td>{child.house.houseTitle}</td>
                                            <td>{child.allowedStartingTime + " - " + child.allowedEndingTime}</td>
                                            <td><img src={child.profilePhoto} alt="No image" style={{ height: "80px", width: "80px" }}></img></td>
                                            {localStorage.getItem('roleName') === 'Society Member' ?
                                                <td>
                                                    <Link to="/listchildren" className="btn btn-sm btn-danger mx-1" onClick={() => { deleteChild(child._id) }}><i className="bi bi-trash"></i></Link>
                                                    <Link to={`/listchildren/update/${child._id}`} className="btn btn-sm btn-primary" value={child._id}><i className="bi bi-pencil"></i></Link>
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
