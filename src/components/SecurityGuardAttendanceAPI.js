import { React } from 'react'
import axios from 'axios'

export const SecurityGuardAttendanceAPI = () => {

    const getGuardAttendances = () => {
        axios.get('http://localhost:4000/guardAttendances/').then(res => {
            console.log(res)
        })
    }

    const postGuardAttendances = () => {

        var GuardAttendances = {
            isPresent : 'true',
            guard : "622729be4ceac4ee8ffb5830",
            date : "08/03/2022"
        }

        axios.post('http://localhost:4000/guardAttendances/', GuardAttendances).then(res => {
            console.log(res)
        })
    }

    const deleteGuardAttendances = () => {

        var id = "62275a494ceac4ee8ffb5834"

        axios.delete(`http://localhost:4000/guardAttendances/` + id).then(res => {
            console.log(res)
        })
    }

    const updateGuardAttendances = () => {

        var GuardAttendances = {
            isPresent: 'false'
        }
        var id = "62275a494ceac4ee8ffb5834";

        axios.put(`http://localhost:4000/guardAttendances/` + id, GuardAttendances).then(res => {
            console.log(res)
        })
    }

    const getGuardAttendancesByID = () => {
        var id = "62275a494ceac4ee8ffb5834"
        axios.get(`http://localhost:4000/guardAttendances/` + id).then(res => {
            console.log(res)
        })
    }

    return (
        <>
            <h3 className="my-3">Guard Attendance API</h3>
            <input type="button" className="btn btn-primary mx-3" value="get Guard Attendances" onClick={getGuardAttendances} />
            <input type="button" className="btn btn-primary mx-3" value="post Guard Attendances" onClick={postGuardAttendances} />
            <input type="button" className="btn btn-primary mx-3" value="delete Guard Attendances" onClick={deleteGuardAttendances} />
            <input type="button" className="btn btn-primary mx-3" value="update Guard Attendances" onClick={updateGuardAttendances} />
            <input type="button" className="btn btn-primary mx-3" value="get Guard Attendances by ID" onClick={getGuardAttendancesByID} />
        </>
    )
}