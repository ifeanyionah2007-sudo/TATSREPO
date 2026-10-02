/* =========================================
   TATS DESIGN ADMIN DASHBOARD
========================================= */


/* =========================================
   MOBILE SIDEBAR
========================================= */

const adminSidebar = document.getElementById("adminSidebar");
const adminMenuButton = document.getElementById("adminMenuButton");

if (adminSidebar && adminMenuButton) {

    adminMenuButton.addEventListener("click", function() {

        adminSidebar.classList.toggle("admin-sidebar-open");

    });

}


/* =========================================
   CLOSE MOBILE SIDEBAR
   WHEN A NAVIGATION LINK IS CLICKED
========================================= */

const adminNavLinks = document.querySelectorAll(".admin-nav-link");

adminNavLinks.forEach(function(link) {

    link.addEventListener("click", function() {

        if (window.innerWidth <= 900) {

            adminSidebar.classList.remove("admin-sidebar-open");

        }

    });

});


/* =========================================
   ADMIN LOGOUT
========================================= */

const adminLogoutButton = document.getElementById("adminLogoutButton");

if (adminLogoutButton) {

    adminLogoutButton.addEventListener("click", function() {

        const confirmLogout = confirm(
            "Are you sure you want to logout?"
        );

        if (!confirmLogout) {
            return;
        }

        /*
            Remove the current customer session.
            This is temporary frontend behavior.
            Real admin authentication will be handled
            by the backend later.
        */

        localStorage.removeItem("tatsDesignCurrentUser");

        window.location.href = "login.html";

    });

}


/* =========================================
   NOTIFICATION BUTTON
========================================= */

const adminNotificationButton = document.querySelector(
    ".admin-notification-button"
);

if (adminNotificationButton) {

    adminNotificationButton.addEventListener("click", function() {

        alert("There are no new notifications.");

    });

}


/* =========================================
   ADMIN NAVIGATION
========================================= */

adminNavLinks.forEach(function(link) {

    link.addEventListener("click", function(event) {

        const linkTarget = link.getAttribute("href");

        /*
            Only prevent the click for placeholder links.
            The Dashboard link is allowed to work normally.
        */

        if (linkTarget === "#") {

            event.preventDefault();

            adminNavLinks.forEach(function(navLink) {

                navLink.classList.remove("active");

            });

            link.classList.add("active");

        }

    });

});