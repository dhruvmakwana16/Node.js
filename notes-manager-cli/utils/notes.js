const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../notes.json");

// Read Notes
const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync(filePath);
    const dataJSON = dataBuffer.toString();

    return JSON.parse(dataJSON);
  } catch (error) {
    return [];
  }
};

// Save Notes
const saveNotes = (notes) => {
  fs.writeFileSync(filePath, JSON.stringify(notes, null, 2));
};

// Add Note
const addNote = (title, content) => {
  const notes = loadNotes();

  const duplicate = notes.find(
    (note) => note.title.toLowerCase() === title.toLowerCase()
  );

  if (duplicate) {
    console.log("❌ Note title already exists!");
    return;
  }

  notes.push({
    title,
    content,
  });

  saveNotes(notes);

  console.log("✅ Note Added Successfully");
};

// View Notes
const listNotes = () => {
  const notes = loadNotes();

  if (notes.length === 0) {
    console.log("⚠️ No Notes Found");
    return;
  }

  console.log("\n📒 Notes List\n");

  notes.forEach((note, index) => {
    console.log(`${index + 1}. ${note.title}`);
    console.log(`   ${note.content}\n`);
  });
};

// Delete Note
const deleteNote = (title) => {
  const notes = loadNotes();

  const filteredNotes = notes.filter(
    (note) => note.title.toLowerCase() !== title.toLowerCase()
  );

  if (notes.length === filteredNotes.length) {
    console.log("❌ Note Not Found");
    return;
  }

  saveNotes(filteredNotes);

  console.log("🗑️ Note Deleted Successfully");
};

module.exports = {
  addNote,
  listNotes,
  deleteNote,
};