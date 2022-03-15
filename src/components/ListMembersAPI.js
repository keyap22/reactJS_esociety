import React, { useEffect, useState } from 'react'
import axios from 'axios'


export const ListMembersAPI = () => {
    const [memberList, setmemberList] = useState([])

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

    const updateMember = (e) => {

        var member = {
            memberName: "ria",
            // age : 20,
            // user : "",
            // house : ""
        }
        var id = e.target.value;

        axios.put(`http://localhost:4000/members/` + id, member).then(res => {
            console.log(res)
        })
    }

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
        <div className="container table-responsive-md ">
            <table className="table table-hover my-3">
                <thead className="table_head">
                    <tr>
                        <th scope="col" className=''>Sr. No.</th>
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
                                        <button className="btn btn-sm btn-danger mx-2" onClick={() => { deleteMember(member._id, member.user._id) }}><i className="bi bi-trash"></i></button>
                                        <button className="btn btn-sm btn-primary" value={member._id} onClick={(e) => { updateMember(e) }}><i className="bi bi-pencil"></i></button>
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