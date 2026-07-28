/* ===========================
   DASHBOARD FUNCTIONALITY
=========================== */


// Default dashboard data

let dashboardData = {

    balance: 0,

    income: 0,

    expense: 0,

    savings: 0

};





// Stores current transaction type

let transactionType = "";






/* ===========================
   UPDATE DASHBOARD VALUES
=========================== */


function updateDashboard(){


    const balance = document.querySelector(".balance");

    const income = document.querySelector(".income");

    const expense = document.querySelector(".expense");

    const savings = document.querySelector(".savings");



    if(balance){

        balance.innerText = formatMoney(dashboardData.balance);

    }



    if(income){

        income.innerText = formatMoney(dashboardData.income);

    }



    if(expense){

        expense.innerText = formatMoney(dashboardData.expense);

    }



    if(savings){

        savings.innerText = formatMoney(dashboardData.savings);

    }


}





/* ===========================
   MONEY FORMATTER
=========================== */


function formatMoney(amount){


    return getCurrencySymbol() + amount.toLocaleString();


}







/* ===========================
   TRANSACTION MODAL
=========================== */


const incomeBtn = document.querySelector("#incomeBtn");

const expenseBtn = document.querySelector("#expenseBtn");

const modal = document.querySelector("#transactionModal");

const modalTitle = document.querySelector("#modalTitle");

const closeModal = document.querySelector("#closeModal");





// Open Income Modal

if(incomeBtn){


    incomeBtn.addEventListener("click",()=>{


        transactionType = "income";


        modalTitle.innerText = "Add Income";


        modal.classList.add("active");


    });


}






// Open Expense Modal

if(expenseBtn){


    expenseBtn.addEventListener("click",()=>{


        transactionType = "expense";


        modalTitle.innerText = "Add Expense";


        modal.classList.add("active");


    });


}






// Close Modal

if(closeModal){


    closeModal.addEventListener("click",()=>{


        modal.classList.remove("active");


    });


}






/* ===========================
   LOAD DASHBOARD
=========================== */


updateDashboard();
