import { React } from 'react'
import axios from 'axios'

export const DeliverableAPI = () => {

    const getDeliverable = () => {
        axios.get('http://localhost:4000/deliverables/').then(res => {
            console.log(res)
        })
    }

    const postDeliverable = () => {

        var deliverable = {
             house: "620f42b212ae7571cfedecdc",
        isPickup : false,
        date: "15-03-2022",
        }

        axios.post('http://localhost:4000/deliverables/', deliverable).then(res => {
            console.log(res)
        })
    }

    const deleteDeliverable = () => {

        var id = "620fb89ca3a1a485d0df371a"

        axios.delete(`http://localhost:4000/deliverables/` + id).then(res => {
            console.log(res)
        })
    }

    const updateDeliverable = () => {

        var deliverable = {
           date:"20-03-2022"
        }
        var id = "620fba894a453290cb1c01cf";

        axios.put(`http://localhost:4000/deliverables/` + id, deliverable).then(res => {
            console.log(res)
        })
    }

    const getDeliverableById = () => {
        var id = "620fba894a453290cb1c01cf";

        axios.get('http://localhost:4000/deliverables/' + id).then(res => {
            console.log(res)
        })
    }

    return (
        <>
            <h3 className="my-3">Deliverable API</h3>
            <input type="button" className="btn btn-primary mx-3" value="get deliverable" onClick={getDeliverable} />
            <input type="button" className="btn btn-primary mx-3" value="post deliverable" onClick={postDeliverable} />
            <input type="button" className="btn btn-primary mx-3" value="delete deliverable" onClick={deleteDeliverable} />
            <input type="button" className="btn btn-primary mx-3" value="update deliverable" onClick={updateDeliverable} />
            <input type="button" className="btn btn-primary mx-3" value="get deliverable by Id" onClick={getDeliverableById} />

        </>
    )
}