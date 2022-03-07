import { React } from 'react'
import axios from 'axios'

export const ChildScheduleAPI = () => {

    const getChildSchedule = () => {
        axios.get('http://localhost:4000/childSchedules/').then(res => {
            console.log(res)
        })
    }

    const postChildSchedule = () => {

        var childSchedule = {
            childName: "abc",
            age: 2,
            contactName: "parent",
            contactNo: "1234567890",
            house: "620f42b212ae7571cfedecdc",
            profilePhoto: "",
            allowedStartingTime: "13:00",
            allowedEndingTime: "15:00"
        }

        axios.post('http://localhost:4000/childSchedules/', childSchedule).then(res => {
            console.log(res)
        })
    }

    const deleteChildSchedule = () => {

        var id = "6225ac606d4dfb9cf4bfe679"

        axios.delete(`http://localhost:4000/childSchedules/` + id).then(res => {
            console.log(res)
        })
    }

    const updateChildSchedule = () => {

        var childSchedule = {
            allowedStartingTime: "12:00", allowedEndingTime: "15:00"
        }
        var id = "62260998fe94b5af1b2e30ee";

        axios.put(`http://localhost:4000/childSchedules/` + id, childSchedule).then(res => {
            console.log(res)
        })
    }

    const getChildScheduleById = () => {
        var id = "6214788f5d1539f9aa12bf34";

        axios.get('http://localhost:4000/childSchedules/' + id).then(res => {
            console.log(res)
        })
    }

    return (
        <>
            <h3 className="my-3">ChildSchedule API</h3>
            <input type="button" className="btn btn-primary mx-3" value="get childSchedule" onClick={getChildSchedule} />
            <input type="button" className="btn btn-primary mx-3" value="post childSchedule" onClick={postChildSchedule} />
            <input type="button" className="btn btn-primary mx-3" value="delete childSchedule" onClick={deleteChildSchedule} />
            <input type="button" className="btn btn-primary mx-3" value="update childSchedule" onClick={updateChildSchedule} />
            <input type="button" className="btn btn-primary mx-3" value="get childSchedule by Id" onClick={getChildScheduleById} />

        </>
    )
}