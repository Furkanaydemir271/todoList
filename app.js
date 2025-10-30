const todo = document.querySelector("#Todo");
const todoAddButton = document.querySelector("#todoAddButton");
const newCardBody = document.querySelector("#newCardBody");
const searchTodo = document.querySelector("#searchTodo");
const removeTodoButton = document.querySelector("#removeTodoButton");
const todoList = document.querySelector("#todoList");
const unOrdinaryList = document.querySelector("#id");
unOrdinaryList.addEventListener("click", removeSingleTodo);
completedTodos = 0;

let todos = [];

// === OLAY İZLEYİCİLERİ ===

// Sayfa Yenilendiğinde Todoları LocalStoragedan Arayüze Getir
document.addEventListener("DOMContentLoaded", loadTodosFromStorage);

// TODO EKLEME EVENT
todoAddButton.addEventListener("click", addTodo);

// TÜM TODOLARI KALDIR EVENT
removeTodoButton.addEventListener("click", removeAllTodos);


// === FONKSİYONLAR ===

function loadTodosFromStorage() {
    const todosFromStorage = localStorage.getItem("todos");
    if (todosFromStorage) {
        todos = JSON.parse(todosFromStorage);
        todos.forEach(function (todoText) {
            addTodoToUI(todoText);
        });
    }
}

// TODO EKLEME FONKSİYON
function addTodo(e) {
    e.preventDefault(); 
    const todoText = todo.value.trim();

    if (todoText === "") {
        createAlert("danger", "Lütfen bir todo giriniz");
    } else {
      
        addTodoToUI(todoText);

        todos.push(todoText);


        localStorage.setItem("todos", JSON.stringify(todos));

        createAlert("success", "Todo Başarıyla Eklendi");
        todo.value = ""; 
    }
}

// Arayüze Todo Ekleme 
function addTodoToUI(todoText) {
    const newLi = document.createElement("li");
    newLi.textContent = todoText; 
    newLi.className = "list-group-item d-flex justify-content-between align-items-center bg-warning";

    const deleteLink = document.createElement("a");
    deleteLink.href = "#";
    deleteLink.innerHTML = "&times;";
    deleteLink.style.color = "red";
    deleteLink.style.textDecoration = "none";
    deleteLink.style.fontSize = "1.5rem";

    

    newLi.appendChild(deleteLink); 
    unOrdinaryList.appendChild(newLi);
}

// Tekil Todo Silme Fonksiyonu 
function removeSingleTodo(e) {
    if(e.target.tagName === "A"){


    e.preventDefault();

    const liToRemove = e.target.parentElement;

    const todoText = liToRemove.firstChild.textContent.trim();

    liToRemove.remove();

    const index = todos.indexOf(todoText);
    if (index > -1) {
        todos.splice(index, 1);
    }
  
    localStorage.setItem("todos", JSON.stringify(todos));

    
    createAlert("info", "Todo silindi.");
        }
}

// TÜM TODOLARI KALDIRAN FONKSİYON
function removeAllTodos() {
    if (confirm("Tüm todoları kaldırmak istediğinizden emin misiniz? Todolar başarısız olacak")) {
            
        
        unOrdinaryList.innerHTML = "";

        localStorage.removeItem("todos");

        todos = [];

        createAlert("success", "Tüm todolar başarıyla kaldırıldı");
    }
}

// ALERT YARATMA FONKSİYON (Değişiklik yok)
function createAlert(color, text) {
    const alert = document.createElement("div");
    alert.setAttribute("role", "alert");
    alert.className = `alert alert-${color}`;
    alert.textContent = text;
    newCardBody.appendChild(alert);
    setTimeout(() => {
        newCardBody.removeChild(alert);
    }, 1000);
}
