"use strict";
const qs = selector => document.querySelector(selector);

const displayErrorMsgs = msgs => {
    // Look for an existing error message list
    const existingUl = document.querySelector("main ul.messages");
    if (existingUl) {
        existingUl.remove();
    }

    const ul = document.createElement("ul");
    ul.classList.add("messages");
    
    for (let msg of msgs) {
        const li = document.createElement("li");
        const text = document.createTextNode(msg);
        li.appendChild(text);
        ul.appendChild(li);
    }

    // Insert error messages specifically inside the main element, before the form
    const form = qs("main form");
    form.parentNode.insertBefore(ul, form);
};

document.addEventListener("DOMContentLoaded", () => {
    const form = qs("form");

    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent default form submission
        processEntries(); // Run validation and submit the form manually if valid
    });

    qs("#reset_form").addEventListener("click", resetForm);
    qs("#full_name").focus();
});

const processEntries = () => {
    const fullName = qs("#full_name");
    const email = qs("#email_address");
    const address = qs("#address");
    const branch = qs("#branch");
    const terms = qs("#terms");
    const msgs = [];

    // validates  name
    if (fullName.value.trim() == "") {
        msgs.push("Please enter your name.");
    }

    // validates email
    if (email.value.trim() == "") {
        msgs.push("Please enter an email address.");
    } else if (!email.value.match(/^[\w\.-]+@[\w\.-]+\.\w+$/)) {
        msgs.push("Please enter a valid email address.");
    }

    // validates address
    if (address.value.trim() == "") {
        msgs.push("Please enter your address.");
    }

    // validates location selection
    if (branch.value == "") {
        msgs.push("Please select a location.");
    }

    // validates terms acceptance
    if (!terms.checked) {
        msgs.push("You must agree to the terms.");
    }

    if (msgs.length == 0) {  // no error messages
        qs("form").submit(); // will submit form; all info is present and correct
    } else {
        displayErrorMsgs(msgs); //if errors exist (thus msgs.length ≠ 0, will dispaly the errors)
        return; // prevent form submission
    }
};
const resetForm = () => {
    // only reset the form itself (not whole page)
    qs("form").reset();
    
    // only remove error messages if they exist
    const errorMessages = document.querySelector("main ul.messages");
    if (errorMessages) {
        errorMessages.remove();
    }};

document.addEventListener("DOMContentLoaded", () => {
    qs("#register").addEventListener("click", processEntries);
    qs("#reset_form").addEventListener("click", resetForm);
    qs("#full_name").focus();
});
