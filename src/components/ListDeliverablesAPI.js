import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export const ListDeliverablesAPI = () => {
    const [deliverablesList, setdeliverablesList] = useState([])
    const [search, setSearch] = useState('');


    const getData = () => {
        axios.get("http://localhost:4000/deliverables/").then(res => {
            console.log(res.data.data)
            setdeliverablesList(res.data.data)
        })
    }

    useEffect(() => {
        console.log("use effect hook implemented")
        getData()
    }, [])

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
                        <th scope="col">House</th>
                        <th scope="col">Date</th>
                        <th scope="col">Pick up</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        search === "" ?

                            deliverablesList.map((deliverables) => {
                                console.log("search : " + search)
                                counter += 1
                                return (
                                    <tr key={deliverables._id}>
                                        {/* <th scope="row">{member.user.firstName}</th> */}
                                        <th scope="row">{counter}</th>
                                        <td>{deliverables.house.houseTitle}</td>
                                        <td>{deliverables.date}</td>
                                        <td>{deliverables.ispickup ? <i className="bi bi-check-lg"></i> : <i className="bi bi-x-lg"></i>}</td>

                                    </tr>
                                )
                            }) :
                            deliverablesList.map((deliverables) => {
                                counter += 1
                                console.log("filter")
                                if ((deliverables.house.houseTitle).includes(search) || (deliverables.date).includes(search)) {

                                    //|| (deliverables.ispickup).includes(search)
                                    console.log("search : " + search)
                                    return (
                                        <tr key={deliverables._id}>
                                            {/* <th scope="row">{member.user.firstName}</th> */}
                                            <th scope="row">{counter}</th>
                                            <td>{deliverables.house.houseTitle}</td>
                                            <td>{deliverables.date}</td>
                                            <td>{deliverables.ispickup ? <i className="bi bi-check-lg"></i> : <i className="bi bi-x-lg"></i>}</td>

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
