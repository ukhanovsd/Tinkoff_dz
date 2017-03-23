"use strict";

var listElement = document.querySelector('.list');
var itemElementList = listElement.children;


var templateElement = document.getElementById('todoTemplate');
var templateContainer = 'content' in templateElement ? templateElement.content : templateElement;

var filtersElement = document.querySelector('.filters');
var actFilter = "all";

// формируем статистику
var statistics = [];
statistics['total'] = document.querySelector('.statistic__total');
statistics['done'] = document.querySelector('.statistic__done');
statistics['left'] = document.querySelector('.statistic__left');

// сформируем задачки
var todoList = [
    {
        name: 'Позвонить в сервис',
        status: 'todo'
    },
    {
        name: 'Купить хлеб',
        status: 'done'
    },
    {
        name: 'Захватить мир',
        status: 'todo'
    },
    {
        name: 'Добавить тудушку в список',
        status: 'todo'
    }
];

// функция по генерации элементов
function addTodoFromTemplate(todo) {
    var newElement = templateContainer.querySelector('.task').cloneNode(true);
    newElement.querySelector('.task__name').textContent = todo.name;
    setTodoStatusClassName(newElement, todo.status === 'todo');

    return newElement;
}

function setTodoStatusClassName(todo, flag) {
    todo.classList.toggle('task_todo', flag);
    todo.classList.toggle('task_done', !flag);
}

//функция для рендеринга
function TodoListTorender(listToRender) {
    var todoList = listToRender;
    listElement.innerHTML = '';

    todoList.map(addTodoFromTemplate).forEach(insertTodoElement);

    statistics['total'].innerHTML = todoList.length;
    statistics['done'].innerHTML = countItemsByStatus(todoList, 'done');
    statistics['left'].innerHTML = countItemsByStatus(todoList, 'todo');
}


function onListClick(event) {
    var target = event.target;
    var element;

    if (isStatusBtn(target)) {
        element = target.parentNode;
        changeTodoStatus(element);
    }

    if (isDeleteBtn(target)) {
        element = target.parentNode;
        deleteTodo(element);
    }
}

function onFilterClick(event) {
    var target = event.target;
    document.querySelector('.filters__item_selected').classList.remove('filters__item_selected');
    actFilter = target.getAttribute('data-filter');
    target.classList.add('filters__item_selected');
    TodoListTorender(TodoListTofilter());
}

function isStatusBtn(target) {
    return target.classList.contains('task__status');
}

function isDeleteBtn(target) {
    return target.classList.contains('task__delete-button');
}

function changeTodoStatus(element) {
    var todoName = element.children[1].innerHTML;
    var namesList = Array.prototype.map.call(todoList, function(element) {
        return element.name; });

    var todoId = namesList.indexOf(todoName);
    if (todoId > -1) {
        todoList[todoId].status = todoList[todoId].status == 'done' ? 'todo' : 'done';
    }
    
    TodoListTorender(TodoListTofilter());
}

function deleteTodo(element) {
    todoList = todoList.filter(function(todoItemInList) {
        return todoItemInList.name != element.children[1].innerHTML
    })

    TodoListTorender(TodoListTofilter());
}

function TodoListTofilter() {
    return todoList.filter(function (item) {
        return item.status == actFilter || actFilter == "all";
    });
}

function onInputKeydown(event) {
    if (event.keyCode !== 13) {
        return;
    }

    var ENTER_KEYCODE = 13;
    if (event.keyCode !== ENTER_KEYCODE) {
        return;
    }

    var todoName = inputElement.value.trim();

    if (todoName.length === 0 || checkIfTodoAlreadyExists(todoName)) {
        return;
    }

    var todo = createNewTodo(todoName);
    todoList.push(todo);
    // insertTodoElement(addTodoFromTemplate(todo));
    TodoListTorender(TodoListTofilter());
    inputElement.value = '';
}

function checkIfTodoAlreadyExists(todoName) {
    var todoElements = listElement.querySelectorAll('.task__name');
    var namesList = Array.prototype.map.call(todoElements, function(element) {
        return element.textContent;
    });
    return namesList.indexOf(todoName) > -1;
}

function createNewTodo(name) {
    return {
        name: name,
        status: 'todo'
    }
}

function insertTodoElement(elem) {
    if (listElement.children) {
        listElement.insertBefore(elem, listElement.firstElementChild);
        } 
        else {
        listElement.appendChild(elem);
        }
}

function countItemsByStatus(todoListToCount, todoStatus) {
    var count = 0;
    todoListToCount.forEach(function (elem) {
        count += elem.status == todoStatus;
    });

    return count;
}

TodoListTorender(TodoListTofilter());

listElement.addEventListener('click', onListClick);
filtersElement.addEventListener('click', onFilterClick)

var inputElement = document.querySelector('.add-task__input');
inputElement.addEventListener('keydown', onInputKeydown);