import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export const ListDeliverablesAPI = () => {
    const [deliverablesList, setdeliverablesList] = useState([])
    const [search, setSearch] = useState('');
    const [SortedData, setSortedData] = useState('');
    var sortedData = ""
    var direction = 'ascending'
    var counter = 0

    const sortDate = (e, direction) => {
        sortedData = deliverablesList
        sortedData.sort((a, b) => {

            if (a.date < b.date) {
                return direction === 'ascending' ? -1 : 1;
                //return -1;
            }
            if (a.date > b.date) {
                return direction === 'ascending' ? 1 : -1;
                //return 1;
            }
            return 0;
        });
        setSortedData(sortedData)
        console.log("sorted data : ", sortedData)
    }

    const sortHouse = (e, direction) => {
        sortedData = deliverablesList
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

    const sortIspickup = (e, direction) => {
        sortedData = deliverablesList
        sortedData.sort((a, b) => {

            if (a.isPickup < b.isPickup) {
                return direction === 'ascending' ? -1 : 1;
                //return -1;
            }
            if (a.isPickup > b.isPickup) {
                return direction === 'ascending' ? 1 : -1;
                //return 1;
            }
            return 0;
        });
        setSortedData(sortedData)
        console.log("sorted data : ", sortedData)

    }

    const getData = () => {

        if (localStorage.getItem("roleName") === "Society Member") {
            var data = {
                house: localStorage.getItem("house")
            }
            console.log("house data : ", data)
            axios.post("http://localhost:4000/findDeliverable/", data).then(res => {
                console.log(res.data.data)
                setdeliverablesList(res.data.data)
            })
        }
        else {
            axios.get('http://localhost:4000/deliverables/').then(res => {
                console.log(res)
                setdeliverablesList(res.data.data)
            })
        }
    }

    useEffect(() => {
        getData()
    }, [])

    const handleSearch = (e) => {
        console.log(e.target.value)
        setSearch(e.target.value);
    }

    const deleteDeliverable = (deliverableID, house, date) => {

        console.log(deliverableID)
        var confirmationResult = window.confirm(`Are you sure you want to delete the record of ${house} on ${date}?`)
        if (confirmationResult)     //if confirmationResult===true
        {

            axios.delete(`http://localhost:4000/deliverables/` + deliverableID).then(res => {
                console.log(res)
                alert("Record deleted successfully!")
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
                {/* <caption>DELIVERABLES LIST</caption> */}
                <thead className="table_head">
                    <tr>
                        <th scope="col" className=''>Sr. No.</th>
                        <th scope="col">House Title<i className="bi bi-arrow-down" onClick={(e) => sortHouse(e, "ascending")}></i><i className="bi bi-arrow-up" onClick={(e) => sortHouse(e, "descending")}></i></th>
                        <th scope="col">Date <i className="bi bi-arrow-down" onClick={(e) => sortDate(e, "ascending")}></i><i className="bi bi-arrow-up" onClick={(e) => sortDate(e, "descending")}></i></th>
                        <th scope="col">Pick Up <i className="bi bi-arrow-down" onClick={(e) => sortIspickup(e, "ascending")}></i><i className="bi bi-arrow-up" onClick={(e) => sortIspickup(e, "descending")}></i></th>
                        {localStorage.getItem('roleName') === 'Society Member' ?
                            <th scope="col">Action</th> : ""}
                    </tr>
                </thead>
                <tbody>
                    {
                        search === "" || SortedData === "" ?

                            deliverablesList.map((deliverables) => {
                                console.log("search : " + search)
                                counter += 1
                                return (
                                    <tr key={deliverables._id}>
                                        <th scope="row">{counter}</th>
                                        <td>{deliverables.house.houseTitle}</td>
                                        <td>{deliverables.date}</td>
                                        <td>{deliverables.isPickup ? <i className="bi bi-check-lg"></i> : <i className="bi bi-x-lg"></i>}</td>
                                        {localStorage.getItem('roleName') === 'Society Member' ?
                                            <td>
                                                <Link to="/listdeliverables" className="btn btn-sm btn-danger mx-2" onClick={() => { deleteDeliverable(deliverables._id, deliverables.house.houseTitle, deliverables.date) }}><i className="bi bi-trash"></i></Link>
                                                <Link to={`/update/${deliverables._id}`} className="btn btn-sm btn-primary my-1" value={deliverables._id}><i className="bi bi-pencil"></i></Link>
                                            </td> : ""}
                                    </tr>
                                )
                            }) :
                            deliverablesList.map((deliverables) => {
                                counter += 1
                                console.log("filter")
                                if ((deliverables.house.houseTitle).includes(search) || (deliverables.date).includes(search)) {

                                    console.log("search : " + search)
                                    return (
                                        <tr key={deliverables._id}>
                                            <th scope="row">{counter}</th>
                                            <td>{deliverables.house.houseTitle}</td>
                                            <td>{deliverables.date}</td>
                                            <td>{deliverables.ispickup ? <i className="bi bi-check-lg"></i> : <i className="bi bi-x-lg"></i>}</td>
                                            {localStorage.getItem('roleName') === 'Society Member' ?
                                                <td>
                                                    <Link to="/listdeliverables" className="btn btn-sm btn-danger mx-2" onClick={() => { deleteDeliverable(deliverables._id, deliverables.house.houseTitle, deliverables.date) }}><i className="bi bi-trash"></i></Link>
                                                    <Link to={`/update/${deliverables._id}`} className="btn btn-sm btn-primary my-1" value={deliverables._id}><i className="bi bi-pencil"></i></Link>
                                                </td> : ""}
                                        </tr>
                                    )
                                }
                                else if (SortedData !== "") {
                                    counter += 1
                                    console.log("sorted data")
                                    SortedData.map((sortedDeliverable) => {
                                        console.log("sorted member : " + sortedDeliverable)
                                        return (
                                            <tr key={sortedDeliverable._id}>

                                                <th scope="row">{counter}</th>
                                                <td>{sortedDeliverable.house.houseTitle}</td>
                                                <td>{sortedDeliverable.date}</td>
                                                <td>{sortedDeliverable.ispickup ? <i className="bi bi-check-lg"></i> : <i className="bi bi-x-lg"></i>}</td>
                                                {localStorage.getItem('roleName') === 'Society Member' ?
                                                    <td>
                                                        <Link to="/listdeliverables" className="btn btn-sm btn-danger mx-2" onClick={() => { deleteDeliverable(sortedDeliverable._id, deliverables.house.houseTitle, deliverables.date) }}><i className="bi bi-trash"></i></Link>
                                                        <Link to={`/update/${sortedDeliverable._id}`} className="btn btn-sm btn-primary my-1" value={sortedDeliverable._id}><i className="bi bi-pencil"></i></Link>
                                                    </td> : ""}
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
