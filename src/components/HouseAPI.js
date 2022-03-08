import { React } from 'react'
import axios from 'axios'

export const HouseAPI = () => {

    const getHouse = () => {
        axios.get('http://localhost:4000/houses/').then(res => {
            console.log(res)
        })
    }

    const postHouse = () => {

        var House = {
            houseTitle: 'x'
        }

        axios.post('http://localhost:4000/houses/', House).then(res => {
            console.log(res)
        })
    }

    const deleteHouse = () => {

        var id = "622767f7d53c7c255b4b4c21"

        axios.delete(`http://localhost:4000/houses/` + id).then(res => {
            console.log(res)
        })
    }

    const updateHouse = () => {

        var House = {
            houseTitle: 'y'
        }
        var id = "622767f7d53c7c255b4b4c21";

        axios.put(`http://localhost:4000/houses/` + id, House).then(res => {
            console.log(res)
        })
    }

    const getHouseByID = () => {
        var id = "6210bc00af171efad4239afd"
        axios.get(`http://localhost:4000/houses/` + id).then(res => {
            console.log(res)
        })
    }

    return (
        <>
            <h3 className="my-3">House API</h3>
            <input type="button" className="btn btn-primary mx-3" value="get House" onClick={getHouse} />
            <input type="button" className="btn btn-primary mx-3" value="post House" onClick={postHouse} />
            <input type="button" className="btn btn-primary mx-3" value="delete House" onClick={deleteHouse} />
            <input type="button" className="btn btn-primary mx-3" value="update House" onClick={updateHouse} />
            <input type="button" className="btn btn-primary mx-3" value="get House by ID" onClick={getHouseByID} />
        </>
    )
}