
(function (){
    initializeCalendarCells();
    initializeFooter();

    function initializeFooter(){
        var showAllNotes = document.getElementById('showAllNotes');
        showAllNotes.onclick = function () {
            var container = document.getElementsByClassName('calendar')[0].getElementsByTagName('tbody')[0];
            var allNotes = container.getElementsByClassName('note');
            var showContentElements = container.getElementsByClassName('showNotes');

            for (var i = 0; i < allNotes.length; i++) {
                allNotes[i].classList.remove('hidden');
                allNotes[i].classList.add('showed');
            }
            for (var j = 0; j < showContentElements.length; j++) {
                showContentElements[j].parentNode.removeChild(showContentElements[j]);
            }
        }
    }
    function initializeCalendarCells(){
        var wrapper = document.getElementsByClassName('calendar')[0];
        var cells = wrapper.getElementsByTagName('tbody')[0].getElementsByTagName('td');

        for (var i = 0; i < cells.length; i++){
            cells[i].onclick = function  (){
                var rest = document.getElementsByClassName('clicked');
                for(var j = 0; j < rest.length; j++){
                    rest[j].classList.remove('clicked');
                }
                this.classList.add('clicked');

            };
            cells[i].ondblclick = function(){
                var editTb = document.createElement('input');
                editTb.type = 'text';
                editTb.classList.add('editTextbox');
                editTb.onkeypress = function(){
                    if (event.keyCode == 13){   // Enter key
                        // Close the textbox, and save the value in the cell selected
                        var enteredText = this.value;
                        var parent = this.parentNode;
                        if(enteredText !== '') {
                            var note = document.createElement('span');
                            note.classList.add('note');
                            note.classList.add('showed');
                            note.innerText = enteredText;
                            parent.appendChild(note);

                            var currentNotes = parent.getElementsByClassName('note');
                             if(currentNotes.length > 1){
                                 // Hide all childes
                                 for(var c = 0; c < currentNotes.length; c++){
                                     currentNotes[c].classList.remove('showed');
                                     currentNotes[c].classList.add('hidden');
                                 }
                                 // Show items count element
                                 var showContent = document.createElement('span')
                                 showContent.innerText = currentNotes.length + ' notes...';
                                 showContent.classList.add('showNotes');
                                 showContent.classList.add('showed');
                                 // If there is showNotes already
                                 var oldElements = parent.getElementsByClassName('showNotes');
                                 if(oldElements.length > 0) {
                                     parent.removeChild(oldElements[0]);
                                 }

                                 showContent.onclick = showContentClick;
                                 parent.appendChild(showContent);
                             }
                        }
                        parent.classList.remove('clicked');
                        parent.removeChild(this);
                    }
                }

                this.appendChild(editTb);   // Must be before focus
                editTb.focus();
            };
        }

        function showContentClick(){
            var container = this.parentNode;
            var notes = container.getElementsByClassName('note');
            for(var i = 0; i < notes.length; i++){
                notes[i].classList.remove('hidden');
                notes[i].classList.add('showed');
            }

            container.removeChild(this);
        }
    }
})();
