//all dom elements to interect with users

let completeHtml = () => {
    //container
    let container = document.createElement('div');
    container.classList.add('container');

    //heading part
    let header = document.createElement('header');
    header.classList.add('header-part');

    //brand name 
    let brandName = document.createElement('a');
    brandName.href = 'index.html';
    brandName.innerText = "Life Notes";
    brandName.classList.add('brand');

    //nav items
    let navItemParent = document.createElement('ul');
    navItemParent.classList.add('nav-parent');
    let navTexts = ["Home","Fav Notes", "Chat"];

    for( let i=0; i<navTexts.length ; i++ ) {
        let li = document.createElement('li');
        li.classList.add('nav-item');
        let a = document.createElement('a');
        a.classList.add('nav-link');
        if(navTexts[i].toLowerCase()=='chat'){
            a.href = "../chat.html";
        }else{
            a.href = "javascipt:;";
        }
        a.setAttribute('data-rule',navTexts[i].toLowerCase());
        a.innerText = navTexts[i];
        navItemParent.appendChild(li).appendChild(a);
    }
    header.appendChild(brandName);
    header.appendChild(navItemParent);

    //formContainer
    let formContainer = document.createElement('div');
    formContainer.classList.add('form-container');

    //form element
    let formElement = document.createElement('form');
    formElement.id = "noteFormHandler";
    formElement.classList.add('form-itself');

    //form heading element
    let formHeading = document.createElement('h3');
    formHeading.classList.add('form-title');
    formHeading.innerText = "Write your life notes...";

    //input element
    let formInput = document.createElement('textarea');
    formInput.classList.add('text-input');
    formInput.id = 'noteText';
    formInput.rows = 5;

    //add button
    let addBtn = document.createElement('button');
    addBtn.classList.add('add-btn');
    addBtn.id = 'add-note';
    addBtn.innerText = "Add Note";
    addBtn.type = "button";

    //consturct form
    formElement.appendChild(formHeading);
    formElement.appendChild(formInput);
    formElement.appendChild(addBtn);

    //listbox
    let notesBox = document.createElement('div');
    notesBox.classList.add('note-list');
    notesBox.id = "notes-area";
    let noteBoxTitle = document.createElement('h3');
    noteBoxTitle.classList.add('notebox-title');
    noteBoxTitle.innerText = 'Your Notes';
    notesBox.appendChild(noteBoxTitle);

    //search bar
    let searchItem = document.createElement('input');
    searchItem.classList.add('search-list');
    searchItem.id = "search-list";
    searchItem.setAttribute('placeholder',"Search your notes...");

    //note listing box
    let noteListingBox = document.createElement('div');
    noteListingBox.classList.add("note-listing");
    noteListingBox.id = "note-listing";

    //combine
    notesBox.appendChild(searchItem);
    notesBox.appendChild(noteListingBox);

    //getting notes from localstorage
    
    let notes = localStorage.getItem("notes");
    if(notes !== null && notes !== '[]'){
        notes = JSON.parse(notes);
        notes.reverse();
        let arr = Array.from(notes);
        console.log(arr);
        Array.from(notes).forEach((item) => {
            //note box single
            let noteBoxSingle = document.createElement('div');
            noteBoxSingle.classList.add('note-single');
            let timestamp = document.createElement('span');
            timestamp.classList.add('timestamp');
            timestamp.innerText = item.timestamp;
            let noteTextWritten = document.createElement('p');
            noteTextWritten.classList.add('note-text-single');
            noteTextWritten.innerText = item.noteText;
            let removeBtn = document.createElement('button');
            removeBtn.classList.add('remove-btn');
            removeBtn.setAttribute('onclick', "deleteIt("+item.noteId+")");
            removeBtn.innerHTML = "<i class='fas fa-trash'></i>";
            removeBtn.type = "button";

            noteBoxSingle.appendChild(timestamp);
            noteBoxSingle.appendChild(noteTextWritten);
            noteBoxSingle.appendChild(removeBtn);
            noteListingBox.appendChild(noteBoxSingle);
        });
    }else{
        //note box single
        let error = document.createElement('p');
        error.classList.add("no-notes");
        error.innerText = "No notes created yet!";
        notesBox.appendChild(error);
    }
    
    //construct html document
    container.appendChild(header);
    container.appendChild(formContainer)
    .appendChild(formElement);
    container.appendChild(notesBox);

    return container;
}

const html = completeHtml;

export {html};
