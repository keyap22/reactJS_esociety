import React, { useState } from 'react'
import axios from 'axios'

export const ChildScheduleForm = () => {
    
    const [childName, setchildName] = useState('')
    const [age, setAge] = useState('')
    const [contactName, setContactName] = useState('')
    const [contactNo, setContactNo] = useState('')
    const [house,setHouse] = useState('')
    const [profilePhoto,setProfilePhoto] =useState('')
    const [allowedStartingTime, setAllowedStartingTime] =  useState('')
    const [allowedEndingTime, setAllowedEndingTime] =  useState('')
   
    const [houseList , sethouseList] = useState([])
    


    const getHouses = () => {
        axios.get("http://localhost:4000/houses/").then(res => {
            console.log(res.data.data)
            sethouseList(res.data.data)
           })

    }


    const submit = (e) => {

        e.preventDefault()
        var formdata = {
        childName : childName,
        age : age,
        contactName : contactName,
        contactNo : contactNo,
        house : house,
        profilePhoto: profilePhoto,
        allowedStartingTime: allowedStartingTime.toString(),
        allowedEndingTime : allowedEndingTime.toString()   
        }

        console.log(`childName : ${childName} , age : ${age}, start time : ${allowedStartingTime} , house : ${house}`)
      
       axios.post('http://localhost:4000/childSchedules/', formdata).then(res => {
            console.log(res)
            if (res.data.status === 200) {
                console.log("schedule added  successfully")
              
               
                
            }
            else if (res.data.status === -1) {

                console.log("Incorrect details.....Please try again")

                //clearing out the details of the form after pressing submit button
               

            }
        })
        e.target.reset()
        console.log("submit called.....")
    }

    return (
        <section id="services" className="services section-bg">

            <div className='mycard my-5 '>
                <div className="form-horizontal " >

                    <form className="vehicle-form" align="center" onSubmit={submit}>

                        <h4 className="align-title my-5"><strong>Add child Schedule</strong></h4>


                        <div className="form-group row my-3 mr-2 mb-3 ">
                            <label htmlFor="parkingID" className="col-sm-2 col-form-label"><strong>Child Name</strong></label>
                            <div className="col-sm-9 ml-3">
                                <input type="text" id="childName" className="form-control" name="childName"
                                    placeholder="Enter Child Name" required onChange={(e) => { setchildName(e.target.value) }} />
                            </div>
                        </div>

                        <div className="form-group row my-3 mr-2 mb-3">
                            <label htmlFor="age" className="col-sm-2 col-form-label"><strong>Age</strong></label>
                            <div className="formField col-sm-9 ml-3">
                                <input type="number" id="age" className="form-control md-9" name="age"
                                    placeholder="Enter child's age" required onChange={(e) => { setAge(e.target.value) }} />
                                <div className="md-3"> </div>

                            </div>
                        </div>

                        <div className="form-group row my-3 mr-2 mb-3">
                            <label htmlFor="contactName" className="col-sm-2 col-form-label"><strong>Contact Name</strong></label>
                            <div className="formField col-sm-9 ml-3">
                                <input type="text" id="contactName" className="form-control md-9" name="contactName"
                                    placeholder="Enter contact Name" required onChange={(e) => { setContactName(e.target.value) }} />
                                <div className="md-3"> </div>

                            </div>
                        </div>

                        <div className="form-group row my-3 mr-2 mb-3">
                            <label htmlFor="contactNo" className="col-sm-2 col-form-label"><strong>Contact No.</strong></label>
                            <div className="formField col-sm-9 ml-3">
                                <input type="text" id="contactNo" className="form-control md-9" name="contactNo"
                                    placeholder="Enter contact Number" required onChange={(e) => { setContactNo(e.target.value) }} />
                                <div className="md-3"> </div>

                            </div>
                        </div>

                        <div className="form-group row my-3 mr-2 mb-3">
                            <label htmlFor="profilePhoto" className="col-sm-2 col-form-label"><strong>Photo</strong></label>
                            <div className="formField col-sm-9 ml-3">
                                <input type="file" id="profilePhoto" className="form-control md-9" name="profilePhoto"
                                    placeholder="Insert child's photo" required onChange={(e) => { setProfilePhoto(e.target.value) }} />
                                <div className="md-3"> </div>

                            </div>
                        </div>

                        <div className="form-group row my-3 mr-2 mb-3">
                            <label htmlFor="house" className="col-sm-2 col-form-label"><strong>House Number</strong></label>
                            <div className="formField col-sm-9 ml-3">
                                <div className="col-sm-10">
                                    <select className="form-select" id="house" required onClick={(e) => { getHouses(e) }} onChange={(e) => setHouse(e.target.value)}>
                                        <option>Please Select</option>
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
                        </div>

                        <div className="form-group row my-3 mr-2 mb-3">
                            <label htmlFor="startingTime" className="col-sm-2 col-form-label"><strong>Allowed Starting Time</strong></label>
                            <div className="formField col-sm-9 ml-3">
                                <input type="time" id="startingTime" className="form-control md-9" name="startingTime"
                                    placeholder="Enter Starting Time" required onChange={(e) => { setAllowedStartingTime(e.target.value) }} />
                                <div className="md-3"> </div>

                            </div>
                        </div>

                        <div className="form-group row my-3 mr-2 mb-3">
                            <label htmlFor="endingTime" className="col-sm-2 col-form-label"><strong>Allowed Ending Time</strong></label>
                            <div className="formField col-sm-9 ml-3">
                                <input type="time" id="endingTime" className="form-control md-9" name="endingTime"
                                    placeholder="Enter Ending Time" required onChange={(e) => { setAllowedEndingTime(e.target.value) }} />
                                <div className="md-3"> </div>

                            </div>
                        </div>





                        <div className="my-5">
                            <input type="submit" className='btn-centre' value="Add Schedule" /><br />

                        </div>


                    </form>
                </div>
            </div>
        </section>

 )
}
