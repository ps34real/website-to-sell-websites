/* ============================================
   JAVASCRIPT FILE - script.js
   ============================================
   
   This file adds interactivity to the website.
   JavaScript runs in the browser and makes things interactive.
   
   KEY CONCEPTS:
   - Events: Things the user does (clicks, scrolls, submits)
   - Functions: Blocks of code that do something
   - Variables: Store information
   - DOM: The actual HTML elements on the page
   
   Think of it like this:
   - HTML = structure (skeleton)
   - CSS = appearance (clothes)
   - JavaScript = behavior (how it moves and reacts)
============================================ */


// ============================================
// PART 1: FORM HANDLING
// ============================================

/* 
   DOCUMENT READY CHECK
   This waits for the page to fully load before running code
   
   DOMContentLoaded event fires when HTML is loaded
   Inside the function, we set up event listeners
*/
document.addEventListener('DOMContentLoaded', function() {
    
    /* 
       GET THE FORM ELEMENT
       document.getElementById('contact-form') finds the form with id="contact-form"
       We store it in a variable so we can use it later
    */
    const contactForm = document.getElementById('contact-form');
    
    /* 
       ADD EVENT LISTENER
       When user submits the form (clicks submit button), run the function
       .addEventListener('submit', function) = listen for form submission
    */
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            if (!name || !email || !message) {
                alert('Please fill in all required fields.');
                event.preventDefault();
                return;
            }
            
            if (!email.includes('@')) {
                alert('Please enter a valid email address.');
                event.preventDefault();
                return;
            }
            
            localStorage.setItem('lastFormSubmission', JSON.stringify({
                name: name,
                email: email,
                message: message,
                submittedAt: new Date().toLocaleString()
            }));
        });
    }
});

// ============================================
// PART 2: SMOOTH SCROLL BEHAVIOR
// ============================================

/* 
   SMOOTH SCROLL LINKS
   Makes navigation links scroll smoothly to sections
   
   querySelectorAll() finds multiple elements matching a selector
   'a[href^="#"]' = all <a> tags with href starting with #
   
   forEach() = run code for each element found
*/
const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');

/* 
   Loop through each link
   link = current link being processed
*/
smoothScrollLinks.forEach(function(link) {
    
    /* 
       ADD CLICK LISTENER TO EACH LINK
       When user clicks the link, run this function
    */
    link.addEventListener('click', function(event) {
        
        /* 
           GET THE TARGET ELEMENT ID
           If href="#services", extract "services"
           .slice(1) removes the # symbol
        */
        const targetId = this.getAttribute('href').slice(1);
        
        /* 
           FIND THE TARGET ELEMENT
           Find the section with that ID
           #services = <section id="services">
        */
        const targetElement = document.getElementById(targetId);
        
        /* 
           SCROLL TO TARGET
           Only do this if target element exists
           if (targetElement) means "if target was found"
        */
        if (targetElement) {
            event.preventDefault(); // Stop default link behavior
            
            /* 
               SCROLL THE ELEMENT INTO VIEW
               behavior: 'smooth' = animated scroll (not instant jump)
               block: 'start' = scroll to top of element
            */
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// PART 3: SCROLL TO TOP BUTTON (OPTIONAL)
// ============================================

/* 
   SCROLL TO TOP BUTTON
   This code creates a "back to top" button
   
   First, find or create the button element
*/
let scrollToTopButton = document.getElementById('scroll-top-btn');

/* 
   If button doesn't exist, create it
   if (!scrollToTopButton) = if button wasn't found
*/
if (!scrollToTopButton) {
    // Create button element
    scrollToTopButton = document.createElement('button');
    
    // Set button properties
    scrollToTopButton.id = 'scroll-top-btn';
    scrollToTopButton.innerHTML = '↑ Top';
    scrollToTopButton.className = 'btn btn-primary';
    
    /* 
       SET BUTTON STYLES
       style.position = where button is positioned
       style.bottom/right = distance from bottom/right edge
       style.display = 'none' hides the button initially
    */
    scrollToTopButton.style.position = 'fixed'; // Stays in place when scrolling
    scrollToTopButton.style.bottom = '2rem';
    scrollToTopButton.style.right = '2rem';
    scrollToTopButton.style.display = 'none';
    scrollToTopButton.style.zIndex = '99'; // Layer on top
    
    // Add button to page
    document.body.appendChild(scrollToTopButton);
}

/* 
   SCROLL EVENT LISTENER
   This runs every time user scrolls the page
   
   window.addEventListener = listen to window (whole page)
   'scroll' = event that fires when scrolling
*/
window.addEventListener('scroll', function() {
    
    /* 
       CHECK HOW FAR DOWN PAGE IS
       window.pageYOffset or window.scrollY = pixels scrolled from top
       
       If user has scrolled down 300 pixels, show the button
       If not, hide the button
    */
    if (window.pageYOffset > 300) {
        scrollToTopButton.style.display = 'block'; // Show button
    } else {
        scrollToTopButton.style.display = 'none'; // Hide button
    }
});

/* 
   SCROLL TO TOP CLICK
   When user clicks the button, scroll to top
*/
scrollToTopButton.addEventListener('click', function() {
    
    /* 
       SCROLL PAGE TO TOP
       window.scrollTo = scroll to specific position
       top: 0 = scroll to top (0 pixels down)
       behavior: 'smooth' = smooth animation
    */
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ============================================
// PART 4: ADD ACTIVE CLASS TO NAVIGATION
// ============================================

/* 
   HIGHLIGHT CURRENT SECTION IN NAV
   Shows which section user is viewing
   
   As user scrolls, update which nav link looks "active"
*/
window.addEventListener('scroll', function() {
    
    // Find all sections
    const sections = document.querySelectorAll('section');
    
    // Find all nav links
    const navLinks = document.querySelectorAll('.nav-links a');
    
    /* 
       LOOP THROUGH SECTIONS
       Check which section is currently in view
    */
    sections.forEach(function(section) {
        
        // Get section position
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        // Check if section is in viewport
        if (window.pageYOffset >= sectionTop - 100) {
            
            // Get section ID
            const sectionId = section.getAttribute('id');
            
            // Find matching nav link
            const activeLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
            
            // Remove active class from all links
            navLinks.forEach(function(link) {
                link.style.color = ''; // Reset color
                link.style.fontWeight = '500'; // Reset weight
            });
            
            // Add active styling to current link
            if (activeLink) {
                activeLink.style.color = '#0066cc'; // Primary color
                activeLink.style.fontWeight = '700'; // Bold
            }
        }
    });
});

// ============================================
// PART 5: ANIMATE ELEMENTS ON SCROLL
// ============================================

/* 
   INTERSECTION OBSERVER API
   This detects when elements come into view
   
   Great for lazy loading images or animating on scroll
   without tracking scroll position constantly
   
   IntersectionObserver = fancy way to detect visibility
*/
const observerOptions = {
    threshold: 0.1, // 10% of element must be visible
    rootMargin: '0px 0px -50px 0px' // Check earlier (before fully visible)
};

/* 
   CREATE OBSERVER
   Callback function runs when element comes into view
*/
const observer = new IntersectionObserver(function(entries) {
    
    /* 
       LOOP THROUGH OBSERVED ELEMENTS
       entries = array of elements being observed
    */
    entries.forEach(function(entry) {
        
        /* 
           CHECK IF ELEMENT IS IN VIEW
           entry.isIntersecting = true if element is visible
        */
        if (entry.isIntersecting) {
            
            // Add animation class
            entry.target.classList.add('animate-in');
            
            // Optional: stop observing this element after animation
            // observer.unobserve(entry.target);
        }
    });
}, observerOptions);

/* 
   OBSERVE CARDS
   Find all service and feature cards and observe them
   
   querySelectorAll = find all matching elements
*/
const cardsToAnimate = document.querySelectorAll('.service-card, .feature, .testimonial-card');

/* 
   LOOP AND START OBSERVING
   forEach = run code for each card
*/
cardsToAnimate.forEach(function(card) {
    observer.observe(card); // Start watching this card
});

/* 
   ADD CSS ANIMATION
   We define the animation in CSS
   This JavaScript just applies the class that triggers it
   
   To use this, add this to CSS:
   
   @keyframes slideInUp {
       from {
           opacity: 0;
           transform: translateY(20px);
       }
       to {
           opacity: 1;
           transform: translateY(0);
       }
   }
   
   .animate-in {
       animation: slideInUp 0.6s ease forwards;
   }
*/

// ============================================
// PART 6: MOBILE MENU TOGGLE (OPTIONAL)
// ============================================

/* 
   MOBILE MENU BUTTON
   If you add a hamburger menu, control it here
   
   This is an example for when you add a mobile menu
   Uncomment and customize based on your HTML
*/

/*
// Find hamburger button and nav menu
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-links');

// If hamburger button exists
if (hamburger && navMenu) {
    
    // Toggle menu when clicking hamburger
    hamburger.addEventListener('click', function() {
        
        // Toggle 'active' class on nav menu
        navMenu.classList.toggle('active');
        
        // Toggle 'active' class on hamburger
        hamburger.classList.toggle('active');
    });
    
    // Close menu when clicking a nav link
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}
*/

// ============================================
// PART 7: UTILITY FUNCTIONS
// ============================================

/* 
   UTILITY FUNCTIONS
   Reusable functions for common tasks
   
   Function = block of code that does one thing
   Can be called multiple times from different places
*/

/* 
   DEBOUNCE FUNCTION
   Prevents function from running too many times
   
   Useful for scroll/resize events that fire many times per second
   This waits until event stops before running the function
*/
function debounce(func, wait) {
    let timeout; // Variable to store timeout
    
    // Return a function that will be called
    return function(...args) {
        // Clear previous timeout
        clearTimeout(timeout);
        
        // Set new timeout to run function after 'wait' milliseconds
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

/* 
   SIMPLE EXAMPLE OF USING DEBOUNCE
   
   window.addEventListener('resize', debounce(function() {
       console.log('Window resized!');
   }, 250)); // Wait 250ms after resize stops before running
*/

// ============================================
// PART 8: CONSOLE LOGGING FOR DEBUGGING
// ============================================

/* 
   LOG WHEN PAGE LOADS
   This helps you debug if something isn't working
   
   Open browser console with F12 to see these messages
*/
console.log('Website loaded successfully!');
console.log('If you see this, JavaScript is working.');

/* 
   CHECK LOCAL STORAGE
   Shows if form data was saved
*/
const savedFormData = localStorage.getItem('lastFormSubmission');
if (savedFormData) {
    console.log('Last form submission:', JSON.parse(savedFormData));
}

// ============================================
// PART 9: KEYBOARD SHORTCUTS (OPTIONAL)
// ============================================

/* 
   KEYBOARD SHORTCUTS
   You can add keyboard shortcuts for advanced users
   
   keydown event fires when user presses a key
   event.key tells us which key was pressed
*/
document.addEventListener('keydown', function(event) {
    
    // Ctrl+K or Cmd+K opens contact form
    if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault(); // Stop browser default behavior
        
        // Scroll to contact form
        document.getElementById('contact').scrollIntoView({
            behavior: 'smooth'
        });
    }
});

// ============================================
// END OF JAVASCRIPT FILE
// ============================================

/* 
   KEY CONCEPTS SUMMARY:
   
   1. EVENTS: User actions
      - click: user clicks element
      - scroll: user scrolls page
      - submit: user submits form
      - keydown: user presses keyboard key
      - DOMContentLoaded: page fully loaded
   
   2. DOM MANIPULATION: Change HTML
      - document.getElementById() = find element by id
      - document.querySelector() = find element by CSS selector
      - .addEventListener() = listen for events
      - .classList.add() / .classList.remove() = change classes
      - .style.property = change inline styles
   
   3. VARIABLES: Store information
      - const = constant (doesn't change)
      - let = can change
      - var = old way (avoid)
   
   4. OBJECTS: Organized data
      - { name: 'John', email: 'john@example.com' }
      - Access with: object.name or object['name']
   
   5. ARRAYS: Lists of items
      - [1, 2, 3] or ['apple', 'banana']
      - forEach() = loop through items
   
   6. FUNCTIONS: Reusable code
      - function name() { code here }
      - function(param) { use param }
   
   7. CONDITIONS: Make decisions
      - if (condition) { run if true }
      - else { run if false }
      - || means OR
      - && means AND
      - ! means NOT
   
   8. METHODS: Functions built into objects
      - string.includes() = check if contains text
      - array.forEach() = loop through array
      - object.addEventListener() = listen for event
   
   BEST PRACTICES:
   - Use meaningful variable names
   - Add comments explaining code
   - Test in browser console
   - Use const by default, let if needed
   - Avoid global variables
   - Keep functions small and focused
   - Handle errors gracefully
   - Test on mobile devices
*/
