import React from "react";
import Browse_books from "../buttons/browse.books";
import Featured_books from "../containers/featured.books";

const Welcome_Section = () => {
    return (
        <>
            <div className="homepage_container">
                <section className="upper_section">
                    <h2>Welcome to BOOK STORE TITLE</h2>
                    <h3>Discover your next favorit book from our vast collection</h3>
                    <Browse_books />
                </section>
                <section className="under_section">
                    <h2>Featured Books</h2>
                    <Featured_books />
                </section>
            </div>
        </>
    );
};

export default Welcome_Section;