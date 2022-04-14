 //Step ONE (GET = controller, accepts a request)
 function getMessage() {
     let msg = document.getElementById("txtMessage").value;

     //validate if the msg is not equal to empty string
     if (msg != '') {

        msg = msg.toUpperCase();

        let revMessage = reverseMessageB(msg);
        displayMessage(revMessage);

     } else {
         alert("You must enter a string");
    }



 }

 //business logic - switch

 function reverseMessageA(msg) {
     let revMessage = "";

     //decrimenting loop
     for (let index = msg.length - 1; index >= 0; index--) {
         let char = msg[index];
         revMessage += char;

     }

     return revMessage
 }

 function reverseMessageB(msg){
    let revMessage = "";
    revMsgArray = msg.split("");
    revMessage = revMsgArray.reverse().join("");

     return revMessage
 }

 //Final Step (DISPLAY = view)
 function displayMessage(message) {

     //first get the ol element from the page
     element = document.getElementById("results");
     element.innerHTML = message;
 }