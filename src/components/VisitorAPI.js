import { React } from 'react'
import axios from 'axios'

export const VisitorAPI = () => {

    const getVisitor = () => {
        axios.get('http://localhost:4000/visitors/').then(res => {
            console.log(res)
        })
    }

    const postVisitor = () => {

        var Visitor = {
            purpose : "deliver milk",
            isAllowed : "true",
            date : "08/03/2022",
            visitorName: 'y',
            house : "6210bc00af171efad4239afd",
            visitorCategory : "621080d4df09ca2d45e3c165",
            entryTime : "19:18:06",
            exitTime : "19:25:08",
            mobileNo : "9876543210",
            isPreScheduled : "true"
        }

        axios.post('http://localhost:4000/visitors/', Visitor).then(res => {
            console.log(res)
        })
    }

    const deleteVisitor = () => {

        var id = "6210bf12bdd7bb1f5c88b6a1"

        axios.delete(`http://localhost:4000/visitors/` + id).then(res => {
            console.log(res)
        })
    }

    const updateVisitor = () => {

        var Visitor = {
            visitorName: 'x'
        }
        var id = "6210bf12bdd7bb1f5c88b6a1";

        axios.put(`http://localhost:4000/visitors/` + id, Visitor).then(res => {
            console.log(res)
        })
    }

    const getVisitorByID = () => {
        var id = "6210bf12bdd7bb1f5c88b6a1"
        axios.get(`http://localhost:4000/visitors/` + id).then(res => {
            console.log(res)
        })
    }

    return (
        <>
            <h3 className="my-3">Visitor API</h3>
            <input type="button" className="btn btn-primary mx-3" value="get visitors" onClick={getVisitor} />
            <input type="button" className="btn btn-primary mx-3" value="post visitor" onClick={postVisitor} />
            <input type="button" className="btn btn-primary mx-3" value="delete visitor" onClick={deleteVisitor} />
            <input type="button" className="btn btn-primary mx-3" value="update visitor" onClick={updateVisitor} />
            <input type="button" className="btn btn-primary mx-3" value="get visitor by ID" onClick={getVisitorByID} />
        </>
    )
}