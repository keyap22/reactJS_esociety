import React from 'react'
import {Link} from 'react-router-dom'

export const Footer = () => {
    return (
        <>
            <footer id="footer">

                <div className="footer-top">
                    <div className="container">
                        <div className="row">

                            <div className="col-lg-3 col-md-6 footer-contact">
                                <h3>Unnati Informatics LLP.</h3>
                                <p>C/204, 2nd Floor, Shivam Complex,<br />
                                    Bhuyangdev Circle, Ghatlodiya,  <br />
                                    Ahmedabad, Gujarat 380061<br />
                                    India<br /><br />
                                    <strong>Phone:</strong>  +91 98793 10901<br />
                                    <strong>Email:</strong> info@unnatiinformatics.com<br />
                                </p>
                            </div>

                            <div className="col-lg-2 col-md-6 footer-links">
                                <h4>Useful Links</h4>
                                <ul>
                                    <li><i className="bx bx-chevron-right"></i> <a href="http://unnatiinformatics.com/">Home</a></li>
                                    <li><i className="bx bx-chevron-right"></i> <a href="http://unnatiinformatics.com/about-us/">About us</a></li>
                                    <li><i className="bx bx-chevron-right"></i> <a href="http://unnatiinformatics.com/website-app-development-work/">Portfolio</a></li>
                                    <li><i className="bx bx-chevron-right"></i> <a href="http://unnatiinformatics.com/blog/">Blog</a></li>
                                    <li><i className="bx bx-chevron-right"></i> <a href="http://unnatiinformatics.com/privacy-policy/">Privacy policy</a></li>
                                </ul>
                            </div>

                            <div className="col-lg-3 col-md-6 footer-links">
                                <h4>Our Services</h4>
                                <ul>
                                    <li><i className="bx bx-chevron-right"></i> <a href="http://unnatiinformatics.com/mobile-app-development/">App Development</a></li>
                                    <li><i className="bx bx-chevron-right"></i> <a href="http://unnatiinformatics.com/software-development-company/">Software Development</a></li>
                                    <li><i className="bx bx-chevron-right"></i> <a href="http://unnatiinformatics.com/project-training-ahmedabad/">Project Training</a></li>
                                    <li><i className="bx bx-chevron-right"></i> <a href="http://unnatiinformatics.com/web-solution/website-design-company/">Website Design and Development</a></li>
                                    <li><i className="bx bx-chevron-right"></i> <a href="http://unnatiinformatics.com/web-solution/graphic-design-company-ahmedabad/">Graphic Design</a></li>
                                </ul>
                            </div>

                            <div className="col-lg-4 col-md-6 footer-newsletter">
                                <h4>Join Our Newsletter</h4>
                                <p>Services We Offer : Website Design Ahmedabad | Web Development Ahmedabad | School Management Software
Best SEO Service Ahmedabad | Customised Mobile Application Development | Web Hosting Company Ahmedabad, India, USA, AUS, UAE, Canada</p>
                                <form action="" method="post">
                                    <input type="email" name="email" /><input type="submit" value="Subscribe" />
                                </form>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="container d-md-flex py-4">

                    <div className="me-md-auto text-center text-md-start">
                        <div className="copyright">
                            &copy; Copyright <strong><span>Unnati Informatics LLP</span></strong>. All Rights Reserved
                                                </div>
                        {/* <div className="credits"> */}
                        <div className="me-md-auto text-center text-md-start">
                            Designed by <br />
                            <a href="https://www.linkedin.com/in/keya-patel-84047a1b5/">Keya Patel </a> |
                            <a href="https://www.linkedin.com/in/jeel-jadawala/"> Jeel Jadawala</a>
                        </div>
                    </div>
                    <div className="social-links text-center text-md-right pt-3 pt-md-0">
                        <a href="#" className="twitter"><i className="bx bxl-twitter"></i></a>
                        <a href="https://www.facebook.com/UnnatiInformatics/" className="facebook"><i className="bx bxl-facebook"></i></a>
                        <a href="https://www.instagram.com/unnati_informatics/" className="instagram"><i className="bx bxl-instagram"></i></a>
                        <a href="skype:salesarth" className="google-plus"><i className="bx bxl-skype"></i></a>
                        <a href="https://www.linkedin.com/company/unnati-infomatics-llp/?viewAsMember=true" className="linkedin"><i className="bx bxl-linkedin"></i></a>
                    </div>
                </div>
            </footer>

            {/* end footer */}
            <Link to="/home" class="back-to-top d-flex align-items-center justify-content-center active">
                <i class="bi bi-arrow-up-short"></i></Link>
        </>
    )
}