// Import React and various components and libraries
import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Dropdown,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Row,
  Col,
  Container,
} from "reactstrap";
import { HashLink } from 'react-router-hash-link';

// Import FontAwesome icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import SignUp from "views/index-sections/SignUp";
import { Avatar } from '@material-ui/core';
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import logo from "../../assets/img/arunahflogo.png";


function NavbarShort() {
  // Define various state variables
  const [collapseOpen, setCollapseOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [closeTimeout, setCloseTimeout] = useState(null);
  const [click, setClick] = useState(false); // Add a click state
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const whiteTextColorClass = screenWidth < 1000 ? 'slate-text' : '';
  const [modal, setModal] = useState(false);


  // Function to handle click event
  const handleClick = () => {
    setClick(!click); // Toggle the click state
  };

  // Define state for dropdown menus
  const [dropdowns, setDropdowns] = useState([
    { id: "solutions", isOpen: false },
  ]);

  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [userProfilePicture, setUserProfilePicture] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  // Function to open the modal
  const openModal = () => {
    setModalOpen(true);
  };
  
  // Function to close the modal
  const closeModal = () => {
    setModalOpen(false);
  };

  const handleUserLoggedIn = (email) => {
    setIsLoggedIn(true);
    setUserEmail(email);
    const profilePicture = getProfilePictureFromCookie();
    setUserProfilePicture(profilePicture);
  };
  

  const getProfilePictureFromCookie = () => {
    const cookies = document.cookie.split('; ');
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i];
      let eqPos = cookie.indexOf('=');
      let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      if (name === 'profilePicture') {
        return cookie.substr(eqPos + 1);
      }
    }
    return '';
  };

  const getEmailFromCookie = () => {
    const cookies = document.cookie.split('; ');
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i];
      let eqPos = cookie.indexOf('=');
      let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      if (name === 'email') {
        return cookie.substr(eqPos + 1);
      }
    }
    return '';
  };
  const clearEmailCookie = () => {
    document.cookie = "email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  };
  const clearProfilePictureCookie = () => {
    document.cookie = "profilePicture=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
   };
   
   const handleUserLoggedOut = () => {
    clearEmailCookie();
    clearProfilePictureCookie();
    setIsLoggedIn(false);
    setUserEmail('');
    setUserProfilePicture('');
   };
   

  // Create a reference to the menu element
  const menuRef = useRef();

  // Use useEffect for side effects and event listeners
  useEffect(() => {
    const email = getEmailFromCookie();
    const profilePicture = getProfilePictureFromCookie();

    if (email) {
      setIsLoggedIn(true);
      setUserEmail(email);
      setUserProfilePicture(profilePicture);


    } else {
      setIsLoggedIn(false);
      setUserEmail('');
      setUserProfilePicture('');
    }
 
    // Function to handle window resize
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    // Add a window resize event listener
    window.addEventListener("resize", handleResize);

    // Function to handle clicks outside of the menu
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setOpen(false);
        console.log(menuRef.current);
      }
    };

    // Add a document click event listener
    document.addEventListener("mousedown", handler);

    // Add logic to set click to true when screen width is 1000px
    if (window.innerWidth >= 1000) {
      setClick(true);
    } else {
      setClick(false);
    }

    // Cleanup: remove event listeners
    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  // Function to toggle a dropdown menu
  const toggleDropdown = (id) => {
    const updatedDropdowns = dropdowns.map((dropdown) => {
      if (dropdown.id === id) {
        return { ...dropdown, isOpen: !dropdown.isOpen };
      }
      return dropdown;
    });
    setDropdowns(updatedDropdowns);
  };


     
  return (
    <div ref={menuRef} >
 
      
      <Navbar
  className='navbar-top sticky-top'
//   expand="lg"
  style={{ maxWidth:"100%",background: "#424242",
  fontFamily: "Raleway, sans-serif",color: "#d4d4d4"
   }}
>
            
          <div className="sticky-nav" style={{width: "100%",backgroundColor: "transparent"}}>
          <Nav navbar style={{ width: "100%" }}>
  <NavItem className={click ? "d-flex align-items-left justify-content-left sticky-border" : "d-flex align-items-left justify-content-left"}>
    <i
      className={click ? "fas fa-times d-flex align-items-right justify-content-right mr-2 mt-1" : "fas fa-bars d-flex align-items-right justify-content-right mr-2 mt-1"}
      onClick={handleClick}
      style={{ fontSize: "26px", position: "absolute", right: "15px", cursor: "pointer", color: "white" }}
    />
  <h2 className="navbar-brand-h" style={{color:"white"}}>    Aruna Handloom Fabrics</h2>
  </NavItem>
  <NavItem className="sticky-border">
 
  </NavItem>
</Nav>

</div>

            {click && (
              <Container
              className="pl-5" // Apply the "sticky-border" class here
              style={{
    // height: "100vh",
    // height: "100%",
    // borderTop: "1px solid #ccc",
    maxWidth: "100vw", // Set maxWidth to 100% to occupy full width
  }}
>
<Nav className="d-flex align-items-center justify-content-center" navbar style={{  width: "100%", textAlign:"center"}}>
 
   <NavItem className="pb-2 pt-2">
   <NavLink to="/" tag={Link}>

  <p className="nav-p"
    style={{ color:"white",fontSize: "100%", margin: "0", padding: "0 0" }}
    >
    Home 
  </p>
  </NavLink>
  
</NavItem>

<NavItem className="pb-2 pt-2">
   <NavLink >

  <HashLink to="/#about-us" smooth={true} className="nav-p"
    style={{ fontSize: "100%", margin: "0", padding: "0 0" }}
    >
    About Us 
  </HashLink>
  </NavLink>
  
</NavItem>
<NavItem className="pb-2 pt-2">
   <NavLink to="/portfolio" tag={Link}>

  <p className="nav-p"
    style={{ color:"white",fontSize: "100%", margin: "0", padding: "0 0" }}
    >
    Portfolio
  </p>
  </NavLink>
  
</NavItem>
<NavItem className="pb-2 pt-2">
   <NavLink >

  <HashLink to="/#contact" smooth={true} className="nav-p"
    style={{ fontSize: "100%", margin: "0", padding: "0 0" }}
    >
    Contact Us
  </HashLink>
  </NavLink>
  
</NavItem>
  
  
  </Nav>

  </Container>

)}
    
              

{/* </Container> */}

<style>
  {`

.sticky-nav {
    position: sticky;
    // top: 0;
    background-color: #fff; /* Set the background color as needed */
    z-index: 1000; /* Adjust the z-index as needed */
  }
  
/* Add this CSS to your stylesheets or in a <style> tag */

  .dropdown-menu {
    background-color: rgb(29, 33, 43); 
    font-size: 120%;
    font-weight: 200;
    color: white; 
    border-radius: 20px;
    position: absolute;
  }
  .dropdown-menu:hover {
    background-color: rgb(29, 33, 43); 
    color: white; 
    border-radius: 20px;
    position: absolute;
  }
 

  .custom-dropdown-toggle p {
    font-size: 120%;
  }
  .white-text {
    color: #fff;
    font-size: 60%;
    padding-left: 3%;
    padding-top: 1%;

  }
  .slate-text{
    color: #000;

  }
  .blueText {
    color: #008FBF; /* Change this to your desired blue color */
  }
  @media only screen and (max-width: 280px) {
    .navbar-brand-h{
      font-size: 17px !important;
    }
    .nav-p{
      font-size: 20px !important;
      color: white;
    }
    .navbar-top {
      // top: -9%;
      left: 0;
      right: 0;
      position: fixed;
      z-index: 1000; /* Adjust the z-index as needed */
    }
    
   .navbar-logo{
    padding-left: 2% !important;
   }

   .slate-text{
    color: #000;
    font-size: 20px !important;
    font-weight: 400 !important;


  }
  .blueText {
    color: #000; /* Change this to your desired blue color */
    font-size: 20px !important;
    // margin-left: -5% !important;


  }
  .white-text {
    font-size: 20px !important;
    // margin-left: -5% !important;

   

  }
  .service-p{
    // margin-left: -5% !important;

  }

    
       }
  /* CSS for screen width 280px to 540px */
  @media only screen and (min-width: 281px) and (max-width: 766px) {
    .navbar-brand-h{
      font-size: 20px !important;
    }
    .nav-p{
      font-size: 20px !important;
      color: white;
    }
    .navbar-top {
      // top: -9%;
      left: 0;
      right: 0;
      position: fixed;
      z-index: 1000; /* Adjust the z-index as needed */
    }
    
   .navbar-logo{
    padding-left: 2% !important;
   }

   .slate-text{
    color: #000;
    font-size: 20px !important;
    font-weight: 400 !important;


  }
  .blueText {
    color: #000; /* Change this to your desired blue color */
    font-size: 20px !important;
    // margin-left: -5% !important;


  }
  .white-text {
    font-size: 20px !important;
    // margin-left: -5% !important;

   

  }
  .service-p{
    // margin-left: -5% !important;

  }

    
       }
  @media only screen and (min-width: 767px) and (max-width: 912px) {
    .navbar-top {
      // top: -3%;
      left: 0;
      right: 0;
      position: fixed;
      z-index: 1000; /* Adjust the z-index as needed */
    }
    .navbar-brand-h{
      font-size: 28px !important;
    }
    .nav-p{
      font-size: 28px !important;
      padding-bottom: 3% !important;
      color: white;
    }
    
    .navbar-logo{
     }
   
     .slate-text{
      color: #000;
      // margin-bottom: -2% !important;
      font-size: 28px !important;
      font-weight: 400 !important;
      padding-left: 5% !important;
      padding-bottom: 3% !important;
  
    }
    .blueText {
      color: #000; /* Change this to your desired blue color */
      font-size: 28px !important;
      padding-bottom: 3% !important;

  
    }
    .white-text {
      font-size: 28px !important;
      padding-bottom: 3% !important;

  
    }
   
    
       }
       .dropdown-toggle-text {
        display: flex;
        align-items: center; /* Align vertically in the middle */
        justify-content: space-between;
      }
  
      .dropdown-toggle-text .blueText {
        margin-right: 5px; /* Add spacing between text and icon */
        padding-bottom: 3% !important;

      }
      
  
      .sticky-border {
        position: sticky;
        // top: 0;
        // background-color: white; /* Add a background color if needed */
        // z-index: 1; /* You may need to adjust the z-index based on your layout */
        border-bottom: 0.5px solid #ccc; /* Adjust border properties as needed */
      }
      .hr-line{
        border-bottom: 1px solid #000; /* Adjust the color and width as needed */
        width: 100%; /* Set the width to 100% to span the entire width of the NavItem */
        
      }

      @media only screen and (min-width: 1024px) {
        .navbar-logo{
         }
      }
      
  
  ` 
  }
</style>
</Navbar>

    </div>
);
}

export default NavbarShort;
