import React from 'react'

export const Services = () => {
    return (

        <section id="services" className="services section-bg">
            <div className="container">

                <div className="row">
                    <div className="col-lg-4">
                        <div className="section-title aos-init aos-animate" data-aos="fade-right">
                            <h2>Services</h2>
                            <p>Society management tracking visitors movement along with additional functionalities</p>
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <div className="row">
                            <div className="col-md-6 d-flex align-items-stretch">
                                <div className="icon-box aos-init aos-animate" data-aos="zoom-in" data-aos-delay="100">
                                    <div className="icon"><i className="bi bi-shield-fill-check"></i></div>
                                    <h4><a href="">Gate/Security Management</a></h4>
                                    <p>Handling Unexpected Guests by spotting entry at gate triggering notification/IVR calls for approval.</p>
                                    <p>Prescheduling the time of expected guests ,parcel.</p>
                                    <p>Track the entry/exits of water tankers, diesel and garbage trucks along with their details</p>
                                </div>
                            </div>

                            <div className="col-md-6 d-flex align-items-stretch mt-4 mt-lg-0">
                                <div className="icon-box aos-init aos-animate" data-aos="zoom-in" data-aos-delay="200">
                                    <div className="icon"><i className="bx bx-car"></i></div>
                                    <h4><a href="">Vehicle Management</a></h4>
                                    <p>Allocate approved number of parking slots to each flat/villa.</p>
                                </div>
                            </div>

                            <div className="col-md-6 d-flex align-items-stretch mt-4">
                                <div className="icon-box aos-init aos-animate" data-aos="zoom-in" data-aos-delay="300">
                                    <div className="icon"><i className="bi bi-person-bounding-box"></i></div>
                                    <h4><a href="">Child Safety Alert</a></h4>
                                    <p>To monitor/control children exiting the campus (goes to residents).</p>
                                    <p>To schedule restrict/permit children from exiting the society.</p>
                                </div>
                            </div>

                            <div className="col-md-6 d-flex align-items-stretch mt-4">
                                <div className="icon-box aos-init aos-animate" data-aos="zoom-in" data-aos-delay="400">
                                    <div className="icon"><i className="bi bi-check-square"></i></div>
                                    <h4><a href="">Security Staff Attendence</a></h4>
                                    <p>Detailed reports with flexibility to define multiple configurable shifts for different type of staff.</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </section>

    )
}