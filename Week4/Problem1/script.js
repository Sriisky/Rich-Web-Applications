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
        const Contname = nameInput.value.trim(); //trim = remove whitespace characters from the start and end of a string, an input field containing only whitespace characters would not be considered empty
        const Contmobile = mobileInput.value.trim(); 
        const Contemail = emailInput.value.trim();

        //Error checking
        //If name or mobile or email are missing display the error message below
        if (!Contname || !Contmobile || !Contemail) {
            errorDiv.textContent = "All fields are required";
            errorDiv.style.display = "block"; //block =  takes up the full width of its container and starts on a new line
            return;
        }

        //If anything other than letters OR if the text entered is = to or more than 21
        //starts with beginning of input, contains only chars that are uppercase/ lowercase/ spaces, between 1 and 20 chars, ends with end of input
        if (!/^[A-Za-z\s]{1,20}$/.test(Contname)) {
            errorDiv.textContent = "Name must only contain letters and spaces and be less than 21 characters long";
            errorDiv.style.display = "block";
        return;
        }

        //If number is not equal to 10 chars
        //d is char that represents any digit between 0-9
        if (!/^\d{10}$/.test(Contmobile)) {
            errorDiv.textContent = "Mobile number must contain 10 characters";
            errorDiv.style.display = "block";
        return;
        }

        //If email doesnt contain @ or .com or over 40 chars
        //.+ means matches following char, \. means matches a dot
        if (!/^.+@.+\..+$/.test(Contemail) || Contemail.length > 40) {
            errorDiv.textContent = "Email must contain '@' and '.com' and be less than 40 characters";
            errorDiv.style.display = "block";
        return;
        }

        errorDiv.style.display = "none"; //hidden from view if there is no errors

        const contact = { Contname, Contmobile, Contemail }; //add values to contact
        contacts.push(contact); //put the new contact into the contacts array
        updateTable(); //add to the table
        clearInputs(); // clear the input fields
    });


    // Add new contacts to the table
    function updateTable(filteredContacts) { //filteredcontacts is an optional parameter
        const tbody = contactTable.querySelector("tbody"); //selects tbody element from contactTable
        tbody.innerHTML = ""; //clears a row

        const contactsToDisplay = filteredContacts || contacts; //if filteredcontacts was passed then use that, otherwise use contacts array

        contactsToDisplay.forEach((contact, index) => { //iterate through the array
            const row = document.createElement("tr"); //create new row
            row.innerHTML = `<td>${contact.Contname}</td><td>${contact.Contmobile}</td><td>${contact.Contemail}</td>`; //add 3 cells to new row
            tbody.appendChild(row); //new row is appended to the tbody
        });
    }

    //Once you submit details, clear the input boxes
    function clearInputs() {
        nameInput.value = "";
        mobileInput.value = "";
        emailInput.value = "";
    }

    //Search feature
    searchInput.addEventListener("input", function() {
        const searchTerm = searchInput.value.trim();
        const filteredContacts = contacts.filter(contact => contact.Contmobile.includes(searchTerm)); // only show contacts that contain the numbers specified
        updateTable(filteredContacts); // call update table function so it only displays requested number
    });


    //Sort results by name in ascending and descending when Name is clicked on
    //contacts array is sorted based on the Contname property
    sortName.addEventListener("click", function() {
        contacts.sort((a, b) => {
            //If the sortName button has the dataset.sort attribute set to "asc", display asc otherwise desc
            //If the sorting order is set to ascending ("asc"), the localeCompare method is used to compare the Contname property of contact 'a' with the Contname property of contact 'b'
            if (sortName.dataset.sort === "asc") {
                return a.Contname.localeCompare(b.Contname);
            } else {
                return b.Contname.localeCompare(a.Contname);
            }
        });
        //checks if current val of data sort is asc
        sortName.dataset.sort = sortName.dataset.sort === "asc" ? "desc" : "asc"; //toggles between asc and desc depending on what was last clicked
        updateTable();
    });

});