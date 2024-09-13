
window.onload = function() {
    let savedTodos = getCookie("todos");
    if (savedTodos) {
        let todoList = JSON.parse(savedTodos);
        todoList.forEach(function(todo) {
            addTodoToList(todo);
        });
    }
};

document.getElementById('newTodo').addEventListener('click', function() {
    let todoText = prompt("กรอกข้อความสำหรับ To Do ใหม่:");
    if (todoText && todoText.trim()) {
        addTodoToList(todoText.trim());
        saveTodos();
    }
});

function addTodoToList(todoText) {
    let ftList = document.getElementById('ft_list');
    let newTodo = document.createElement('div');
    newTodo.className = 'todo-item';
    newTodo.textContent = todoText;
    newTodo.addEventListener('click', function() {
        let confirmDelete = confirm("คุณต้องการลบ To Do นี้หรือไม่?");
        if (confirmDelete) {
            ftList.removeChild(newTodo);
            saveTodos();
        }
    });
    ftList.insertBefore(newTodo, ftList.firstChild);
}

function saveTodos() {
    let todos = [];
    let todoItems = document.querySelectorAll('.todo-item');
    todoItems.forEach(function(item) {
        todos.push(item.textContent);
    });
    document.cookie = "todos=" + JSON.stringify(todos) + ";path=/;";
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
