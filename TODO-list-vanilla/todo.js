(function () {
    var cnt = document.getElementById('container'),
        showHideId = 'showhide',
        todoIdContainerId = 'todo',
        textAreaId = 'textarea',
        addBtnId = 'add',
        removeBtnId = 'remove',
        todoContainer = document.createElement('div'),
        rowCounter = 1,
        selectedTodo = null;

    function showHide() {
        var showhideButton = document.createElement('button');
        showhideButton.id = showHideId;
        showhideButton.textContent = 'Show/Hide';
        showhideButton.style.display = 'block';
        showhideButton.style.height = '30px';
        showhideButton.style.marginLeft = 'auto';
        showhideButton.style.marginRight = 'auto';

        showhideButton.onclick = function () {
            var todo = document.getElementById(todoIdContainerId);
            if (todo.style.display !== 'none') {
                todo.style.display = 'none';
                cnt.style.height = '30px';
            } else {
                todo.style.display = 'block';
                cnt.style.height = '400px';
            }
        }
        cnt.appendChild(showhideButton);
    }

    function todoListContainer() {
        todoContainer.id = todoIdContainerId;
        todoContainer.style.background = '#9BC6CD';
        todoContainer.style.display = 'block';
        todoContainer.style.padding = '5px';
        todoContainer.style.marginLeft = 'auto';
        todoContainer.style.marginRight = 'auto';
        todoContainer.style.width = '90%';
        todoContainer.style.height = '85%';
        cnt.appendChild(todoContainer);
    }

    function todoText() {
        var container = document.getElementById(todoIdContainerId);
        var todoText = document.createElement('textarea');
        todoText.id = textAreaId;
        container.appendChild(todoText);
    }

    function addButton() {
        var container = document.getElementById(todoIdContainerId);
        var addBtn = document.createElement('button');
        addBtn.style.position = 'relative';
        addBtn.style.top = '-33px';
        addBtn.textContent = 'Add Note';
        addBtn.id = addBtnId;

        addBtn.onclick = function () {
            var text = document.getElementById(textAreaId).value;
            if (text !== '' && text !== undefined) {
                attachTodo(todoContainer, text);
            }
        }
        container.appendChild(addBtn);
    }

    function removeButton() {
        var container = document.getElementById(todoIdContainerId);
        var removeBtn = document.createElement('button');
        removeBtn.style.position = 'relative';
        removeBtn.style.top = '-33px';
        removeBtn.textContent = 'Remove';
        removeBtn.id = removeBtnId;

        removeBtn.onclick = function () {
            if (selectedTodo !== null) {
                todoContainer.removeChild(selectedTodo);
                selectedTodo = null;
            }
        }
        container.appendChild(removeBtn);
    }

    function attachTodo(container, text) {
        rowCounter++;
        var selectedColor = 'SandyBrown',
            hoverColor = 'lightblue',
            todo = document.createElement('div'),
            bgcolor;

        if (rowCounter % 2 == 0) {
            bgcolor = '#fff';
        } else {
            bgcolor = '#ccc';
        }

        todo.onmouseover = function () {
            if (todo.style.backgroundColor !== selectedColor) {
                todo.style.backgroundColor = hoverColor
            }
        }

        todo.onmouseout = function () {
            if (todo.style.backgroundColor !== selectedColor) {
                todo.style.backgroundColor = bgcolor;
            }
        }

        todo.onclick = function () {
            if (todo == selectedTodo) {
                // Unselect
                selectedTodo = null;
                todo.style.backgroundColor = bgcolor;
            } else {
                // Select
                selectedTodo = todo;
                todo.style.backgroundColor = selectedColor
            }
        }

        todo.style.textAlign = 'center';
        todo.style.background = bgcolor;
        todo.innerHTML = text;
        container.appendChild(todo);
    }

    showHide();
    todoListContainer();
    todoText();
    addButton();
    removeButton();

    attachTodo(todoContainer, 'Click show/hide to close all. Click add to add a new todo note, or remove after select note to remove.');
})();
