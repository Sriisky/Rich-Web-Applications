// wait for dom to load before running the script
document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById("add-button");
    const {fromEvent } = rxjs; 
    const clickCreate = fromEvent(addButton, 'click'); // observable to emit click events on add note button
    clickCreate.subscribe(() => addNote()); // subscribe to the observable to handle clicks

    // Array to store notes
    const notes = [];

    function addNote() {
        const noteInput = document.getElementById("note-input");
        const colourSelect = document.getElementById("colour-select");
        const noteText = noteInput.value;
        const noteColour = colourSelect.value;

        const note = { text: noteText, color: noteColour };
        notes.push(note);
        renderNotes();
        noteInput.value = "";
    }


function editNote(index) {
    const editedText = prompt("Edit your note:", notes[index].text);
    if (editedText !== null) {
        notes[index].text = editedText;
        renderNotes();
    }
}

function deleteNote(index) {
    notes.splice(index, 1);
    renderNotes();
}

function renderNotes() {
    const notesContainer = document.getElementById("notes-container");
    notesContainer.innerHTML = "";
    
    notes.forEach((note, index) => {
        const noteDiv = document.createElement("div");
        noteDiv.className = "note";
        noteDiv.style.backgroundColor = note.color;

        const noteTextP = document.createElement("p");
        noteTextP.textContent = note.text;

        const noteActions = document.createElement("div");
        noteActions.className = "note-actions";

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";

        noteActions.appendChild(editButton);
        noteActions.appendChild(deleteButton);
        
        noteDiv.appendChild(noteTextP);
        noteDiv.appendChild(noteActions);

        notesContainer.appendChild(noteDiv);

        // create observable for edit button clicks and subscribe
        fromEvent(editButton, 'click').subscribe(() => editNote(index));
        // create observable for delete button clicks and subscribe
        fromEvent(deleteButton, 'click').subscribe(() => deleteNote(index));
    });
}

// Call the renderNotes function initially to render any existing notes
renderNotes();
});