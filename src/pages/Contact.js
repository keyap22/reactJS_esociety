import React from 'react'
import { useState } from 'react'

export const Contact = () => {

  const [email, setemail] = useState('')


  const emailHandler = (e) => {

    console.log(e.target.value)
    setemail(e.target.value)
  }

  const submit = (e) => {

    e.preventDefault()
    alert("email: " + email)
    console.log("submit called.....")
  }
  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="row">
          <div className="col-lg-4" data-aos="fade-right">
            <div className="section-title">
              <h2>Contact</h2>
              <p>Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea. Quia fugiat sit in iste officiis commodi quidem hic quas.</p>
            </div>
          </div>

          <div className="col-lg-8" data-aos="fade-up" data-aos-delay="100">
            {/* <iframe style="border:0; width: 100%; height: 270px;" src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12097.433213460943!2d-74.0062269!3d40.7101282!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xb89d1fe6bc499443!2sDowntown+Conference+Center!5e0!3m2!1smk!2sbg!4v1539943755621" frameborder="0" allowfullscreen></iframe>
           */}
            <div className="info mt-4">
              <i className="bi bi-geo-alt"></i>
              <h4>Location:</h4>
              <p>A108 Adam Street, New York, NY 535022</p>
            </div>
            <div className="row">
              <div className="col-lg-6 mt-4">
                <div className="info">
                  <i className="bi bi-envelope"></i>
                  <h4>Email:</h4>
                  <p>info@example.com</p>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="info w-100 mt-4">
                <i class="bi bi-telephone-fill"></i>
                  <h4>Call:</h4>
                  <p>9876543210</p>
                </div>
              </div>
            </div>

            <form onSubmit={submit} role="form" className="">
              <div className="row my-3">
                <div className="col-md-6 form-group">
                  <input type="text" name="name" className="form-control" id="name" placeholder="Your Name" required />
                </div>
                <div className="col-md-6 form-group mt-3 mt-md-0">
                  <input type="email" className="form-control" name="email" id="email" placeholder="Your Email" required onChange={(e) => { emailHandler(e) }} />
                </div>
              </div>
              <div className="form-group mt-3">
                <input type="text" className="form-control" name="subject" id="subject" placeholder="Subject" required />
              </div>
              <div className="form-group mt-3">
                <textarea className="form-control" name="message" rows="5" placeholder="Message" required></textarea>
              </div>
              {/* <div className="my-3">
                <div className="loading">Loading</div>
                <div className="error-message"></div>
                <div className="sent-message">Your message has been sent. Thank you!</div>
              </div> */}
              <div className="text-center"><input type="submit" className="btn-centre" value="Send Message" /></div>
            </form>
          </div>
        </div>

      </div>
    </section>
  )
}
