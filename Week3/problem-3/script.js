// Array to store notes
const notes = [];

function addNote() {
    // Get references to input and select elements
    const noteInput = document.getElementById("note-input");
    const colourSelect = document.getElementById("colour-select");

    // Get the text and colour chosen by the user
    const noteText = noteInput.value;
    const noteColour = colourSelect.value;

    // Create a note object and add it to the notes array
    const note = {
        text: noteText,
        color: noteColour,
    };

    notes.push(note); // Add the new note to the array
    renderNotes(); // Rerender the displayed notes

    noteInput.value = ""; // Clear the input field
}

function editNote(index) {
    const editedText = prompt("Edit your note:", notes[index].text); // Opens dialogue box
    // If user provides new text it will update the noteText of the note in the notes array
    if (editedText !== null) {
        notes[index].text = editedText;
        renderNotes(); // Rerender the displayed notes to show the new updated version
    }
}

function deleteNote(index) {
    notes.splice(index, 1); // Removes the note at the specified index from the array
    renderNotes(); // Rerender the displayed notes
}

// Called everytime we want to refresh what is being displayed
function renderNotes() {
    const notesContainer = document.getElementById("notes-container");
    notesContainer.innerHTML = ""; // Clear the notes container

    // Loop through the notes array and create HTML elements to display the notes
    for (let i = 0; i < notes.length; i++) {
        const note = notes[i];
        const noteDiv = document.createElement("div");
        noteDiv.className = "note";
        noteDiv.style.backgroundColor = note.color; //Set background colour

        // Create a paragraph element to display the note text
        const noteText = document.createElement("p");
        noteText.textContent = note.text;

        // Create a div for edit and delete buttons
        const noteActions = document.createElement("div");
        noteActions.className = "note-actions";

        // Create an edit button
        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.addEventListener("click", () => editNote(i));

        // Create an delete button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => deleteNote(i));

        // Append elements to the noteDiv
        noteActions.appendChild(editButton);
        noteActions.appendChild(deleteButton);
        
        noteDiv.appendChild(noteText);
        noteDiv.appendChild(noteActions);

        // Append the noteDiv to the notes container
        notesContainer.appendChild(noteDiv);
    }
}