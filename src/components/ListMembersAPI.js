import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export const ListMembersAPI = () => {
    const [memberList, setmemberList] = useState([])
    const [search, setSearch] = useState('');
    const [SortedData, setSortedData] = useState('');
    var sortedData = ""
    var direction = 'ascending'
    var counter = 0

    const deleteMember = (memberID, userID, name) => {

        var confirmationResult = window.confirm(`Are you sure you want to delete the record of ${name}?`)
        if (confirmationResult)     //if confirmationResult===true
        {
            console.log(memberID)
            console.log(userID)

            axios.delete(`http://localhost:4000/members/` + memberID).then(res => {
                console.log(res)
            })

            axios.delete(`http://localhost:4000/users/` + userID).then(res => {
                console.log(res)
            })
            window.location.reload();
        }
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
        getData()
    }, [])

    const sortfn = (e) => {

        let sortedData = memberList

        sortedData.sort((a, b) => {
            if (a.memberName < b.memberName) {
                return direction === 'ascending' ? -1 : 1;
            }
            if (a.memberName > b.memberName) {
                return direction === 'ascending' ? 1 : -1;
            }
            return 0
        })
        setSortedData(sortedData)
        console.log("sorted data : ", sortedData)
    }

    const sortAge = (e, direction) => {

        //var direction = 'ascending';
        if (SortedData === "") {
            sortedData = memberList

        } else {
            sortedData = SortedData
        }
        sortedData.sort((a, b) => {
            if (a.age < b.age) {
                return direction === 'ascending' ? -1 : 1;
                //return -1;
            }
            if (a.age > b.age) {
                return direction === 'ascending' ? 1 : -1;
                //return 1;
            }
            return 0
        })
        setSortedData(sortedData)
        console.log("sorted data : ", sortedData)
        //return SortedData
    }

    const sortHouse = (e, direction) => {
        sortedData = memberList
        sortedData.sort((a, b) => {

            if (a.house.houseTitle < b.house.houseTitle) {
                return direction === 'ascending' ? -1 : 1;
                //return -1;
            }
            if (a.house.houseTitle > b.house.houseTitle) {
                return direction === 'ascending' ? 1 : -1;
                //return 1;
            }
            return 0;
        });
        setSortedData(sortedData)
        console.log("sorted data : ", sortedData)
    }

    const sortemail = (e, direction) => {
        sortedData = memberList
        sortedData.sort((a, b) => {

            if (a.user.email < b.user.email) {
                return direction === 'ascending' ? -1 : 1;
                //return -1;
            }
            if (a.user.email > b.user.email) {
                return direction === 'ascending' ? 1 : -1;
                //return 1;
            }
            return 0;
        });
        setSortedData(sortedData)
        console.log("sorted data : ", sortedData)
    }

    const sortmobno = (e, direction) => {
        sortedData = memberList
        sortedData.sort((a, b) => {

            if (a.user.mobileNo < b.user.mobileNo) {
                return direction === 'ascending' ? -1 : 1;
                //return -1;
            }
            if (a.user.mobileNo > b.user.mobileNo) {
                return direction === 'ascending' ? 1 : -1;
                //return 1;
            }
            return 0;
        });
        setSortedData(sortedData)
        console.log("sorted data : ", sortedData)
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
                        <th scope="col">Sr. No.</th>
                        <th scope="col">First Name<i className="bi bi-arrow-down" onClick={(e) => sortfn(e, "ascending")}></i></th>
                        <th scope="col">Last Name<i className="bi bi-arrow-up" onClick={(e) => sortfn(e, "descending")}></i></th>
                        <th scope="col">Email<i className="bi bi-arrow-down" onClick={(e) => sortemail(e, "ascending")}></i><i className="bi bi-arrow-up" onClick={(e) => sortemail(e, "descending")}></i></th>
                        <th scope="col">Contact Number<i className="bi bi-arrow-down" onClick={(e) => sortmobno(e, "ascending")}></i><i className="bi bi-arrow-up" onClick={(e) => sortmobno(e, "descending")}></i></th>
                        <th scope="col">House Title<i className="bi bi-arrow-down" onClick={(e) => sortHouse(e, "ascending")}></i><i className="bi bi-arrow-up" onClick={(e) => sortHouse(e, "descending")}></i></th>
                        <th scope="col">Age<i className="bi bi-arrow-down" onClick={(e) => sortAge(e, "ascending")}></i><i className="bi bi-arrow-up" onClick={(e) => sortAge(e, "descending")}></i></th>
                        <th scope="col">Profile Photo</th>
                        {localStorage.getItem('roleName') === 'Chairman' || localStorage.getItem('roleName') === 'ADMIN' ?

                            <th scope="col">Action</th> : <></>}
                    </tr>
                </thead>
                <tbody>
                    {search === "" || SortedData === "" ?
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
                                    {localStorage.getItem('roleName') === 'Chairman' || localStorage.getItem('roleName') === 'ADMIN' ?

                                        <td>
                                            <Link to="/listmembers" className="btn btn-sm btn-danger mx-2" onClick={() => { deleteMember(member._id, member.user._id, member.memberName) }}><i className="bi bi-trash"></i></Link>
                                            <Link to={`/update/${member.user._id}/${member._id}`} className="btn btn-sm btn-primary mx-2"><i className="bi bi-pencil"></i></Link>
                                        </td> : <></>}
                                </tr>
                            )
                        }) :
                        memberList.map((member) => {
                            counter += 1
                            console.log("filter")
                            if ((member.house.houseTitle).includes(search) || (member.user.firstName).includes(search) ||
                                (member.user.lastName).includes(search) || (member.user.email).includes(search) ||
                                (member.user.mobileNo).includes(search)) {

                                console.log("search : " + search)

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
                                        {localStorage.getItem('roleName') === 'Chairman' || localStorage.getItem('roleName') === 'ADMIN' ?

                                            <td>
                                                <Link to="/listmembers" className="btn btn-sm btn-danger mx-2" onClick={() => { deleteMember(member._id, member.user._id, member.memberName) }}><i className="bi bi-trash"></i></Link>
                                                <Link to={`/update/${member.user._id}/${member._id}`} className="btn btn-sm btn-primary"><i className="bi bi-pencil"></i></Link>
                                            </td> : <></>}
                                    </tr>
                                )
                            } else if (SortedData !== "") {
                                counter += 1
                                console.log("sorted data")
                                SortedData.map((sortedMember) => {
                                    console.log("sorted member : " + sortedMember)

                                    return (
                                        <tr key={sortedMember._id}>
                                            {/* <th scope="row">{member.user.firstName}</th> */}
                                            <th scope="row">{counter}</th>
                                            <td>{sortedMember.user.firstName}</td>
                                            <td>{sortedMember.user.lastName}</td>
                                            <td>{sortedMember.user.email}</td>
                                            <td>{sortedMember.user.mobileNo}</td>
                                            <td>{sortedMember.house.houseTitle}</td>
                                            <td>{sortedMember.age}</td>
                                            <td><img src={sortedMember.user.profilePhoto} alt="No image" style={{ height: "80px", width: "80px" }}></img></td>
                                            {localStorage.getItem('roleName') === 'Chairman' || localStorage.getItem('roleName') === 'ADMIN' ?

                                                <td>
                                                    <Link to="/listmembers" className="btn btn-sm btn-danger mx-2" onClick={() => { deleteMember(sortedMember._id, sortedMember.user._id, member.memberName) }}><i className="bi bi-trash"></i></Link>
                                                    <Link to={`/update/${sortedMember.user._id}/${sortedMember._id}`} className="btn btn-sm btn-primary"><i className="bi bi-pencil"></i></Link>
                                                </td> : <></>}
                                        </tr>
                                    )
                                })

                            }
                            else {
                                // return(<tr>No data found</tr>)
                            }
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}