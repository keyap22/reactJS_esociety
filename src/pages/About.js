import React from 'react'

export const About = () => {
  return (
    <section id="about" className="about">
      <div className="container">

        <div className="row content">
          <div className="col-lg-6" data-aos="fade-right" data-aos-delay="100">
            <h2>eSociety Management</h2>
            <h3>Web-based software for a society where accounts are maintained correctly and provides transparency within the society members.</h3>
          </div>
          <div className="col-lg-6 pt-4 pt-lg-0" data-aos="fade-left" data-aos-delay="200">
            <p>
             An interactive system providing all the information regarding gate activities related to them. It will allow the residents to authorize, validate and manage all the visitors from the milkman to the maid and the plumber. Apart from the runtime request, society member can update information prior to the arrival of any parcel, delivery or guest. Periodically report of visitors will be generated which can be accessed by them.
            </p>
            <ul>
              <li><i className="ri-check-double-line"></i>Security Staff Attendence</li>
              <li><i className="ri-check-double-line"></i>Child Security</li>
              <li><i className="ri-check-double-line"></i>Parking Space Allotment</li>
            </ul>
            <p className="fst-italic">
                Inter call facility for runtime requests<br/>
                Role Based Access
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}
