import React from 'react';
import Header from '../components/partials/header';
import Welcome_Section from '../components/partials/homepage_welcome';
import Footer from '../components/partials/footer';

const Homepage = () => {
    return (
        <div className='HomePage_Styling'>
            <Header />
            <Welcome_Section />
            <Footer />
        </div>
    );
};

export default Homepage;