import React from 'react'
import { Link } from 'react-router-dom'
//import { useState } from 'react'

export const Navbar = () => {

  // const [headerpos, setheaderpos] = useState('')

  // const headerScrolled = (e) => {
  //   if (window.scrollY > 100) {
  //     setheaderpos("fixed-top d-flex align-items-center header-scrolled ")
  //   } else {
  //     setheaderpos("fixed-top d-flex align-items-center")
  //   }
  // }

  return (
    <>
      <div>
        {/* <header id="header" className={headerpos} onScroll={(e) => { headerScrolled() }} > */}
        {/* <header id="header" className={window.scrollY > 100 ? "fixed-top d-flex align-items-center header-scrolled" : "fixed-top d-flex align-items-center"}> */}
        <header id="header" className="fixed-top d-flex align-items-center">
          <div className="container">
            <div className="header-container d-flex align-items-center justify-content-between">
              <div className="logo">
                <h1 className="text-light"><a href="index.html"><span>eSociety</span></a></h1>
                {/*<!-- Uncomment below if you prefer to use an image logo -->*/}
                {/* <!-- <a href="index.html"><img src="assets/img/logo.png" alt="" className="img-fluid"></a>-->*/}
              </div>

              <nav id="navbar" className="navbar">
                <ul>
                  <li><Link className="nav-link scrollto active" to="/home">Home</Link></li>
                  {/* <li><a className="nav-link scrollto " href="#portfolio">Visitor Tracking</a></li>
                <li><a className="nav-link scrollto" href="#team">Add Pre-request</a></li>*/}
                  {localStorage.getItem('email') !== null ?
                    <li>
                      <li className="dropdown"><Link to="" style={{ textDecoration: "none" }}><span>ADD</span> <i className="bi bi-chevron-down"> </i> </Link>

                        <ul>
                          <li className="dropdown">{localStorage.getItem("roleName") === "Society Member" || localStorage.getItem("roleName") === "Security Guard" ? "" : <Link to="addvehicle" style={{ textDecoration: "none" }}><span>Vehicle</span></Link>}</li>
                          <li className="dropdown">{localStorage.getItem("roleName") === "Society Member" ? <Link to="childschedule" style={{ textDecoration: "none" }}>Child Schedule</Link> : ""}</li>
                          <li className="dropdown">{localStorage.getItem("roleName") === "ADMIN" ? "" : <Link to="addvisitor" style={{ textDecoration: "none" }}><span>Visitor</span></Link>}</li>
                        </ul>


                      </li>



                    </li> : ""}

                  {localStorage.getItem('email') !== null ?

                    <li className="dropdown"><Link to="" style={{ textDecoration: "none" }}><span>DISPLAY</span> <i className="bi bi-chevron-down"> </i> </Link>

                      <ul>
                        <li><Link to="listvehicles" style={{ textDecoration: "none" }}>Vehicles</Link></li>
                        <li><Link to="listvisitors" style={{ textDecoration: "none" }}>Visitors</Link></li>
                        <li><Link to="listdeliverables" style={{ textDecoration: "none" }}>Deliverables</Link></li>
                        <li><Link to="listmembers" style={{ textDecoration: "none" }}>Society Members</Link></li>
                        <li><Link to="listguards" style={{ textDecoration: "none" }}>Security Guards</Link></li>
                        <li><Link to="listchildren" style={{ textDecoration: "none" }}>Child Schedule</Link></li>


                      </ul>

                    </li>


                    : ""}

                  <li>{localStorage.getItem("role") === "620dd50cbaf661b44817ee61" ? "" : <Link className="nav-link scrollto" to="/about">About</Link>}</li>
                  <li>{localStorage.getItem("role") === "620dd50cbaf661b44817ee61" ? "" : <Link className="nav-link scrollto" to="/services">Services</Link>}</li>

                  <li>{localStorage.getItem("role") === "620dd50cbaf661b44817ee61" ? "" : <Link className="nav-link" to="/contact">Contact</Link>}</li>

                  {/* <li>{localStorage.getItem("role") === "620dd50cbaf661b44817ee61" ? <Link className="nav-link" to="">View Submitted Contact Form</Link> : ""}</li> */}

                  {/* <li><Link to="/profile" style={{ textDecoration: "none" }}>Profile</Link></li> */}
                  <li>{localStorage.getItem('email') === null ? <Link className="getstarted scrollto" to="/login" style={{ textDecoration: "none" }}>Login</Link> :
                    <Link to="/profile" style={{ textDecoration: "none" }}>Profile<i className="bi bi-person-circle mx-1"></i></Link>}</li>

                </ul>
                <i className="bi bi-list mobile-nav-toggle"></i>
              </nav>

            </div>{/*<!-- End Header Container -->*/}
          </div>
        </header>

        {/* <!-- End Header --> */}
      </div>
    </>
  )
}