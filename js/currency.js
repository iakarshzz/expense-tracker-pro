const currencies = {
    INR: {
        name: "Indian Rupee",
        symbol: "₹"
    },

    USD: {
        name: "US Dollar",
        symbol: "$"
    },

    EUR: {
        name: "Euro",
        symbol: "€"
    },

    GBP: {
        name: "British Pound",
        symbol: "£"
    }
};


// Default Currency
let currentCurrency = "INR";


function getCurrencySymbol() {
    return currencies[currentCurrency].symbol;
}
