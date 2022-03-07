import { React } from 'react'
import axios from 'axios'

export const RoleAPI = () => {

    const getRole = () => {
        axios.get('http://localhost:4000/roles/').then(res => {
            console.log(res)
        })
    }

    const postRole = () => {

        var role = {
            roleName : 'y'
        }

        axios.post('http://localhost:4000/roles/', role).then(res => {
            console.log(res)
        })
    }

    const deleteRole = () => {

        var id = "6225ac606d4dfb9cf4bfe679"

        axios.delete(`http://localhost:4000/roles/`+id).then(res => {
            console.log(res)
        })
    }

    const updateRole = () => {

        var role = {
            roleName : 'y'
        }
        var id = "620de87cbe1ad93e25b557c9";

        axios.put(`http://localhost:4000/roles/` + id, role).then(res => {
            console.log(res)
        })
    }

    return (
        <>
            <h3>Role API</h3>
            <input type="button" className="btn btn-primary mx-3" value="get role" onClick={getRole}/>
            <input type="button" className="btn btn-primary mx-3" value="post role" onClick={postRole}/>
            <input type="button" className="btn btn-primary mx-3" value="delete role" onClick={deleteRole}/>
            <input type="button" className="btn btn-primary mx-3" value="update role" onClick={updateRole}/>
        </>
    )
}