import { React } from 'react'
import axios from 'axios'

export const VehicleAPI = () => {

    const getVehicle = () => {
        axios.get('http://localhost:4000/vehicles/').then(res => {
            console.log(res)
        })
    }

    const postVehicle = () => {

        var vehicle = {
            vehicleNo: "GJ01JF1111",
            parkingId: "111",
            vehicleType : "2 wheeler",
            user: "620f3bbe1424f45461f2b42d"
        }

        axios.post('http://localhost:4000/vehicles/', vehicle).then(res => {
            console.log(res)
        })
    }

    const deleteVehicle = () => {

        var id = "62108d3930be72387db600da"

        axios.delete(`http://localhost:4000/vehicles/` + id).then(res => {
            console.log(res)
        })
    }

    const updateVehicle = () => {

        var vehicle = {
           parkingId : "667"}
        var id = "6227444d63ecc7dd7c15baf1";

        axios.put(`http://localhost:4000/vehicles/` + id, vehicle).then(res => {
            console.log(res)
        })
    }

    const getVehicleById = () => {
        var id = "6227444d63ecc7dd7c15baf1";

        axios.get('http://localhost:4000/vehicles/' + id).then(res => {
            console.log(res)
        })
    }

    return (
        <>
            <h3 className="my-3">Vehicle API</h3>
            <input type="button" className="btn btn-primary mx-3" value="get vehicle" onClick={getVehicle} />
            <input type="button" className="btn btn-primary mx-3" value="post vehicle" onClick={postVehicle} />
            <input type="button" className="btn btn-primary mx-3" value="delete vehicle" onClick={deleteVehicle} />
            <input type="button" className="btn btn-primary mx-3" value="update vehicle" onClick={updateVehicle} />
            <input type="button" className="btn btn-primary mx-3" value="get vehicle by Id" onClick={getVehicleById} />

        </>
    )
}