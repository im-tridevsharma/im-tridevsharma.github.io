//pure js app to write our notes
import {html} from './html-elements.js';

const styleFile = './styles/style.css';
const fontawesome = 'https://kit.fontawesome.com/4a0859cac2.js';
const root = document.getElementsByTagName('body')[0];
const style = document.createElement('link');
style.href = styleFile;
style.rel = 'stylesheet';
const script = document.createElement('script');
script.src = fontawesome;
document.getElementsByTagName('head')[0].appendChild(style);
document.getElementsByTagName('head')[0].appendChild(script);
root.appendChild(html());

let addBtn = document.getElementById('add-note');

addBtn.onclick = (event) => {
    event.preventDefault();
    let noteFeild = document.getElementById('noteText');
    let noteText = noteFeild.value;
    if(
    noteText !== '' 
    && noteText !== undefined
    ) {
        let notes = localStorage.getItem("notes");
        let newNote = {
            noteId : new Date().getTime(),
            noteText : noteText,
            timestamp : new Date().toLocaleString() 
        }
        if(notes !== null && notes !== '[]') {
            notes = JSON.parse(notes);
            notes.push(newNote);
            pushNote(newNote);
        }else{
            notes = [];
            notes.push(newNote);
            pushNote(newNote);
            document.querySelector('.no-notes').style.display = 'none';
        }
        localStorage.setItem('notes', JSON.stringify(notes));
        noteFeild.value = "";
    }
}


function pushNote(note) {
    let noteBoxSingle = document.createElement('div');
    noteBoxSingle.classList.add('note-single');
    let timestamp = document.createElement('span');
    timestamp.classList.add('timestamp');
    timestamp.innerText = note.timestamp;
    let noteTextWritten = document.createElement('p');
    noteTextWritten.classList.add('note-text-single');
    noteTextWritten.innerText = note.noteText;
    let removeBtn = document.createElement('button');
    removeBtn.classList.add('remove-btn');
    removeBtn.setAttribute('onclick', "deleteIt("+note.noteId+")");
    removeBtn.innerHTML = "<i class='fas fa-trash'></i>";
    removeBtn.type = "button";

    noteBoxSingle.appendChild(timestamp);
    noteBoxSingle.appendChild(noteTextWritten);
    noteBoxSingle.appendChild(removeBtn);
    //pushing
    let container = document.getElementById('note-listing');
    container.prepend(noteBoxSingle);
}


let searchList = document.querySelector('#search-list');
searchList.addEventListener("keyup", () => {
    let textNode = document.getElementsByClassName('note-text-single');
    Array.from(textNode).forEach((item) => {
        let text = item.innerText.toLowerCase();
        let searchKey = searchList.value.toLowerCase();
        if(searchKey !== '' && searchKey !== ' '){
            if(text.includes(searchKey)){
                item.parentNode.style.display = 'block';
            }else{
                item.parentNode.style.display = 'none';
            }
        }else{
            item.parentNode.style.display = 'block';
        }
    });
});

let delScript = document.createElement("script");
delScript.setAttribute("src", "./scripts/del-script.js");
document.body.appendChild(delScript);
