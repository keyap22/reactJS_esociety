import React from 'react'
import { Link } from 'react-router-dom'


export const Navbar = () => {
  return (
    <>


      <div><header id="header" className="fixed-top d-flex align-items-center">
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
                <li><Link className="nav-link scrollto" to="/about">About</Link></li>
                <li><Link className="nav-link scrollto" to="/services">Services</Link></li>
                {/* <li><a className="nav-link scrollto " href="#portfolio">Visitor Tracking</a></li>
                <li><a className="nav-link scrollto" href="#team">Add Pre-request</a></li>*/}
                <li className="dropdown"><a href="#"><span>Edit Members</span> <i className="bi bi-chevron-down"></i></a> 
                  <ul>
                    <li><a href="#">Add member</a></li>
                    <li className="dropdown"><a href="#"><span>Update member</span> <i className="bi bi-chevron-right"></i></a>
                      <ul>
                        <li><a href="#">Name</a></li>
                        <li><a href="#">Contact Number</a></li>
                         {/* <li><a href="#"></a></li>
                        <li><a href="#">Deep Drop Down 4</a></li>
                        <li><a href="#">Deep Drop Down 5</a></li>  */}
                      </ul>
                    </li>
                    <li><a href="#">Delete Member</a></li>
                    <li><a href="#">Search Member</a></li>
                    <li><a href="#">Display all members</a></li>
                  </ul>
                </li>
                <li><Link className="nav-link" to="/contact">Contact</Link></li>
                <li><Link className="getstarted scrollto" to ="/login">Login</Link></li>
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