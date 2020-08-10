//delete script

function deleteIt(noteId) {
    if(noteId !== '') {
        let notes = localStorage.getItem("notes");
        if(notes !== null && notes !== '[]') {
            notes = JSON.parse(notes);
            notes.forEach((item, index) => {
                if(item.noteId === Number(noteId)) {
                    notes.splice(index);
                    event.target.parentNode.parentNode.remove();
                }
            });
            if(notes.length == 0){location.reload()}
            localStorage.setItem('notes', JSON.stringify(notes));
        }
    }
}
