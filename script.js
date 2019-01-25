var notes = [];

backup();

function create_note(note, date, time) {
    var note = {
        note: note,
        date: date,
        time: time
    }
    return note;
}

function backup() {

    var notes_backup = JSON.parse(localStorage.getItem('notesBackup'));

    if (notes_backup != null) {
        notes = notes_backup;
    }

    for (var i = 0; i < notes.length; i++) {
        noteTemplate(notes[i].note, notes[i].date, notes[i].time)
    }
}



function add_note() {
    var note = document.forms["addNoteForm"]["textareaField"].value;
    var date = document.forms["addNoteForm"]["date_input"].value;
    var time = document.forms["addNoteForm"]["time_input"].value;

    if (note == "") {
        document.getElementById('error_message').innerHTML = "Please, fill the note!"
    }

    else {

        if (date == "") {
            document.getElementById('error_message').innerHTML = "Please, fill the date!"
        }

        else {
            document.getElementById('error_message').innerHTML = "";
            notes.push(create_note(note, date, time));
            localStorage.setItem('notesBackup', JSON.stringify(notes));
            noteTemplate(note, date, time)
        }

    }

}

function noteTemplate(note, date, time) {


    var notesContainer = document.getElementById('notesContainer');
    var div = document.createElement('div');
    var button = document.createElement('button');
    button.onclick = removeNote;
    button.className = "w3-large w3-spin fa fa-close";
    div.className = "note_bg";
    div.innerHTML = "<div class='note_text'>" + note + "</div>" + "<div class='date_text'>" + date + "</div>" + "<div class='time_text'>" + time + "</div>";

    notesContainer.append(div);
    div.append(button);

}

function clear_note() {
    document.forms["addNoteForm"]["textareaField"].value = "";
    document.forms["addNoteForm"]["date_input"].value = "";
    document.forms["addNoteForm"]["time_input"].value = "";
    document.getElementById('error_message').innerHTML = "";
}

function clear_all() {
    var warning = confirm("Do you really want to delete all the notes ?");

    if (warning == true) {
        clear_note();
        document.getElementById('notesContainer').innerHTML = "";
        notes = [];
        localStorage.setItem('notesBackup', JSON.stringify(notes));
    }

}

function ifNoteExist(note,date,time) { 

    for (var i=0; i < notes.length; i++) {

        if(note == notes[i].note && date == notes[i].date) {

            if(time == "" || time == notes[i].time){
               return notes[i];
            }

        }

    }

}


function removeNote() {
   
    
    this.parentElement.parentElement.removeChild(this.parentElement);

    var note = this.parentElement.children[0].innerHTML;
    var date = this.parentElement.children[1].innerHTML;
    var time = this.parentElement.children[2].innerHTML;
    var index_note = notes.indexOf(ifNoteExist(note,date,time));

    notes.splice(index_note,1);
    localStorage.setItem('notesBackup', JSON.stringify(notes));
}


