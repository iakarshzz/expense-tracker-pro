/* ===========================
   DASHBOARD FUNCTIONALITY
=========================== */


let transactions = JSON.parse(localStorage.getItem("transactions")) || [];





/* ===========================
   DASHBOARD UPDATE
=========================== */


function updateDashboard(){


    let income = 0;

    let expense = 0;



    transactions.forEach(transaction=>{


        if(transaction.type === "income"){

            income += transaction.amount;

        }


        if(transaction.type === "expense"){

            expense += transaction.amount;

        }


    });





    let balance = income - expense;





    const balanceElement = document.querySelector(".balance");

    const incomeElement = document.querySelector(".income");

    const expenseElement = document.querySelector(".expense");

    const savingsElement = document.querySelector(".savings");





    if(balanceElement){

        balanceElement.innerText = formatMoney(balance);

    }



    if(incomeElement){

        incomeElement.innerText = formatMoney(income);

    }



    if(expenseElement){

        expenseElement.innerText = formatMoney(expense);

    }



    if(savingsElement){

        savingsElement.innerText = formatMoney(balance);

    }



}







/* ===========================
   MONEY FORMAT
=========================== */


function formatMoney(amount){


    return getCurrencySymbol() + amount.toLocaleString("en-US");


}








/* ===========================
   MODAL SYSTEM
=========================== */


const transactionBtn = document.querySelector("#transactionBtn");

const modal = document.querySelector("#transactionModal");

const closeModal = document.querySelector("#closeModal");

const saveTransaction = document.querySelector("#saveTransaction");





const amountInput = document.querySelector("#amountInput");

const typeInput = document.querySelector("#typeInput");

const categoryInput = document.querySelector("#categoryInput");

const noteInput = document.querySelector("#noteInput");

const dateInput = document.querySelector("#dateInput");






// Open Modal


if(transactionBtn){


    transactionBtn.addEventListener("click",()=>{


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
   SAVE TRANSACTION
=========================== */


if(saveTransaction){


    saveTransaction.addEventListener("click",()=>{


        let amount = Number(amountInput.value);



        if(!amount || !typeInput.value){


            alert("Please enter amount and type");


            return;


        }






        let transaction = {


            id: Date.now(),


            amount: amount,


            type: typeInput.value,


            category: categoryInput.value,


            note: noteInput.value,


            date: dateInput.value || new Date().toISOString().split("T")[0]


        };






        transactions.push(transaction);






        localStorage.setItem(

            "transactions",

            JSON.stringify(transactions)

        );






        updateDashboard();






        modal.classList.remove("active");






        // Clear form


        amountInput.value = "";

        typeInput.value = "";

        categoryInput.value = "";

        noteInput.value = "";

        dateInput.value = "";



    });


}







// Initial Load

updateDashboard();
