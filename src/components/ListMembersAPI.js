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

    
    return (
        <div className="container">
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Mobile</th>
                        <th scope="col">House</th>    
                    <th scope="col">Age</th>
                        
                        
                        
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {

                        memberList.map((member) => {

                            return (
                                <tr>
                                    <th scope="row">{member._id}</th>
                                    <td>{member.memberName}</td>
                                   <td>{member.user.email}</td>
                                    <td>{member.user.mobileNo}</td>
                                    <td>{member.house.houseTitle}</td>
                                   
                                    <td>{member.age}</td>
                                   
                                    
                                    <td></td>
                                    
                                    <td>
                                        <button className = "btn btn-danger">DELETE</button>
                                        <button className = "btn btn-primary">UPDATE</button>
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