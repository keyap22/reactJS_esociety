import React from 'react'
import {Link} from 'react-router-dom'

export const Home = () => {
  return (
    <section id="hero" class="d-flex align-items-center">
    <div class="container text-center position-relative" data-aos="fade-in" data-aos-delay="200">
      <h1>Access to top-class features of society</h1>
      <h2>You can track visitor movements and can ensure your security.</h2>
      <Link to="/signup" class="btn-get-started scrollto">Sign Up</Link>
    </div>
  </section>
  )
}