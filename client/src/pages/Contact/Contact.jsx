import React, { useEffect } from 'react';
import { FaLocationArrow, FaPhone, FaVoicemail } from 'react-icons/fa';

const Contact = () => {
    const handleSubmit = (event) => {
        event.preventDefault();
        alert("Message sent! We will get back to you soon.");
        // You can also handle form submission logic here (e.g., sending data to a server)
    };

    useEffect(() => {
        // Initialize Google Map
        const initMap = () => {
            const location = { lat: 12.9716, lng: 77.5946 }; // Example coordinates (Bangalore)
            const map = new window.google.maps.Map(document.getElementById("map"), {
                zoom: 14,
                center: location,
            });
            new window.google.maps.Marker({
                position: location,
                map: map,
            });
        };

        // Load Google Maps script
        const loadScript = (src) => {
            const script = document.createElement("script");
            script.src = src;
            script.async = true;
            script.defer = true;
            script.onload = initMap;
            document.body.appendChild(script);
        };

        loadScript(`https://maps.googleapis.com/maps/api/js?key=AIzaSyDUMMYAPIKEY1234567890abcdefghijkl`);

    }, []);

    return (
        <div style={styles.contactPage} className=' font-poppins'>
            <div style={styles.infoBoxes} className=' font-semibold'>
                <div style={styles.box}><span><FaLocationArrow /></span>Q-4, A2, 10th Floor, Cyber Towers, Hitech City, Hyderabad, Telangana, India - 500081</div>
                <div style={styles.box}><span><FaVoicemail /></span>Email: info@quickstore.com</div>
                <div style={styles.box}><span><FaPhone /></span>Phone: 091334 56915</div>
                <div style={styles.box}><span><FaPhone /></span>Fax: +91 098 765 4321</div>
            </div>

            <div style={styles.lowerContainer}>
                <div style={styles.formContainer}>
                    <h2 style={styles.formTitle} className=' text-custom-20 font-500'>Contact Us</h2>
                    <form onSubmit={handleSubmit} >
                        <label style={styles.label} htmlFor="name" className=' font-500'>Name:</label>
                        <input style={styles.input} type="text" id="name" name="name" required />

                        <label style={styles.label} htmlFor="address" className=' font-500'>Address:</label>
                        <input style={styles.input} type="text" id="address" name="address" required />

                        <label style={styles.label} htmlFor="message" className=' font-500'>Message:</label>
                        <textarea style={styles.textarea} id="message" name="message" required></textarea>

                        <button style={styles.button} type="submit" className=' text-blue-900'>Send Message</button>
                    </form>
                </div>

                <div id="map" style={styles.map}></div>
            </div>
        </div>
    );
};

const styles = {
    contactPage: {
        display: 'flex',
        flexDirection: 'column',
        backgroundImage: 'url(YOUR_BACKGROUND_IMAGE_URL)', // Replace with your background image URL
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '20px',
        height: '100vh', // Full viewport height
    },
    infoBoxes: {
        display: 'flex',
        justifyContent: 'space-between', // Distribute boxes evenly
        marginBottom: '20px', // Spacing below the boxes
    },
    box: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
        flex: '1', // Equal flex for all boxes
        margin: '0 10px', // Horizontal spacing between boxes
        textAlign: 'center',
    },
    lowerContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    formContainer: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
        marginRight: '20px', // Spacing between form and map
    },
    formTitle: {
        textAlign: 'center',
    },
    label: {
        marginTop: '10px',
        display: 'block',
    },
    input: {
        width: '100%',
        padding: '10px',
        marginTop: '5px',
        border: '1px solid #ccc',
        borderRadius: '5px',
    },
    textarea: {
        width: '100%',
        padding: '10px',
        marginTop: '5px',
        border: '1px solid #ccc',
        borderRadius: '5px',
    },
    button: {
        marginTop: '20px',
        padding: '10px',
        backgroundColor: '#5cb85c',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        width: '100%',
        backgroundColor: 'blue'
    },
    map: {
        flex: 1,
        height: '400px', // Set height for the map
    },
};

export default Contact;
