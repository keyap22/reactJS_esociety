import React from 'react'
import {Link} from 'react-router-dom'

export const Home = () => {
  return (
    <section id="hero" className="d-flex align-items-center">
    <div className="container text-center position-relative" data-aos="fade-in" data-aos-delay="200">
      <h1>Access to Top-Class Features of Society</h1>
      <h2>You can track visitor movements and can ensure your security.</h2>
      <Link to="/signup" className="btn-get-started scrollto">Sign Up</Link>
    </div>
  </section>
  )
}