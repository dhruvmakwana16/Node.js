const {
  addNote,
  listNotes,
  deleteNote,
} = require("./utils/notes");

const command = process.argv[2];

switch (command) {
  case "add":
    const title = process.argv[3];
    const content = process.argv[4];

    if (!title || !content) {
      console.log(
        'Usage: node app.js add "Title" "Content"'
      );
      break;
    }

    addNote(title, content);
    break;

  case "list":
    listNotes();
    break;

  case "delete":
    const deleteTitle = process.argv[3];

    if (!deleteTitle) {
      console.log(
        'Usage: node app.js delete "Title"'
      );
      break;
    }

    deleteNote(deleteTitle);
    break;

  default:
    console.log(`
==========================
 Notes Manager CLI
==========================

Commands:

Add Note:
node app.js add "Title" "Content"

View Notes:
node app.js list

Delete Note:
node app.js delete "Title"
`);
}