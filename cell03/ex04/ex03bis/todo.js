$(document).ready(function() {
    // เรียกคืนรายการ To Do จาก cookie เมื่อหน้าเว็บโหลด
    let savedTodos = getCookie("todos");
    if (savedTodos) {
        let todoList = JSON.parse(savedTodos);
        $.each(todoList, function(index, todo) {
            addTodoToList(todo);
        });
    }

    // เมื่อคลิกปุ่ม "New" เพื่อเพิ่ม To Do ใหม่
    $('#newTodo').on('click', function() {
        let todoText = prompt("กรอกข้อความสำหรับ To Do ใหม่:");
        if (todoText && todoText.trim()) {
            addTodoToList(todoText.trim());
            saveTodos(); // บันทึกรายการหลังจากเพิ่ม
        }
    });
});

// ฟังก์ชันเพื่อเพิ่ม To Do ลงในหน้า
function addTodoToList(todoText) {
    let newTodo = $('<div></div>').addClass('todo-item').text(todoText);
    newTodo.on('click', function() {
        let confirmDelete = confirm("คุณต้องการลบ To Do นี้หรือไม่?");
        if (confirmDelete) {
            $(this).remove();
            saveTodos(); // บันทึกรายการหลังจากลบ
        }
    });
    $('#ft_list').prepend(newTodo);
}

// ฟังก์ชันบันทึกรายการ To Do ใน cookie
function saveTodos() {
    let todos = [];
    $('.todo-item').each(function() {
        todos.push($(this).text());
    });
    document.cookie = "todos=" + JSON.stringify(todos) + ";path=/;";
}

// ฟังก์ชันดึงค่าจาก cookie
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
