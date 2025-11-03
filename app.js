    const todo = document.querySelector("#Todo");
    const todoAddButton = document.querySelector("#todoAddButton");
    const newCardBody = document.querySelector("#newCardBody");
    const searchTodo = document.querySelector("#searchTodo");
    const removeTodoButton = document.querySelector("#removeTodoButton");
    const todoList = document.querySelector("#todoList");
    const unOrdinaryList = document.querySelector("#allTodos");
    const unOrdinaryList2 = document.querySelector("#completedTodos")
    const unCompletedUL = document.querySelector("#unCompletedUL");


    let completedTodos = [];
    let uncompletedTodos = []
    let todos = [];

    // === OLAY İZLEYİCİLERİ ===

    // Sayfa Yenilendiğinde Todoları LocalStoragedan Arayüze Getir
    document.addEventListener("DOMContentLoaded", loadTodosFromStorage);

    // TODO EKLEME EVENT
    todoAddButton.addEventListener("click", addTodo);

    // TÜM TODOLARI KALDIR EVENT
    removeTodoButton.addEventListener("click", removeAllTodos);

    unOrdinaryList.addEventListener("click", removeSingleTodo);
    // Sayfa Yenilendiğinde Başarılı Todoları Arayüze Getir
    document.addEventListener("DOMContentLoaded", addCompletedTodosUI);


    document.addEventListener("DOMContentLoaded",addUncompletedTodosTOUI)
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
        if (e.target.tagName === "A") {


            if (confirm("Todo Tamamlandı Mı Evet İçin Tamam'a Hayır için İptal'e Basınız.")) {
                e.preventDefault();

                const liToRemove = e.target.parentElement;

                const todoText = liToRemove.firstChild.textContent.trim();

                liToRemove.remove();

                const index = todos.indexOf(todoText);
                if (index > -1) {
                    todos.splice(index, 1);
                }

                localStorage.setItem("todos", JSON.stringify(todos));

                completedTodos.push(todoText);
                localStorage.setItem("completedTodos", JSON.stringify(completedTodos));

                createAlert("info", "Todo Başarılı bir şekilde tamamlandı..");
                
                addCompletedTodosUI()
            }else{
                e.preventDefault()
                const liToRemove = e.target.parentElement;

                const todoText = liToRemove.firstChild.textContent.trim();

                liToRemove.remove();

                const index = todos.indexOf(todoText);
                if (index > -1) {
                    todos.splice(index, 1);
                }

                localStorage.setItem("todos", JSON.stringify(todos));
                uncompletedTodos.push(todoText);
                localStorage.setItem("unCompletedTodos", JSON.stringify(uncompletedTodos))
                createAlert("danger","Todo Tamamlanılamadı!!!")
                addUncompletedTodosTOUI()
                
            }
        }
    }

    // TÜM TODOLARI KALDIRAN FONKSİYON
    function removeAllTodos() {
        if (confirm("Tüm todoları kaldırmak istediğinizden emin misiniz? Todolar başarısız olacak")) {


            unOrdinaryList.innerHTML = "";

            localStorage.removeItem("todos");

            todos = [];

            createAlert("info", "Tüm todolar Temizlendi");
        }
    }

    // ALERT YARATMA FONKSİYON 
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

    // Başarılı olan Todoları Arayüze verme fonksiyonu
    function addCompletedTodosUI() {
        unOrdinaryList2.innerHTML = ""
        const successtodoFromStorage = localStorage.getItem("completedTodos");
        if (successtodoFromStorage) {
            completedTodos = JSON.parse(successtodoFromStorage);
            completedTodos.forEach(function (todo) {
                addSuccessTodoToUI(todo)
            })
        }
    }
    // Başarılı olan todoları arayüzde gösterme
    function addSuccessTodoToUI(successtodo) {
        const newTodo = document.createElement("li");
        newTodo.className = "list-group-item d-flex  justify-content-center align-items-start bg-success"
        newTodo.textContent = successtodo;
        unOrdinaryList2.appendChild(newTodo);

    }

    function addUncompletedTodosTOUI(){
        unCompletedUL.innerHTML = ""
        const uncompletedTodosFromStorage = localStorage.getItem("unCompletedTodos");
        if(uncompletedTodosFromStorage){
            uncompletedTodos = JSON.parse(uncompletedTodosFromStorage);
            uncompletedTodos.forEach(function(todo){
            showUnCompleted(todo);
            })
        }
    }
    function showUnCompleted(uncompletedTodo){
        const newTodo = document.createElement("li");
        newTodo.className = "list-group-item d-flex justify-content-center align-items-start bg-danger"
        newTodo.textContent = uncompletedTodo;
        unCompletedUL.appendChild(newTodo);
    }