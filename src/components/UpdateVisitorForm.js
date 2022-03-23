import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router'
import { useNavigate } from 'react-router-dom'

export const UpdateVisitorForm = () => {

    var visitorId = useParams().id

    const navigation = useNavigate()

    useEffect(() => {

        getVisitorByID()

    }, [visitorId])

    const [visitorName, setVisitorName] = useState('')
    const [purpose, setPurpose] = useState('')
    const [date, setDate] = useState('')
    const [entryTime, setEntryTime] = useState('')
    const [exitTime, setExitTime] = useState('')
    const [contactNumber, setContactNumber] = useState('')
    const [visitorCategory, setVisitorCategory] = useState('')
    const [isAllowed, setIsAllowed] = useState()
    const [isPreScheduled, setIsPreScheduled] = useState()
    const [house, setHouse] = useState()
    const [profilePhoto, setProfilePhoto] = useState('')

    const [visitorCategoryList, setVisitorCategoryList] = useState([])
    const [houseList, sethouseList] = useState([])
    const [visitorList, setvisitorList] = useState([])

    const displayVisitorCategory = () => {
        axios.get("http://localhost:4000/categories/").then(res => {
            //console.log(res.data.data)
            setVisitorCategoryList(res.data.data)
        })
    }

    const displayHouse = () => {
        axios.get("http://localhost:4000/houses/").then(res => {
            //console.log(res.data.data)
            sethouseList(res.data.data)
        })
    }

    var finalvn, finaldate, finalpurpose, finalst, finalmob, finalet, finalisa, finalisps;

    const getVisitorByID = () => {

        axios.get(`http://localhost:4000/visitors/` + visitorId).then(res => {
            console.log("get visitor by id response : ", res)
            setvisitorList(res.data.data)
        })
    }

    const submitVisitor = (e) => {
        e.preventDefault()

        finalmob = contactNumber === "" ? visitorList.mobileNo : contactNumber
        finalvn = visitorName === "" ? visitorList.visitorName : visitorName
        finalpurpose = purpose === "" ? visitorList.purpose : purpose
        finaldate = date === "" ? visitorList.date : date
        finalst = entryTime === "" ? visitorList.entryTime : entryTime
        finalet = exitTime === "" ? visitorList.exitTime : exitTime
        finalisa = isAllowed  === "" ? visitorList.isAllowed : isAllowed
        finalisps = isPreScheduled === "" ? visitorList.isPreScheduled : isPreScheduled

        var Visitor = {
            visitorName: finalvn,
            purpose: finalpurpose,
            mobileNo: finalmob,
            date: finaldate.toString(),
            entryTime: finalst.toString(),
            exitTime: finalet.toString(),
            isAllowed: finalisa,
            isPreScheduled: finalisps,
        }

        axios.put(`http://localhost:4000/visitors/` + visitorId, Visitor).then(res => {
            console.log(res)
            console.log(res.data.status)
        })

        console.log("submit called.....")
        //console.log(`email : ${email}, password : ${password},password2 : ${password2}, first name : ${firstName}, last name : ${lastName}`)
        //console.log(`contact number : ${contactNumber}, role : ${role}, profile photo : ${profilePhoto}`)
        console.log(`visitor category : ${visitorCategory}`)
        console.log(`is allowed : ${isAllowed}, is pre-scheduled : ${isPreScheduled}`)
        //console.log(e.target)
        alert("Visitor updated successfully!")
        navigation('/listvisitors')

        //clearing out the details of the form after pressing submit button
        e.target.reset()
    }

    return (
        <section id="services" className="services section-bg">

            <div className='mycard my-5 '>
                <div className="align-items-center" >

                    <form className="form-horizontal" method="post" align="center" id="visitorForm" onSubmit={submitVisitor}>

                        <h3 className="align-title my-3"><strong>UPDATE VISITOR DETAILS</strong></h3>


                        <div className="form-group row my-3 mr-2 mb-3">
                            <label className="col-sm-2 col-form-label"><strong>Visitor Name  </strong></label>
                            <div className="col-sm-10">
                                <input type="text" id="visitorName" className="form-control" name="VisitorName"
                                    placeholder="Enter Visitor's Name" required defaultValue={visitorList.visitorName}
                                    onChange={(e) => { setVisitorName(e.target.value) }} />
                            </div>
                        </div>

                        <div className="form-group row my-3 mr-2 mb-3">
                            <label className="col-sm-2 col-form-label"><strong>Purpose  </strong></label>
                            <div className="col-sm-10">
                                <textarea id="purpose" className="form-control" name="Purpose" rows="4" cols="50"
                                    placeholder="Enter Visitor's Purpose" required defaultValue={visitorList.purpose}
                                    onChange={(e) => { setPurpose(e.target.value) }} />
                            </div>
                        </div>

                        <div className="form-group row my-3 mr-2 mb-3">
                            <label className="col-sm-2 col-form-label"><strong>isAllowed  </strong></label>
                            <div className="form-check col-sm-10 my-1">
                                <input type="radio" className="mx-3" name="isAllowed" value="true" onClick={(e) => { setIsAllowed(e.target.value) }} />Yes
                                <input type="radio" className="mx-3" name="isAllowed" value="false" onClick={(e) => { setIsAllowed(e.target.value) }} />No
                            </div>
                        </div>

                        <div className="form-group row my-3 mr-2 mb-3">
                            <label className="col-sm-2 col-form-label"><strong>isPreScheduled  </strong></label>
                            <div className="form-check col-sm-10 my-1">
                                <input type="radio" className="mx-3" name="isPreScheduled" value="true" onClick={(e) => { setIsPreScheduled(e.target.value) }} />Yes
                                <input type="radio" className="mx-3" name="isPreScheduled" value="false" onClick={(e) => { setIsPreScheduled(e.target.value) }} />No
                            </div>
                        </div>

                        <div className="form-group row my-3 mr-2 mb-3">
                            <label className="col-sm-2 col-form-label"><strong>Date </strong></label>
                            <div className="col-sm-10">
                                <input type="date" id="date" className="form-control" name="Date" defaultValue={visitorList.date}
                                    required onChange={(e) => { setDate(e.target.value) }} />
                            </div>
                        </div>

                        <div className="form-group row my-3 mr-2 mb-3">
                            <label className="col-sm-2 col-form-label"><strong>Entry Time </strong></label>
                            <div className="col-sm-10">
                                <input type="time" id="entrytime" className="form-control" name="EntryTime" defaultValue={visitorList.entryTime}
                                    required onChange={(e) => { setEntryTime(e.target.value) }} />
                            </div>
                        </div>

                        <div className="form-group row my-3 mr-2 mb-3">
                            <label className="col-sm-2 col-form-label"><strong>Exit Time </strong></label>
                            <div className="col-sm-10">
                                <input type="time" id="exittime" className="form-control" name="ExitTime" defaultValue={visitorList.exitTime}
                                    required onChange={(e) => { setExitTime(e.target.value) }} />
                            </div>
                        </div>

                        <div className="form-group row my-3 mr-2 mb-3">
                            <label className="col-sm-2 col-form-label"><strong>Contact Number  </strong></label>
                            <div className="col-sm-10">
                                <input type="tel" id="ContactNumber" className="form-control" name="contactNumber" defaultValue={visitorList.mobileNo}
                                    placeholder="Enter Visitor Mobile Number" required onChange={(e) => { setContactNumber(e.target.value) }} />
                            </div>
                        </div>

                        {/* <div className="form-group row my-3 mr-2 mb-3">
                            <label className="col-sm-2 col-form-label"><strong>Visitor Category  </strong></label>
                            <div className="col-sm-10">
                                <select className="form-select" id="visitorcategory" required onClick={(e) => { displayVisitorCategory(e) }}
                                    onChange={(e) => { setVisitorCategory(e.target.value) }}>

                                    <option>Select visitor category</option>
                                    {
                                        visitorCategoryList.map((visitorCategory) => {

                                            return (
                                                <option value={visitorCategory._id}>{visitorCategory.categoryName}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                        </div>

                        <div className="form-group row my-3 mr-2 mb-3">
                            <label className="col-sm-2 col-form-label"><strong>Profile Photo  </strong></label>
                            <div className="col-sm-10">
                                <input type="file" id="ProfilePhoto" className="form-control-file" name="profilePhoto"
                                    placeholder="Upload Visitor Profile Photo" onChange={(e => { setProfilePhoto("D:/esociety_images/visitor" + e.target.files[0].name) })} />
                            </div>
                        </div>

                        <div className="form-group row my-3 mr-2 mb-3">
                            <label className="col-sm-2 col-form-label"><strong>House Title  </strong></label>
                            <div className="col-sm-10">
                                <select className="form-select" id="house" required
                                    onClick={(e) => { displayHouse(e) }} onChange={(e) => { setHouse(e.target.value) }}>

                                    <option>Select your house title</option>
                                    {
                                        houseList.map((house) => {

                                            return (
                                                <option value={house._id}>{house.houseTitle}</option>
                                            )
                                        })
                                    }
                                </select>

                            </div>
                        </div> */}

                        <div className="form-grp row my-3">
                            <div className="col-sm-10">
                                <input type="submit" className='btn-centre' value="Update Visitor" />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}