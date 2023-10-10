document.addEventListener("DOMContentLoaded", function() {
    const nameInput = document.getElementById("Contname");
    const mobileInput = document.getElementById("Contmobile");
    const emailInput = document.getElementById("Contemail");
    const addContact = document.getElementById("addContact");
    const contactTable = document.getElementById("contactTable");
    const errorDiv = document.getElementById("error");
    const sortName = document.getElementById("sortName");
    const searchInput = document.getElementById("searchInput");

    //Array to hold all the contact information
    let contacts = [];

    //Add contact information to the table if the error checking is all clear
    addContact.addEventListener("click", function() {
        const Contname = nameInput.value.trim();
        const Contmobile = mobileInput.value.trim();
        const Contemail = emailInput.value.trim();

        //Error checking
        //If name or mobile or email are missing display the error message below
        if (!Contname || !Contmobile || !Contemail) {
            errorDiv.textContent = "All fields are required";
            errorDiv.style.display = "block";
            return;
        }

        //If anything other than letters OR if the text entered is = to or more than 21
        if (!/^[A-Za-z\s]{1,20}$/.test(Contname)) {
            errorDiv.textContent = "Name must only contain letters and spaces and be less than 21 characters long";
            errorDiv.style.display = "block";
        return;
        }

        //If number is not equal to 10 chars
        if (!/^\d{10}$/.test(Contmobile)) {
            errorDiv.textContent = "Mobile number must contain 10 characters";
            errorDiv.style.display = "block";
        return;
        }

        //If email doesnt contain @ or .com
        if (!/^.+@.+\..+$/.test(Contemail) || Contemail.length > 40) {
            errorDiv.textContent = "Email must contain '@' and '.com' and be less than 40 characters";
            errorDiv.style.display = "block";
        return;
        }

        errorDiv.style.display = "none";

        const contact = { Contname, Contmobile, Contemail };
        contacts.push(contact);
        updateTable();
        clearInputs();
    });


    function updateTable(filteredContacts) {
        const tbody = contactTable.querySelector("tbody");
        tbody.innerHTML = "";

        const contactsToDisplay = filteredContacts || contacts;

        contactsToDisplay.forEach((contact, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `<td>${contact.Contname}</td><td>${contact.Contmobile}</td><td>${contact.Contemail}</td>`;
            tbody.appendChild(row);
        });
    }

    //Once you submit details, clear the input boxes
    function clearInputs() {
        nameInput.value = "";
        mobileInput.value = "";
        emailInput.value = "";
    }

    searchInput.addEventListener("input", function() {
        const searchTerm = searchInput.value.trim();
        const filteredContacts = contacts.filter(contact => contact.Contmobile.includes(searchTerm));
        updateTable(filteredContacts);
        if (filteredContacts.length === 0) {
            noResultDiv.style.display = "block";
        } else {
            noResultDiv.style.display = "none";
        }
    });


    //Sort results by name in ascending and descending when Name is clicked on
    sortName.addEventListener("click", function() {
        contacts.sort((a, b) => {
            if (sortName.dataset.sort === "asc") {
                return a.Contname.localeCompare(b.Contname);
            } else {
                return b.Contname.localeCompare(a.Contname);
            }
        });
        sortName.dataset.sort = sortName.dataset.sort === "asc" ? "desc" : "asc";
        updateTable();
    });

});