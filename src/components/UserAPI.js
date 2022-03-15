import { React } from 'react'
import axios from 'axios'

export const UserAPI = () => {

    const getUser = () => {
        axios.get('http://localhost:4000/users/').then(res => {
            console.log(res)
        })
    }

    const postUser = () => {

        var user = {
            email: "j@gmail.com",
            password: "j",
            mobileNo: "1234567890",
            firstName: "abc",
            lastName: "xyz",
            role: "620f3b201424f45461f2b425",
            profilePhoto: "profilePhoto"
        }

        axios.post('http://localhost:4000/Users/', user).then(res => {
            console.log(res)
        })
    }

    const deleteUser = () => {

        var id = "6210ef3286916bc9cc669c70"

        axios.delete(`http://localhost:4000/users/` + id).then(res => {
            console.log(res)
        })
    }

    const updateUser = () => {

        var user = {
            email: "xyz@gmail.com"
        }
        var id = "622740a09d7544ebc551ba15";

        axios.put(`http://localhost:4000/users/` + id, user).then(res => {
            console.log(res)
        })
    }

    const getUserById = () => {
        var id = "622740a09d7544ebc551ba15";

        axios.get('http://localhost:4000/users/' + id).then(res => {
            console.log(res)
        })
    }

    return (
        <>
            <h3 className="my-3">User API</h3>
            <input type="button" className="btn btn-primary mx-3" value="get user" onClick={getUser} />
            <input type="button" className="btn btn-primary mx-3" value="post user" onClick={postUser} />
            <input type="button" className="btn btn-primary mx-3" value="delete user" onClick={deleteUser} />
            <input type="button" className="btn btn-primary mx-3" value="update user" onClick={updateUser} />
            <input type="button" className="btn btn-primary mx-3" value="get user by Id" onClick={getUserById} />

        </>
    )
}