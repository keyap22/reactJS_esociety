import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import jsPDF from 'jspdf';
import "jspdf-autotable";

export const ListVisitorsAPI = () => {
    const [visitorList, setVisitorList] = useState([])

    const deleteVisitor = (visitorID) => {

        console.log(visitorID)

        axios.delete(`http://localhost:4000/visitors/` + visitorID).then(res => {
            console.log(res)
        })
    }

    const getData = () => {
        axios.get("http://localhost:4000/visitors/").then(res => {
            console.log(res.data.data)
            setVisitorList(res.data.data)
        })
    }

    const exportPDF = () => {
        const unit = "pt";
        const size = "A4"; // Use A1, A2, A3 or A4
        const orientation = "portrait"; // portrait or landscape
        var counter = 0
        const marginLeft = 50;
        const doc = new jsPDF(orientation, unit, size);

        doc.setFontSize(12);

        const title = "Visitor Report";
        const headers = [["Sr. No.", "Visitor Name", "Date", "Entry Time", "Exit Time", "Allowed", "Prescheduled", "Image", "House", "Category"
            , "Purpose", "Contact No."]];

        const data = visitorList.map(visitor => [counter, visitor.visitorName, visitor.date, visitor.entryTime, visitor.exitTime,
            visitor.isAllowed, visitor.isPreScheduled, visitor.profilePhoto, visitor.house.houseTitle, visitor.visitorCategory.categoryName,
            visitor.purpose, visitor.mobileNo], counter = counter + 1);

        let content = {
            startY: 50,
            head: headers,
            body: data
        };

        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save("visitorsReport.pdf")
    }



    useEffect(() => {
        console.log("use effect hook implemented")
        getData()
    }, [])

    var counter = 0

    return (
        <div className="container table-responsive-md" style={{ maxWidth: "1320px" }}>
            <div>
                <button className="btn btn-warning my-5" onClick={() => exportPDF()}>Generate Report</button>
            </div>
            <table className="table table-hover my-2">
                <thead className="table_head">
                    <tr>
                        <th scope="col" className=''>Sr. No.</th>
                        <th scope="col">Visitor Name</th>
                        <th scope="col">Date</th>
                        <th scope="col">Entry Time</th>
                        <th scope="col">Exit Time</th>
                        <th scope="col">Allowed</th>
                        <th scope="col">Prescheduled</th>
                        <th scope="col">Image</th>
                        <th scope="col">House</th>
                        <th scope="col">Category</th>
                        <th scope="col">Purpose</th>
                        <th scope="col">Contact No.</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        visitorList.map((visitor) => {
                            counter += 1
                            return (
                                <tr key={visitor._id}>
                                    <th scope="row">{counter}</th>
                                    <td>{visitor.visitorName}</td>
                                    <td>{visitor.date}</td>
                                    <td>{visitor.entryTime}</td>
                                    <td>{visitor.exitTime}</td>
                                    <td>{visitor.isAllowed ? <i className="bi bi-check-lg"></i> : <i className="bi bi-x-lg"></i>}</td>
                                    <td>{visitor.isPreScheduled ? <i className="bi bi-check-lg"></i> : <i className="bi bi-x-lg"></i>}</td>
                                    <td><img src={visitor.profilePhoto}></img></td>
                                    <td>{visitor.house.houseTitle}</td>
                                    <td>{visitor.visitorCategory.categoryName}</td>
                                    <td>{visitor.purpose}</td>
                                    <td>{visitor.mobileNo}</td>

                                    <td>
                                        <Link to="/listvisitors" className="btn btn-sm btn-danger mx-1" onClick={() => { deleteVisitor(visitor._id) }}><i className="bi bi-trash"></i></Link>
                                        <Link to={`/listvisitors/update/${visitor._id}`} className="btn btn-sm btn-primary" value={visitor._id}><i className="bi bi-pencil"></i></Link>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}