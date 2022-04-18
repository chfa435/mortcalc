//GET

//get the loan values from the page
function getValues() {
    //Step 1 get the values from the page
    let lamount = Number(document.getElementById("lamount").value);

    let lterm = parseInt(document.getElementById("lterm").value);

    let lrate = parseFloat(document.getElementById("lrate").value);

    //check for Nan
    if (isNaN(lamount)) {
        alert("Enter a valid amount. Must be a number.");
        document.getElementById("lamount").focus;
    } else if (isNaN(lterm)) {
        alert("Enter a valid payment amount. Enter the number of monthly payment for the loan.");
        document.getElementById("lterm").focus;
    } else if (isNaN(lrate)) {
        alert("Enter a valid loan rate. Must be a number.");
        document.getElementById("lrate").focus;
    } else {
        //convert the annual rate to monthly rate
        let mrate = calcRate(lrate);

        //calculate the monthly payment
        let lpayment = calcPayment(lamount, mrate, lterm);


        //build our schedule
        let payments = buildSchedule(lamount, mrate, lterm, lpayment);

        //call display data
        displayData(payments, lamount, lpayment);
    }
}

//BUSINESS LOGIC
//builds an amoritization schedule
function buildSchedule(amount, rate, term, payment) {

    let payments = [];

    let balance = amount;
    let totalInterest = 0;
    let monthlyInterest = 0;
    let monthlyPrincipal = 0;
    let monthlyTotalInterest = 0;


    for (let month = 1; month <= term; month++) {

        monthlyInterest = calcInterest(balance, rate);
        totalInterest += monthlyInterest;
        monthlyPrincipal = payment - monthlyInterest;
        balance = balance - monthlyPrincipal;


        let curPayment = {
            month: month,
            payment: payment,
            principal: monthlyPrincipal,
            interest: monthlyInterest,
            totalInterest: totalInterest,
            balance: balance
        }

        payments.push(curPayment);
    }

    //return an array of payment objects
    return payments;
}

//display table

//DISPLAY
//display the table of payments
//add the summary info at the top of the page
function displayData(payments, lamount, payment) {

    let tableBody = document.getElementById("scheduleBody");
    let template = document.getElementById("scheduleTemplate");

    //clear the table of the previous values
    tableBody.innerHTML = "";

    for (let index = 0; index < payments.length; index++) {

        //clone the template
        let paymentRow = document.importNode(template.content, true);
        //get an array of columns
        let paymentCols = paymentRow.querySelectorAll("td");

        paymentCols[0].textContent = payments[index].month;
        paymentCols[1].textContent = payments[index].payment.toFixed(2);
        paymentCols[2].textContent = payments[index].principal.toFixed(2);
        paymentCols[3].textContent = payments[index].interest.toFixed(2);
        paymentCols[4].textContent = payments[index].totalInterest.toFixed(2);
        paymentCols[5].textContent = payments[index].balance.toFixed(2);

        //write the payment to the page
        tableBody.appendChild(paymentRow);

    }
    document.getElementById("payment").innerHTML = Number(payment).toLocaleString("en-us", {
        style: "currency",
        currency: "USD"
    });

    document.getElementById("totalPrincipal").innerHTML = Number(lamount).toLocaleString("en-us", {
        style: "currency",
        currency: "USD"
    });

    let totalInterest = payments[payments.length - 1].totalInterest;

    document.getElementById("totalInterest").innerHTML = Number(totalInterest).toLocaleString("en-us", {
        style: "currency",
        currency: "USD"
    });

    let totalCost = totalInterest + lamount;

    document.getElementById("totalCost").innerHTML = Number(totalCost).toLocaleString("en-us", {
        style: "currency",
        currency: "USD"
    });

}

//helper functions
function calcPayment(amount, rate, term) {
    let payment = 0;

    payment = (amount * rate) / (1 - Math.pow(1 + rate, -term));

    return payment;
}

//monthly rate for the loan
function calcRate(rate) {
    return rate = rate / 1200
}

//current balance and monthly rate
function calcInterest(balance, rate) {
    return balance * rate;
}