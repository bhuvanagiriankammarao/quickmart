import React from 'react';

import AboutBanner from '../../section/About/AboutBanner';
import { SandeepImg } from '../../assets/images';


const About = () => {
  return (
    <div>
      {/* Banner Section */}
      <div style={{ textAlign: 'center' }}>
      <div>
    <AboutBanner />
    </div>


      </div>
 
      {/* Introductory Paragraph */}
      <section className=' font-poppins font-semibold' style={{ padding: '20px',  color: '#333', lineHeight: '1.6' }}>
  <p style={{ fontSize: '1.2em', color: '#555' }}>
    <span className=' text-green-600' style={{  fontWeight: 'bold' }}>At Quickstore</span>, we connect customers directly with quality products sourced straight from factories, eliminating middlemen to ensure exceptional value and freshness. 
    <span >Our goal</span> is to streamline the supply chain and bring you closer to the sources of the products you trust, all at highly competitive prices. 
    As a customer, you can enjoy peace of mind knowing that each item is carefully curated for quality and authenticity, with the added assurance of receiving factory-direct goods that meet the highest standards. 
    <span>Experience a shopping journey</span> designed around your needs, with savings and quality at the forefront.
  </p>
</section>


      {/* YouTube Video Section */}
      <section style={{ display: 'flex', justifyContent: 'space-around', padding: '20px' }}>
        <iframe width="300" height="200" src="https://www.youtube.com/embed/VideoID1" title="Video 1" frameBorder="0" allowFullScreen></iframe>
        <iframe width="300" height="200" src="https://www.youtube.com/embed/VideoID2" title="Video 2" frameBorder="0" allowFullScreen></iframe>
        <iframe width="300" height="200" src="https://www.youtube.com/embed/VideoID3" title="Video 3" frameBorder="0" allowFullScreen></iframe>
      </section>
      <hr className='border-1 border-black my-4'></hr>

      {/* Founder Section */}
      <section style={{ padding: '20px', fontFamily: 'Georgia, serif', color: '#444', lineHeight: '1.7' }}>
  {/* Image Section */}
  <div className=' flex items-center justify-center' style={{ marginBottom: '20px' }}>
    <img 
      src={SandeepImg}
      alt="Mr. Sandeep Kumar Talanki" 
      style={{ width: '250px', height: '250px', borderRadius: '60%' }}
    />
    
  </div>
  
  {/* Description Section */}
  <p style={{ fontSize: '1.2em', color: '#333' }} className=' font-poppins'>
    <span style={{ color: '#0056b3', fontWeight: 'bold' }}>Mr. Sandeep Kumar Talanki</span>, the visionary behind 
    
    established this platform with a mission to revolutionize the e-commerce industry.
    With over a decade of experience in the  
    Mr. Talanki brings both strategic insight and hands-on expertise to deliver a shopping experience that is not only seamless but also trustworthy. 
    His commitment to excellence is reflected in every aspect of 
    
    from cutting-edge technology solutions to customer-centric services.
    <br /><br />
    At  
    our vision is to empower consumers with direct access to quality products and advanced, user-friendly tools that simplify online shopping. 
    We believe in building relationships based on trust transparency and innovation ensuring our customers enjoy a shopping journey that is second to none.
     Join us as we shape the future of e-commerce.  </p>
</section>



      {/* Company Information */}
      <section style={{ 
  padding: '20px', 
  borderTop: '1px solid #ddd', 
  marginTop: '20px', 
  backgroundColor: '#f9f9f9', 
  borderRadius: '8px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' 
}}>
  
</section>

    </div>
  );
};

export default About;
