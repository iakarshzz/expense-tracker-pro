/* ===========================
   EXPENSE TRACKER PRO
   DASHBOARD.JS
=========================== */

let transactions =
JSON.parse(localStorage.getItem("transactions")) || [];

/* ===========================
   DOM ELEMENTS
=========================== */

const transactionBtn =
document.querySelector("#transactionBtn");

const modal =
document.querySelector("#transactionModal");

const closeModal =
document.querySelector("#closeModal");

const cancelBtn =
document.querySelector("#cancelTransaction");

const saveTransaction =
document.querySelector("#saveTransaction");

const amountInput =
document.querySelector("#amountInput");

const categoryInput =
document.querySelector("#categoryInput");

const dateInput =
document.querySelector("#dateInput");

const incomeRadio =
document.querySelector("#incomeType");

const expenseRadio =
document.querySelector("#expenseType");

const transactionContainer =
document.querySelector(".transactions");

/* ===========================
   CATEGORY DATA
=========================== */

const incomeCategories = [

"💼 Salary",
"💻 Freelance",
"🤝 Collaboration",
"🏢 Business",
"📈 Investment",
"🎁 Gift",
"💸 Bonus",
"🏦 Interest"

];

const expenseCategories = [

"🍔 Food",
"✈️ Travel",
"🛍 Shopping",
"🏠 Rent",
"⚡ Bills",
"🏥 Medical",
"📚 Education",
"🎮 Entertainment",
"⛽ Fuel",
"📦 Other"

];

/* ===========================
   OPEN MODAL
=========================== */

if(transactionBtn){

transactionBtn.addEventListener("click",()=>{

modal.classList.add("active");

dateInput.value =
new Date().toISOString().split("T")[0];

});

}

/* ===========================
   CLOSE MODAL
=========================== */

function closeTransactionModal(){

modal.classList.remove("active");

amountInput.value="";

categoryInput.innerHTML=
'<option value="">Select Category</option>';

incomeRadio.checked=false;

expenseRadio.checked=false;

dateInput.value="";

}

if(closeModal){

closeModal.addEventListener(

"click",

closeTransactionModal

);

}

if(cancelBtn){

cancelBtn.addEventListener(

"click",

closeTransactionModal

);

}
/* ===========================
   TYPE & CATEGORY
=========================== */

function loadCategories(type){

categoryInput.innerHTML =
'<option value="">Select Category</option>';

let categories = [];

if(type === "income"){

categories = incomeCategories;

}else{

categories = expenseCategories;

}

categories.forEach(category=>{

const option =
document.createElement("option");

option.value =
category.replace(/^[^\w]+/, "").trim();

option.textContent =
category;

categoryInput.appendChild(option);

});

}

if(incomeRadio){

incomeRadio.addEventListener("change",()=>{

loadCategories("income");

});

}

if(expenseRadio){

expenseRadio.addEventListener("change",()=>{

loadCategories("expense");

});

}

/* ===========================
   MONEY FORMAT
=========================== */

function formatMoney(amount){

return getCurrencySymbol() +
amount.toLocaleString("en-US");

}

/* ===========================
   DASHBOARD UPDATE
=========================== */

function updateDashboard(){

let income = 0;

let expense = 0;

transactions.forEach(transaction=>{

if(transaction.type==="income"){

income += transaction.amount;

}else{

expense += transaction.amount;

}

});

const balance = income - expense;

document.querySelectorAll(".balance")
.forEach(el=>{

el.innerText =
formatMoney(balance);

});

document.querySelectorAll(".income")
.forEach(el=>{

el.innerText =
formatMoney(income);

});

document.querySelectorAll(".expense")
.forEach(el=>{

el.innerText =
formatMoney(expense);

});

document.querySelectorAll(".savings")
.forEach(el=>{

el.innerText =
formatMoney(balance);

});

renderTransactions();

}
/* ===========================
   SAVE TRANSACTION
=========================== */

if(saveTransaction){

saveTransaction.addEventListener("click",()=>{

const amount =
Number(amountInput.value);

let type = "";

if(incomeRadio.checked){

type = "income";

}

if(expenseRadio.checked){

type = "expense";

}

const category =
categoryInput.value;

const date =
dateInput.value ||
new Date().toISOString().split("T")[0];

/* Validation */

if(amount <= 0){

alert("Please enter a valid amount.");

return;

}

if(type === ""){

alert("Please select transaction type.");

return;

}

if(category === ""){

alert("Please select a category.");

return;

}

/* Create Transaction */

const transaction = {

id: Date.now(),

amount: amount,

type: type,

category: category,

date: date

};

/* Save */

transactions.push(transaction);

localStorage.setItem(

"transactions",

JSON.stringify(transactions)

);

/* Refresh Dashboard */

updateDashboard();

/* Close Modal */

closeTransactionModal();

});

}

/* ===========================
   DELETE TRANSACTION
=========================== */

function deleteTransaction(id){

transactions = transactions.filter(

transaction =>

transaction.id !== id

);

localStorage.setItem(

"transactions",

JSON.stringify(transactions)

);

updateDashboard();

}
/* ===========================
   RENDER TRANSACTIONS
=========================== */

function renderTransactions(){

const emptyState =
document.querySelector(".empty-state");

let oldList =
document.querySelector(".transaction-list");

if(oldList){

oldList.remove();

}

if(transactions.length === 0){

if(emptyState){

emptyState.style.display = "block";

}

return;

}

if(emptyState){

emptyState.style.display = "none";

}

const list =
document.createElement("div");

list.className = "transaction-list";

transactions
.slice()
.reverse()
.forEach(transaction=>{

const card =
document.createElement("div");

card.className =
"transaction-item";

card.innerHTML = `

<div class="transaction-left">

<h4>${transaction.category}</h4>

<p>

${transaction.type === "income" ? "Income" : "Expense"}

•

${transaction.date}

</p>

</div>

<div class="transaction-right">

<span class="${
transaction.type === "income"
? "income-text"
: "expense-text"
}">

${transaction.type === "income" ? "+" : "-"}

${formatMoney(transaction.amount)}

</span>

<button
class="delete-btn"
data-id="${transaction.id}">

🗑

</button>

</div>

`;

list.appendChild(card);

});

transactionContainer.appendChild(list);

/* Delete Events */

document
.querySelectorAll(".delete-btn")
.forEach(button=>{

button.addEventListener("click",()=>{

const id =
Number(button.dataset.id);

deleteTransaction(id);

});

});

}

/* ===========================
   CLOSE MODAL ON OUTSIDE CLICK
=========================== */

window.addEventListener("click",(event)=>{

if(event.target === modal){

closeTransactionModal();

}

});

/* ===========================
   ESC KEY SUPPORT
=========================== */

document.addEventListener("keydown",(event)=>{

if(event.key === "Escape"){

closeTransactionModal();

}

});

/* ===========================
   INITIAL LOAD
=========================== */

updateDashboard();

console.log(
"✅ Expense Tracker Pro Loaded Successfully"
);
