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





// Load dashboard

updateDashboard();
