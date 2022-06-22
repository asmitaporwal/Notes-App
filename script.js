let addBtn = document.getElementById("add-btn");
let addTitle = document.getElementById("note-title");
let addText = document.getElementById("note-text");

addBtn.addEventListener("click", (e) => {
    if (addTitle.value == "" || addText.value == "") {
        return alert("please add note title and details");
    }

    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);

    }

    let myObj = {
        title: addTitle.value,
        text: addText.value
    }
    notesObj.push(myObj);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTitle.value = "";
    addText.value = "";

    showNotes();
});

//SHOW NOTES ON THE LOCAL STORAGE
function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);

    }

    //DISPLAY
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `<div class="noteCard card my-2 me-4" style="width:25rem;">
                    <div class="card-body">
                        <h5>
                            <span class=" text-wrap badge bg-dark">
                                Note ${index + 1}
                            </span>
                        </h5>
                        <h3 class="note-title card-title">${element.title}</h3>
                        <p class="note-text card-text">${element.text}</p>
                        <button id="${index}"  onclick="deleteNote(this.id)" class="note-btn btn btn-danger me-2"><i class="fas fa-trash-alt me-2"></i>Delete Note</button>
                        <button  id="${index}"  onclick="editNote(this.id)" class="note-btn edit-btn btn btn-primary"><i class="far fa-edit me-2"></i>Edit Note</button>
                    </div>
                </div> `
    });

    let noteElm = document.getElementById("notes");
    if (notesObj.length != 0) {
        noteElm.innerHTML = html;
    } else {
        noteElm.innerHTML = "No Notes Yet! Add a note using the form above";
    }
}

//FUNCTION TO DELETE THE NOTES
function deleteNote(index) {
    let confirmDel = confirm("You are deleting this note");

    if (confirmDel == true) {
        let notes = localStorage.getItem("notes");
        if (notes == null) {
            notesObj = [];
        } else {
            notesObj = JSON.parse(notes);

        }
        notesObj.splice(index, 1);
        localStorage.setItem("notes", JSON.stringify(notesObj));
        showNotes();
    }
}

//FUNCTION TO EDIT THE NOTE
function editNote(index) {
    let notes = localStorage.getItem("notes");
    if (addTitle.value !== "" || addText.value != "") {
        return alert("Please clear the form before Editting a Note");
    }
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);

    }
    notesObj.findIndex((element) => {
        addTitle.value = element.title;
        addText.value = element.text;
    })
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
}

// FUNCTION TO SEARCH NOTES
let search = document.getElementById('searchTxt');
search.addEventListener('input', function () {
    let inputVal = search.value.toLowerCase();
    // console.log("Input Value : ", inputVal);

    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByClassName('note-text')[0].innerText;
        if (cardTxt.includes(inputVal)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
        console.log(cardTxt);
    });
});

showNotes();