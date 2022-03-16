import React, { useState } from 'react'
import axios from 'axios'

export const VehicleForm = () => {


    const [userList, setuserList] = useState([])


    const [parkingID, setParkingID] = useState('')
    const [vehicleNo, setVehicleNo] = useState('')
    const [vehicleType, setVehicleType] = useState('')
    const [user, setUser] = useState('')
    

    const getUsers = () => {
        axios.get("http://localhost:4000/users/").then(res => {
            console.log(res.data.data)
            setuserList(res.data.data)
           })

    }


    const parkingHandler = (e) => {

        console.log(e.target.value)
        setParkingID(e.target.value)
    }

    const submit = (e) => {

        e.preventDefault()
        var formdata = {
            parkingId : parkingID,
            vehicleType : vehicleType,
            user : user,
            vehicleNo : vehicleNo
        }

        console.log(`user : ${user} , vehicleNo : ${vehicleNo}, vehicleType : ${vehicleType}`)
      
       axios.post('http://localhost:4000/vehicles/', formdata).then(res => {
            console.log(res)
            if (res.data.status === 200) {
                console.log("vehicle added  successfully")
              
               
                
            }
            else if (res.data.status === -1) {

                console.log("Incorrect credentials.....Please enter correct credentials")

               
            }
        })
         //clearing out the details of the form after pressing submit button
         e.target.reset()

        console.log("submit called.....")
    }

    return (
        <section id="services" className="services section-bg">

            <div className='mycard my-5 '>
                <div className="form-center " >

                    <form className="vehicle-form" align="center" onSubmit={submit}>

                        <h4 className="align-title my-5"><strong>Add Vehicle</strong></h4>


                        <div className="form-group row my-3 mr-2 mb-3 ">
                            <label htmlFor="parkingID" className="col-sm-2 col-form-label"><strong>Parking ID</strong></label>
                            <div className="col-sm-9 ml-3">
                                <input type="text" id="parkingID" className="form-control" name="parkingID"
                                    placeholder="Enter Parking Number" required onChange={(e) => { parkingHandler(e) }} />
                            </div>
                        </div>

                        <div className="form-group row my-3 mr-2 mb-3">
                            <label htmlFor="vehicleNo" className="col-sm-2 col-form-label"><strong>Vehicle No</strong></label>
                            <div className="formField col-sm-9 ml-3">
                                <input type="vehicleNo" id="vehicleNo" className="form-control md-9" name="vehicleNo"
                                    placeholder="Enter your vehicleNo" required onChange={(e) => { setVehicleNo(e.target.value) }} />
                                <div className="md-3"> </div>

                            </div>
                        </div>

                        <div className="form-group row my-3 mr-2 mb-3">
                            <label htmlFor="vehicleType" className="col-sm-2 col-form-label"><strong>Vehicle Type</strong></label>
                            <div className="formField col-sm-9 ml-3">
                                <div className="col-sm-10">
                                    <select className="form-select" id="vehicleType" required  onChange={(e) => { setVehicleType(e.target.value)}}>
                                        <option>Select Vehicle Type</option>
                                        <option value="two wheeler">2 - wheeler</option>
                                        <option value="three wheeler">3 - wheeler</option>
                                        <option value="four wheeler">4 - wheeler</option>

                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="form-group row my-3 mr-2 mb-3">
                            <label htmlFor="user" className="col-sm-2 col-form-label"><strong>Vehicle Owner</strong></label>
                            <div className="formField col-sm-9 ml-3">
                                <div className="col-sm-10">
                                    <select className="form-select" id="user" required onClick={(e) => { getUsers(e) }} onChange={(e) => setUser(e.target.value)}>
                                        <option>Please Select</option>
                                        {
                                        userList.map((user) => {

                                            return (
                                                <option value={user._id}>{user.firstName + user.lastName}</option>
                                            )
                                        })
                                    }
                                    </select>
                                </div>
                            </div>
                        </div>



                        <div className="my-5">
                            <input type="submit" className='btn-centre' value="Add" /><br />

                        </div>


                    </form>
                </div>
            </div>
        </section>

    )
}
