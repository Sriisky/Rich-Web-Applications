const {Observable, fromEvent } = rxjs; 

// class to template every note
class Note {
        constructor() {
            this.parentNote = null;
            this.childNotes = [];
            this.domElement = null; 
        }
    
    addNote() {
        const noteText = document.getElementById('note-input').value;
        const noteColour = document.getElementById('colour-select').value;
    
        const note = document.createElement('div'); // new div element for every note
        note.className = 'note';
        note.style.backgroundColor = noteColour;
        this.domElement = note; // store the element in an instance
    
        const body = document.createElement('p');
        body.textContent = noteText;
        this.domElement.appendChild(body);

        // create observable stream for click events
        const childNote = document.createElement('button');
        childNote.textContent = 'Add Child Note';
        const click_related = fromEvent(childNote, 'click');
        click_related.subscribe(() => this.addChildNote(this)); // subscribe to adding notes
            
        // create observable stream for edit button
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        const click_edit = fromEvent(editButton, 'click');
        click_edit.subscribe(() => this.editNote(body)); // subscribe to handle edits
    
        // create observable stream for delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        const click_delete = fromEvent(deleteButton, 'click');
        click_delete.subscribe(() => this.deleteAll()); // subscribe to handle deletes

        // add these elements to the note
        note.appendChild(body);
        note.appendChild(deleteButton);
        note.appendChild(editButton);
        note.appendChild(childNote);
            
    
        const notesContainer = document.getElementById('notes-container');
        notesContainer.appendChild(note); // add the note to the notes-container in the DOM

        // clearn input field for the next note
        document.getElementById('note-input').value = '';
    
    }

    // add note as a child
    addChildNote(parentNote) {
        const newChildNote = new Note(); // create new instance
        newChildNote.parentNote = parentNote; // set its parent
        parentNote.childNotes.push(newChildNote); // add it to the parents children array
        newChildNote.addNote(); // create and append the note
    }

    // edit text of the note
    editNote(bodyElement) {
        const newBody = prompt('Add new note: ', bodyElement.textContent);
        if (newBody !== null){
            bodyElement.textContent = newBody; // update paragraph element with the text the user entered
        }
    }

    // method to delete a note and its children
    deleteAll() {
        const notesContainer = document.getElementById('notes-container');
        notesContainer.removeChild(this.domElement);

        for (const childNote of this.childNotes) {
            childNote.deleteAll();
        }
        // Remove this note after all children have been removed
        if (this.domElement && this.domElement.parentNode) {
            this.domElement.parentNode.removeChild(this.domElement);
        }
    }
}

// load the dom then set up the app
    document.addEventListener('DOMContentLoaded', () => {
        const addButton = document.getElementById("add-button");
        const notesInstance = new Note();
        const clickCreate = fromEvent(addButton, 'click'); // observable to emit click events on add note button
        clickCreate.subscribe(() => notesInstance.addNote()); // subscribe to the observable to handle clicks
});
