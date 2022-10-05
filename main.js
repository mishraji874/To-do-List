const form = document.getElementById("form");
const input = document.getElementById("input");
const todosList = document.getElementById("todos");
const todos = JSON.parse(localStorage.getItem("todos"));

const updateLocalStorage = () => {
    const todosElements = document.querySelectorAll("li");
    const todos = [];
    todosElements.forEach((todosElements) => {
        todos.push({
            text: todosElement.innerText,
            completed: todosElement.classList.contains("completed"),
        });
    });
    localStorage.setItem("todos", JSON.stringify(todos));
};

const addTodo = (todo) => {
    let todoText = input.value;
    if(todo) todoText = todo.text;
    if(todoText) {
        const todosElement = document.createElement("li");
        if(todo && todo.completed) {
            todosElement.classList.add("completed");
        }
        todosElement.innerText = todoText;
        todosElement.addEventListener("click", () => {
            todosElement.classList.toggle("completed");
            updateLocalStorage();
        });
        todosElement.addEventListener("contextmenu", (e)=> {
            e.preventDefault();
            todosElement.remove();
            updateLocalStorage();
        });
        todosList.appendChild(todosElement);
        input.value = "";
        updateLocalStorage();
    }
};

if(todos) {
    todos.forEach((todo) => addTodo(todo));
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    addTodo();
});