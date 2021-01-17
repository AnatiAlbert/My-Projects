const notesEl = document.querySelector('#notes');

function render(){
    notesEl.innerHTML = notes.map(Note).join("");
}

function Note(note){
    const {title, text} = note

    return `
        <div class='Note'>
            <div class='Note-Title'>
                ${title}
            </div>
            <div class='Note-Text'>
                ${text}
            </div>
        </div>
    `;
}

let notes = [];

function render() { /**/ };

fetch("src/notes.json")
    .then(response => response.json())
    .then(_notes => (notes = _notes))
    .then(render)
    .catch(e => console.error(e));

function render(){
    const filter = filterEl.value.trim();

    const filteredNotes = notes.filter(note => {
        if(!filter) return true;

        return note.title.includes(filter) || note.text.includes(filter)
    });

    notesEl.innerHTML = filteredNotes.map(Note).join("");
}