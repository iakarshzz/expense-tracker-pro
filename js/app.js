/* ===========================
   MOBILE MENU FUNCTIONALITY
=========================== */


const menuBtn = document.querySelector(".menu-btn");

const sidebar = document.querySelector(".sidebar");



if (menuBtn && sidebar) {


    // Open / Close Sidebar

    menuBtn.addEventListener("click", () => {


        sidebar.classList.toggle("active");


    });



    // Close sidebar after selecting option

    const menuItems = document.querySelectorAll(".sidebar li");


    menuItems.forEach(item => {


        item.addEventListener("click", () => {


            sidebar.classList.remove("active");


        });


    });


}
