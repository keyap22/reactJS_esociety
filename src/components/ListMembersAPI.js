import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export const ListMembersAPI = () => {
    const [memberList, setmemberList] = useState([])
    const [sortedField, setSortedField] = useState('')
    const [search, setSearch] = useState('');

    let sortedMembers = [...memberList];

    if (sortedField !== null) {
        console.log("field called : ",sortedField)
        sortedMembers.sort((a, b) => {
            if (a[sortedField] < b[sortedField]) {
                console.log(b[sortedField])
                return -1;
            }
            if (a[sortedField] > b[sortedField]) {
                console.log(a[sortedField])
                return 1;
            }
            return 0;
        });
    }

    const deleteMember = (memberID, userID) => {

        console.log(memberID)
        console.log(userID)

        axios.delete(`http://localhost:4000/members/` + memberID).then(res => {
            console.log(res)
        })

        axios.delete(`http://localhost:4000/users/` + userID).then(res => {
            console.log(res)
        })
    }

    const getData = () => {
        axios.get("http://localhost:4000/members/").then(res => {
            console.log(res.data.data)
            setmemberList(res.data.data)
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

    var counter = 0

    const sortedByName = (e) => {
        const { data } = e.target.value
        console.log("data : ", data)
        let sortedData = [...data]
        if (sortedField !== null) {
            sortedData.sort((a, b) => {
                if (a[sortedField] < b[sortedField]) {
                    return -1;
                }
                if (a[sortedField] > b[sortedField]) {
                    return 1;
                }
                return 0
            })
        }
    }

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
                        <th scope="col" >First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Contact Number</th>
                        <th scope="col">House Title</th>
                        <th scope="col" onClick={() => setSortedField('age')}>Age</th>
                        <th scope="col">Profile Photo</th>
                        {localStorage.getItem('roleName') ==='Chairman' || localStorage.getItem('roleName') ==='ADMIN' ?
                                   
                        <th scope="col">Action</th>: <></>}
                    </tr>
                </thead>
                <tbody>
                    {search === "" ?
                        memberList.sort((a, b) => a.email - b.email).map((member) => {
                            console.log("search : " + search)
                            counter += 1
                            return (
                                <tr key={member._id}>
                                    <th scope="row">{counter}</th>
                                    <td>{member.user.firstName}</td>
                                    <td>{member.user.lastName}</td>
                                    <td>{member.user.email}</td>
                                    <td>{member.user.mobileNo}</td>
                                    <td>{member.house.houseTitle}</td>
                                    <td>{member.age}</td>
                                    <td><img src={member.user.profilePhoto} alt="No image" style={{ height: "80px", width: "80px" }}></img></td>
                                    {localStorage.getItem('roleName') ==='Chairman' || localStorage.getItem('roleName') ==='ADMIN' ?
                                   
                                    <td>
                                        <Link to="/listmembers" className="btn btn-sm btn-danger mx-2" onClick={() => { deleteMember(member._id, member.user._id) }}><i className="bi bi-trash"></i></Link>
                                        <Link to={`/update/${member.user._id}/${member._id}`} className="btn btn-sm btn-primary mx-2"><i className="bi bi-pencil"></i></Link>
                                        {/* <Link to="/listmembers" className="btn btn-sm btn-secondary" onClick={(e) => sortedByName(e)}>Name</Link> */}
                                    </td>:<></>}
                                </tr>
                            )
                        }) :
                        memberList.map((member) => {
                            counter += 1
                            console.log("filter")
                            if ((member.house.houseTitle).includes(search) || (member.user.firstName).includes(search) ||
                                (member.user.lastName).includes(search) || (member.user.email).includes(search) ||
                                (member.user.mobileNo).includes(search)) {

                                //|| (member.age).includes(search)
                                console.log("search : " + search)

                                return (
                                    <tr key={member._id}>
                                        {/* <th scope="row">{member.user.firstName}</th> */}
                                        <th scope="row">{counter}</th>
                                        <td>{member.user.firstName}</td>
                                        <td>{member.user.lastName}</td>
                                        <td>{member.user.email}</td>
                                        <td>{member.user.mobileNo}</td>
                                        <td>{member.house.houseTitle}</td>
                                        <td>{member.age}</td>
                                        <td><img src={member.user.profilePhoto} alt="No image" style={{ height: "80px", width: "80px" }}></img></td>
                                        {localStorage.getItem('roleName') ==='Chairman' || localStorage.getItem('roleName') ==='ADMIN' ?
                                   
                                        <td>
                                            <Link to="/listmembers" className="btn btn-sm btn-danger mx-2" onClick={() => { deleteMember(member._id, member.user._id) }}><i className="bi bi-trash"></i></Link>
                                            <Link to={`/update/${member.user._id}/${member._id}`} className="btn btn-sm btn-primary"><i className="bi bi-pencil"></i></Link>
                                            {/* <Link to="/listmembers" className="btn btn-sm btn-secondary" onClick={(e) => sortedByName(e)}>Name</Link> */}
                                        </td>: <></>}
                                    </tr>
                                )
                            } else {
                                // return(<tr>No data found</tr>)
                            }
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}