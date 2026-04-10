// Todo App Logic

class TodoApp {
    constructor() {
        this.todos = [];
        this.init();
    }

    init() {
        // Initialize with default todos
        this.todos = [
            {
                id: 1,
                name: 'todo1',
                description: '這是第一個待辦事項',
                completed: false,
                expanded: false
            },
            {
                id: 2,
                name: 'todo2',
                description: '這是第二個待辦事項',
                completed: false,
                expanded: false
            }
        ];

        this.setupEventListeners();
        this.render();
    }

    setupEventListeners() {
        const addBtn = document.getElementById('add-btn');
        const todoInput = document.getElementById('todo-input');
        const descriptionInput = document.getElementById('description-input');

        addBtn.addEventListener('click', () => {
            this.addTodo(todoInput.value, descriptionInput.value);
        });

        // Allow Enter key to add todo (Ctrl+Enter for textarea)
        todoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addTodo(todoInput.value, descriptionInput.value);
            }
        });

        descriptionInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && e.ctrlKey) {
                this.addTodo(todoInput.value, descriptionInput.value);
            }
        });
    }

    addTodo(name, description) {
        if (!name.trim()) {
            alert('請輸入 todo 名稱');
            return;
        }

        const newTodo = {
            id: Date.now(),
            name: name.trim(),
            description: description.trim(),
            completed: false,
            expanded: false
        };

        this.todos.push(newTodo);
        this.clearInputs();
        this.render();
    }

    clearInputs() {
        document.getElementById('todo-input').value = '';
        document.getElementById('description-input').value = '';
        document.getElementById('todo-input').focus();
    }

    toggleComplete(id) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            this.render();
        }
    }

    toggleExpand(id) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            todo.expanded = !todo.expanded;
            this.render();
        }
    }

    deleteTodo(id) {
        this.todos = this.todos.filter(t => t.id !== id);
        this.render();
    }

    render() {
        const todoList = document.getElementById('todo-list');
        
        if (this.todos.length === 0) {
            todoList.innerHTML = '<div class="empty-state">還沒有待辦事項，新增一個吧！</div>';
            return;
        }

        todoList.innerHTML = this.todos.map(todo => `
            <div class="todo-item ${todo.completed ? 'completed' : ''} ${todo.expanded ? 'show' : ''}">
                <input 
                    type="checkbox" 
                    class="todo-checkbox"
                    ${todo.completed ? 'checked' : ''}
                    onchange="app.toggleComplete(${todo.id})"
                >
                <div class="todo-content" onclick="app.toggleExpand(${todo.id})">
                    <div class="todo-name">${this.escapeHtml(todo.name)}</div>
                    ${todo.description ? `<div class="todo-description ${todo.expanded ? 'show' : ''}">${this.escapeHtml(todo.description)}</div>` : ''}
                </div>
                <button class="delete-btn" onclick="app.deleteTodo(${todo.id})">刪除</button>
            </div>
        `).join('');
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize the app when DOM is ready
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new TodoApp();
});
