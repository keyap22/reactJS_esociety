import React from 'react'
import { Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'


export const Navbar = () => {
  return (
    <>


      <div><header id="header" className="fixed-top d-flex align-items-center">
        <div className="container">
          <div className="header-container d-flex align-items-center justify-content-between">
            <div className="logo">
              <h1 className="text-light"><a href="index.html"><span>Bethany</span></a></h1>
              {/*<!-- Uncomment below if you prefer to use an image logo -->*/}
              {/* <!-- <a href="index.html"><img src="assets/img/logo.png" alt="" className="img-fluid"></a>-->*/}
            </div>

            <nav id="navbar" className="navbar">
              <ul>
                <li><a className="nav-link scrollto active" href="#hero">Home</a></li>
                <li><Link className="nav-link scrollto" to="/about">About</Link></li>
                <li><a className="nav-link scrollto" href="#services">Services</a></li>
                <li><a className="nav-link scrollto " href="#portfolio">Portfolio</a></li>
                <li><a className="nav-link scrollto" href="#team">Team</a></li>
                <li className="dropdown"><a href="#"><span>Drop Down</span> <i className="bi bi-chevron-down"></i></a>
                  <ul>
                    <li><a href="#">Drop Down 1</a></li>
                    <li className="dropdown"><a href="#"><span>Deep Drop Down</span> <i className="bi bi-chevron-right"></i></a>
                      <ul>
                        <li><a href="#">Deep Drop Down 1</a></li>
                        <li><a href="#">Deep Drop Down 2</a></li>
                        <li><a href="#">Deep Drop Down 3</a></li>
                        <li><a href="#">Deep Drop Down 4</a></li>
                        <li><a href="#">Deep Drop Down 5</a></li>
                      </ul>
                    </li>
                    <li><a href="#">Drop Down 2</a></li>
                    <li><a href="#">Drop Down 3</a></li>
                    <li><a href="#">Drop Down 4</a></li>
                  </ul>
                </li>
                <li><Link className="nav-link" to="/contact">Contact</Link></li>
                <li><a className="getstarted scrollto" href="#about">Get Started</a></li>
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
