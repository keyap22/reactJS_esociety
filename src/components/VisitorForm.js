import React, { useState } from 'react'
import axios from 'axios'

export const VisitorForm = () => {

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
    const [isPickup, setIsPickup] = useState()

    const [visitorCategoryList, setVisitorCategoryList] = useState([])
    const [houseList, sethouseList] = useState([])

    const [isVisitor, setIsVisitor] = useState(true)

    var Visitor = {
        visitorName: visitorName,
        purpose: purpose,
        mobileNo: contactNumber,
        date: date.toString(),
        entryTime: entryTime.toString(),
        exitTime: exitTime.toString(),
        profilePhoto: profilePhoto,
        isAllowed: isAllowed,
        isPreScheduled: isPreScheduled,
        house: house,
        visitorCategory: visitorCategory
    }

    var deliverable = {
        isPickup: isPickup,
        house: house,
        date: date.toString(),
    }

    const dateHandler = (e) => {
        //var currentdate = new Date();
        //var date = currentdate.getDate() + "/" + (currentdate.getMonth() + 1) + "/" + currentdate.getFullYear()
        //setDate(date)
        setDate(e.target.value)
    }

    const entryTimeHandler = (e) => {
        //var currentTime = new Date();
        //var time = currentTime.getHours() + ":" + currentTime.getMinutes() + ":" + currentTime.getSeconds()
        //setEntryTime(currentTime)
        setEntryTime(e.target.value)
    }

    const exitTimeHandler = (e) => {
        //var currentTime = new Date();
        //var time = currentTime.getHours() + ":" + currentTime.getMinutes() + ":" + currentTime.getSeconds()
        //setExitTime(time)
        setExitTime(e.target.value)
    }

    const contactNumberHandler = (e) => {
        //console.log(e.target.value)
        setContactNumber(e.target.value)
    }

    const visitorCategoryHandler = (e) => {
        //console.log(e.target.value)
        setVisitorCategory(e.target.value)
    }

    const profilePhotoHandler = (e) => {
        console.log(e.target.files[0].name)
        setProfilePhoto(e.target.files[0].name)
        }

    const isPreScheduledHandler = (e) => {
        setIsPreScheduled(e.target.value)
    }

    const houseHandler = (e) => {
        console.log("House id : ", e.target.value)
        setHouse(e.target.value)
    }

    const isAllowedHandler = (e) => {
        setIsAllowed(e.target.value)
    }

    const isPickupHandler = (e) => {
        setIsPickup(e.target.value)
    }

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

    const submitVisitor = (e) => {
        e.preventDefault()

        axios.post('http://localhost:4000/visitors/', Visitor).then(res => {
            console.log(res)
            console.log(res.data.status)
        })

        console.log("submit called.....")
        //console.log(`email : ${email}, password : ${password},password2 : ${password2}, first name : ${firstName}, last name : ${lastName}`)
        //console.log(`contact number : ${contactNumber}, role : ${role}, profile photo : ${profilePhoto}`)
        console.log(`visitor category : ${visitorCategory}`)
        console.log(`is allowed : ${isAllowed}, is pre-scheduled : ${isPreScheduled}`)
        //console.log(e.target)
        alert("Visitor added successfully!")

        //clearing out the details of the form after pressing submit button
        e.target.reset()
    }

    const submitDeliverable = (e) => {
        e.preventDefault()
        axios.post('http://localhost:4000/deliverables/', deliverable).then(res => {
            console.log(res)
            console.log(res.data.status)
        })
        console.log("submit called.....")
        alert("Deliverable added successfully!")

        //clearing out the details of the form after pressing submit button
        e.target.reset()
    }

    const visitorSelected = (e) => {
        setIsVisitor(true)
    }

    const deliverableSelected = (e) => {
        setIsVisitor(false)
    }

    return (
        <section id="services" className="services section-bg">

            <div className='mycard my-5 '>
                <div className="align-items-center" >

                    <div className="container my-3" style={{marginLeft : "520px"}}>
                        <input className="radios mx-2" type="radio" name="radios" value="Visitor" onClick={(e) => visitorSelected(e)} />
                        <label className="radios mx-2">ADD VISITOR</label>

                        <input className="radios mx-2" type="radio" name="radios" value="Deliverable" onClick={(e) => deliverableSelected(e)} />
                        <label className="radios mx-2">ADD DELIVERABLE</label>
                    </div>

                    <form style={{ display: `${isVisitor ? "block" : "none"}` }} className="form-horizontal" method="post" align="center" id="visitorForm" onSubmit={submitVisitor}>

                        <h3 className="align-title my-3"><strong>ADD VISITOR</strong></h3>


                        <div className="form-group row my-3 mr-2 mb-3">
                            <label className="col-sm-2 col-form-label"><strong>Visitor Name  </strong></label>
                            <div className="col-sm-10">
                                <input type="text" id="visitorName" className="form-control" name="VisitorName"
                                    placeholder="Enter Visitor's Name" required
                                    onChange={(e) => { setVisitorName(e.target.value) }} />
                            </div>
                        </div>

                        <div className="form-group row my-3 mr-2 mb-3">
                            <label className="col-sm-2 col-form-label"><strong>Purpose  </strong></label>
                            <div className="col-sm-10">
                                <textarea id="purpose" className="form-control" name="Purpose" rows="4" cols="50"
                                    placeholder="Enter Visitor's Purpose" required
                                    onChange={(e) => { setPurpose(e.target.value) }} />
                            </div>
                        </div>

                        <div className="form-group row my-3 mr-2 mb-3">
                            <label className="col-sm-2 col-form-label"><strong>isAllowed  </strong></label>
                            <div className="form-check col-sm-10 my-1">
                                <input type="radio" className="mx-3" name="isAllowed" value="true" onClick={(e) => { isAllowedHandler(e) }} />Yes
                                <input type="radio" className="mx-3" name="isAllowed" value="false" onClick={(e) => { isAllowedHandler(e) }} />No
                            </div>
                        </div>

                        <div className="form-group row my-3 mr-2 mb-3">
                            <label className="col-sm-2 col-form-label"><strong>isPreScheduled  </strong></label>
                            <div className="form-check col-sm-10 my-1">
                                <input type="radio" className="mx-3" name="isPreScheduled" value="true" onClick={(e) => { isPreScheduledHandler(e) }} />Yes
                                <input type="radio" className="mx-3" name="isPreScheduled" value="false" onClick={(e) => { isPreScheduledHandler(e) }} />No
                            </div>
                        </div>

                        <div className="form-group row my-3 mr-2 mb-3">
                            <label className="col-sm-2 col-form-label"><strong>Date </strong></label>
                            <div className="col-sm-10">
                                <input type="date" id="date" className="form-control" name="Date"
                                    required onChange={(e) => { dateHandler(e) }} />
                            </div>
                        </div>

                        <div className="form-group row my-3 mr-2 mb-3">
                            <label className="col-sm-2 col-form-label"><strong>Entry Time </strong></label>
                            <div className="col-sm-10">
                                <input type="time" id="entrytime" className="form-control" name="EntryTime"
                                    required onChange={(e) => { entryTimeHandler(e) }} />
                            </div>
                        </div>

                        <div className="form-group row my-3 mr-2 mb-3">
                            <label className="col-sm-2 col-form-label"><strong>Exit Time </strong></label>
                            <div className="col-sm-10">
                                <input type="time" id="exittime" className="form-control" name="ExitTime"
                                    required onChange={(e) => { exitTimeHandler(e) }} />
                            </div>
                        </div>

                        <div className="form-group row my-3 mr-2 mb-3">
                            <label className="col-sm-2 col-form-label"><strong>Contact Number  </strong></label>
                            <div className="col-sm-10">
                                <input type="tel" id="ContactNumber" className="form-control" name="contactNumber"
                                    placeholder="Enter Visitor Mobile Number" required onChange={(e) => { contactNumberHandler(e) }} />
                            </div>
                        </div>

                        <div className="form-group row my-3 mr-2 mb-3">
                            <label className="col-sm-2 col-form-label"><strong>Visitor Category  </strong></label>
                            <div className="col-sm-10">
                                <select className="form-select" id="visitorcategory" required onClick={(e) => { displayVisitorCategory(e) }} onChange={(e) => { visitorCategoryHandler(e) }}>
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
                                    placeholder="Upload Visitor Profile Photo" onChange={(e => { profilePhotoHandler(e) })} />
                                     {
                                    profilePhoto.includes(".png") || profilePhoto.includes(".jpg") ||profilePhoto.includes(".jpeg") ?  "":"Please enter valid image" 
                                }
                            </div>
                        </div>

                        <div className="form-group row my-3 mr-2 mb-3">
                            <label className="col-sm-2 col-form-label"><strong>House Title  </strong></label>
                            <div className="col-sm-10">
                                <select className="form-select" id="house" required onClick={(e) => { displayHouse(e) }} onChange={(e) => { houseHandler(e) }}>
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
                        </div>



                        <div className="form-grp row my-3">
                            <div className="col-sm-10">
                                <input type="submit" className='btn-centre' value="Add Visitor" />
                            </div>
                        </div>
                    </form>

                    <form style={{ display: `${isVisitor ? "none" : "block"}` }} className="form-horizontal deliverable" align="center" method="post" id="deliverableForm" onSubmit={submitDeliverable}>

                        <h3 className="align-title my-5"><strong>ADD DELIVERABLE</strong></h3>

                        <div className="form-group row my-3 mr-2 mb-3">
                            <label className="col-sm-2 col-form-label"><strong>Date </strong></label>
                            <div className="col-sm-10">
                                <input type="date" id="date" className="form-control" name="Date"
                                    required onChange={(e) => { dateHandler(e) }} />
                            </div>
                        </div>

                        <div className="form-group row my-3 mr-2 mb-3">
                            <label className="col-sm-2 col-form-label"><strong>House Title  </strong></label>
                            <div className="col-sm-10">
                                <select className="form-select" id="house" required onClick={(e) => { displayHouse(e) }} onChange={(e) => { houseHandler(e) }}>
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
                        </div>

                        <div className="form-group row my-3 mr-2 mb-3">
                            <label className="col-sm-2 col-form-label"><strong>isPickup  </strong></label>
                            <div className="form-check col-sm-10 my-1">
                                <input type="radio" className="mx-3" name="isPickup" value="true" onClick={(e) => { isPickupHandler(e) }} />Yes
                                <input type="radio" className="mx-3" name="isPickup" value="false" onClick={(e) => { isPickupHandler(e) }} />No
                            </div>
                        </div>

                        <div className="form-grp row my-3">
                            <div className="col-sm-10">
                                <input type="submit" className='btn-centre' value="Add Deliverable" />
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        </section>
    )
}