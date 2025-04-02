import React, { useState } from "react";
import { Link } from "react-router-dom";
import Book_dropdown_menu from "../books.dropdown.menu";

const Header = () => {
    const [isDropdownVisible, setDropdownVisible] = useState(false);

    return (
        <>
            <header>
                <div className="store_title">
                    Book Store Title
                </div>
                <ul className="navbar_links">
                    <li>Home</li>
                    <li 
                        onMouseEnter={() => setDropdownVisible(true)}
                        onMouseLeave={() => setDropdownVisible(false)}
                    >
                        Books
                        {isDropdownVisible && <Book_dropdown_menu />}
                    </li>
                    <li>Contact</li>
                    <li>User</li>
                </ul>
            </header>
        </>
    );
};

export default Header;