import React, { useEffect, useState } from 'react'
import axios from 'axios'


export const ListMembersAPI = () => {
    const [memberList, setmemberList] = useState([])

    const getData = () => {
        axios.get("http://localhost:4000/members/").then(res => {
            console.log(res.data.data)
            setmemberList(res.data.data)
        })

    }
    useEffect(() => {
        getData()
    }, [])
    var counter = 0

    return (
        <div className="container">
            <table className="table my-3">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Sr. No.</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Contact Number</th>
                        <th scope="col">House Title</th>
                        <th scope="col">Age</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        memberList.map((member) => {
                            counter += 1
                            return (
                                <tr>
                                    {/* <th scope="row">{member.user.firstName}</th> */}
                                    <th scope="row">{counter}</th>
                                    <td>{member.user.firstName}</td>
                                    <td>{member.user.lastName}</td>
                                    <td>{member.user.email}</td>
                                    <td>{member.user.mobileNo}</td>
                                    <td>{member.house.houseTitle}</td>
                                    <td>{member.age}</td>
                                    <td>
                                        <button className="btn btn-danger mx-2">DELETE</button>
                                        <button className="btn btn-primary">UPDATE</button>
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