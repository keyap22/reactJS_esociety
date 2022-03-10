import { React } from 'react'
import axios from 'axios'

export const MemberAPI = () => {

    const getMember = () => {
        axios.get('http://localhost:4000/members/').then(res => {
            console.log(res)
        })
    }

    const postMember = () => {

        var member = {
            memberName: "kia",
            age: 22,
            user: "62131ac4efdec58582ade501",
            house: "6210bc00af171efad4239afd"
        }

        axios.post('http://localhost:4000/members/', member).then(res => {
            console.log(res)
        })
    }

    const deleteMember = () => {

        var id = "6210ef3286916bc9cc669c70"

        axios.delete(`http://localhost:4000/members/` + id).then(res => {
            console.log(res)
        })
    }

    const updateMember = () => {

        var member = {
            memberName: "ria"
        }
        var id = "622740a09d7544ebc551ba15";

        axios.put(`http://localhost:4000/members/` + id, member).then(res => {
            console.log(res)
        })
    }

    const getMemberById = () => {
        var id = "622740a09d7544ebc551ba15";

        axios.get('http://localhost:4000/members/' + id).then(res => {
            console.log(res)
        })
    }

    return (
        <>
            <h3 className="my-3">Member API</h3>
            <input type="button" className="btn btn-primary mx-3" value="get member" onClick={getMember} />
            <input type="button" className="btn btn-primary mx-3" value="post member" onClick={postMember} />
            <input type="button" className="btn btn-primary mx-3" value="delete member" onClick={deleteMember} />
            <input type="button" className="btn btn-primary mx-3" value="update member" onClick={updateMember} />
            <input type="button" className="btn btn-primary mx-3" value="get member by Id" onClick={getMemberById} />

        </>
    )
}