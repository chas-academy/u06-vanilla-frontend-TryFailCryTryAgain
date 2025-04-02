import React from "react";
import Featured_book_card from "../feature.book.card";

const featured_books = () => {

    return (
        <>
            <section className="featured_books_container">
                {Array.from({ length: 6}).map((_, index) => (
                    <Featured_book_card key={index}/>
                ))}
            </section>
        </>
    );
};

export default featured_books;