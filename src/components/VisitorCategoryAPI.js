import { React } from 'react'
import axios from 'axios'

export const VisitorCategoryAPI = () => {

    const getVisitorCategory = () => {
        axios.get('http://localhost:4000/categories/').then(res => {
            console.log(res)
        })
    }

    const postVisitorCategory = () => {

        var visitorCategory = {
            categoryName: 'y'
        }

        axios.post('http://localhost:4000/categories/', visitorCategory).then(res => {
            console.log(res)
        })
    }

    const deleteVisitorCategory = () => {

        var id = "62262572ed47974e664cf400"

        axios.delete(`http://localhost:4000/categories/` + id).then(res => {
            console.log(res)
        })
    }

    const updateVisitorCategory = () => {

        var visitorCategory = {
            categoryName: 'x'
        }
        var id = "62262572ed47974e664cf400";

        axios.put(`http://localhost:4000/categories/` + id, visitorCategory).then(res => {
            console.log(res)
        })
    }

    const getVisitorCategoryByID = () => {
        var id = "621080c8df09ca2d45e3c163"
        axios.get(`http://localhost:4000/categories/` + id).then(res => {
            console.log(res)
        })
    }

    return (
        <>
            <h3 className="my-3">Visitor Category API</h3>
            <input type="button" className="btn btn-primary mx-3" value="get visitor category" onClick={getVisitorCategory} />
            <input type="button" className="btn btn-primary mx-3" value="post visitor category" onClick={postVisitorCategory} />
            <input type="button" className="btn btn-primary mx-3" value="delete visitor category" onClick={deleteVisitorCategory} />
            <input type="button" className="btn btn-primary mx-3" value="update visitor category" onClick={updateVisitorCategory} />
            <input type="button" className="btn btn-primary mx-3" value="get visitor category by ID" onClick={getVisitorCategoryByID} />
        </>
    )
}