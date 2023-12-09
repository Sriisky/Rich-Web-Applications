import React, { useEffect, useState } from 'react';
import './App.css';
import Axios from "axios"; // to make api requests
import DatePicker from "react-datepicker"; //calender integration
import "react-datepicker/dist/react-datepicker.css";

function App() {
  const [notes, setNotes] = useState([]);
  const [noteText, setNoteText] = useState('');
  const [noteColor, setNoteColor] = useState('Yellow');
  const [noteDate, setNoteDate] = useState(new Date());
  const [catFact, setCatFact] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterColor, setFilterColor] = useState('');
  const [filterDate, setFilterDate] = useState(null);

  // CAT FACT API FETCH
  const fetchCatFact = () => {
    Axios.get("https://catfact.ninja/fact").then((res) => {
      setCatFact(res.data.fact);
    });
  };

  useEffect(() => {
    fetchCatFact();
  }, []);

  const addNote = () => {
    if (!noteText) return; //dont allow user to add empty notes
    setNotes([...notes, { text: noteText, color: noteColor, date: noteDate }]);
    setNoteText('');
    setNoteDate(new Date());
  };

  // edit a notes content or date
  const editNote = (index) => {
    const newNotes = [...notes];
    const editedText = prompt('Edit your note:', newNotes[index].text);
    if (editedText !== null) {
      newNotes[index].text = editedText;
      const editedDate = new Date(prompt('Edit the date:', newNotes[index].date));
      newNotes[index].date = isNaN(editedDate) ? newNotes[index].date : editedDate;
      setNotes(newNotes);
    }
  };

  // delete a note
  const deleteNote = (index) => {
    const newNotes = notes.filter((_, i) => i !== index);
    setNotes(newNotes);
  };

  // filter notes based on search term, color, and date
  const filteredNotes = notes.filter(note => {
    const noteDate = new Date(note.date).setHours(0, 0, 0, 0);
    const selectedFilterDate = filterDate ? filterDate.setHours(0, 0, 0, 0) : null;
    return note.text.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (!filterColor || note.color === filterColor) &&
      (!selectedFilterDate || noteDate === selectedFilterDate);
  });

  return (
    <div className="container"> 
      <h1>Welcome to Your Favourite Note Taking App</h1>

      {/* for each note, put in text, select a colour */}
      <div className="note-form">
        <input 
          type="text"
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          placeholder="Enter your note"
        />

        <button onClick={addNote}>Create Note</button>

        <select
          value={noteColor}
          onChange={(e) => setNoteColor(e.target.value)}>
          <option value="Yellow">Yellow</option>
          <option value="Orange">Orange</option>
          <option value="Lime">Lime</option>
          <option value="Pink">Pink</option>
        </select>
      </div>

      {/* filter by colours or by date or both */}
      <div className="filter-section">
        <button onClick={() => setFilterColor('Yellow')}>Yellow Notes</button>
        <button onClick={() => setFilterColor('Orange')}>Orange Notes</button>
        <button onClick={() => setFilterColor('Lime')}>Lime Notes</button>
        <button onClick={() => setFilterColor('Pink')}>Pink Notes</button>
        <button onClick={() => setFilterColor('')}>All Notes</button>

        <DatePicker
          selected={filterDate}
          onChange={(date) => setFilterDate(date)}
          isClearable
          placeholderText="Filter by date"/>
      </div>

      {/* search functionality to find notes containing common letters */}
      <div className="search-section">
        <input
          type="text"
          placeholder="Search notes..."
          onChange={(e) => setSearchTerm(e.target.value)}/>
      </div>

      {/* note container */}
      <div className="notes">
      {filteredNotes.map((note, index) => (
          <div key={index} className="note" style={{ backgroundColor: note.color }}>
            <p>{note.text}</p>
            <p>Date: {note.date.toLocaleDateString()}</p>
            <div className="note-actions">
              <button onClick={() => editNote(index)}>Edit</button>
              <button onClick={() => deleteNote(index)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    
      {/* display the cat fact */}
      <div className='catFactSection'>
        <button onClick={fetchCatFact}>Click to get a new cat fact</button>
        <p>{catFact}</p>
      </div>
    </div>
  );
}

export default App;
