import { React } from 'react'
import axios from 'axios'

export const SecurityGuardAPI = () => {

    const getSecurityGuard = () => {
        axios.get('http://localhost:4000/guards/').then(res => {
            console.log(res)
        })
    }

    const postSecurityGuard = () => {

        var securityGuard = {
             guardName: 'y',
             scheduleTime : "10am-6pm",
             mobileNo : "9876543210",
             user : "62131ac4efdec58582ade501"
        }

        axios.post('http://localhost:4000/guards/', securityGuard).then(res => {
            console.log(res)
        })
    }

    const deleteSecurityGuard = () => {

        var id = "622725e74ceac4ee8ffb582a"

        axios.delete(`http://localhost:4000/guards/` + id).then(res => {
            console.log(res)
        })
    }

    const updateSecurityGuard = () => {

        var securityGuard = {
            guardName: 'o'
        }
        var id = "622725e74ceac4ee8ffb582a";

        axios.put(`http://localhost:4000/guards/` + id, securityGuard).then(res => {
            console.log(res)
        })
    }

    const getSecurityGuardByID = () => {
        var id = "622725e74ceac4ee8ffb582a"
        axios.get(`http://localhost:4000/guards/` + id).then(res => {
            console.log(res)
        })
    }

    return (
        <>
            <h3 className="my-3">Security Guard API</h3>
            <input type="button" className="btn btn-primary mx-3" value="get security guard" onClick={getSecurityGuard} />
            <input type="button" className="btn btn-primary mx-3" value="post security guard" onClick={postSecurityGuard} />
            <input type="button" className="btn btn-primary mx-3" value="delete security guard" onClick={deleteSecurityGuard} />
            <input type="button" className="btn btn-primary mx-3" value="update security guard" onClick={updateSecurityGuard} />
            <input type="button" className="btn btn-primary mx-3" value="get security guard by ID" onClick={getSecurityGuardByID} />
        </>
    )
}