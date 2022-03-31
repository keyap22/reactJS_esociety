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
                  <li className="dropdown"><a href="#"><span>Edit</span> <i className="bi bi-chevron-down"></i></a>
                    <ul>
                      <li className="dropdown"><a href="#"><span>ADD</span> <i className="bi bi-chevron-right"> </i> </a>

                        <ul>
                          <li className="dropdown"><Link to="addvehicle"><span>Vehicle</span></Link></li>
                          <li className="dropdown"><Link to="childschedule">Child Schedule</Link></li>
                          <li className="dropdown"><Link to="addvisitor"><span>Visitor</span></Link></li>
                        </ul>

                      </li>

                      <li className="dropdown"><a href="#"><span>DISPLAY</span> <i className="bi bi-chevron-right"> </i> </a>

                        <ul>
                          <li><Link to="listvehicle">Vehicles</Link></li>
                          <li><Link to="listvisitors">Visitors</Link></li>
                          <li><Link to="">Deliverables</Link></li>
                          <li><Link to="listmembers">Society Members</Link></li>
                          <li><Link to="listguards">Security Guards</Link></li>
                          <li><Link to="listchildren">Child Schedule</Link></li>


                        </ul>

                      </li>
                    </ul>
                  </li>
                  <li><Link className="nav-link scrollto" to="/about">About</Link></li>
                  <li><Link className="nav-link scrollto" to="/services">Services</Link></li>

                  <li><Link className="nav-link" to="/contact">Contact</Link></li>
                  <li><Link to="/profile">Profile</Link></li>
                  <li><Link className="getstarted scrollto" to="/login">Login</Link></li>

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