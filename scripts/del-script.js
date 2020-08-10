//delete script

function deleteIt(noteId) {
    if(noteId !== '') {
        let notes = localStorage.getItem("notes");
        if(notes !== null && notes !== '[]') {
            notes = JSON.parse(notes);
            notes.forEach((item, index) => {
                if(item.noteId === Number(noteId)) {
                    notes.splice(index,1);
                    event.target.parentNode.parentNode.remove();
                }
            });
            if(notes.length == 0){
                let error = document.createElement('p');
                error.classList.add("no-notes");
                error.innerText = "No notes created yet!";
                document.getElementById('notes-area').appendChild(error);
            }
            localStorage.setItem('notes', JSON.stringify(notes));
        }
    }
}
