const todoInput = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.querySelector('.theme-icon');

// Add todo function
function addTodo() {
    const todoText = todoInput.value.trim();
    
    if (todoText === '') {
        alert('Please enter a todo!');
        return;
    }
    
    // Create list item
    const li = document.createElement('li');
    li.className = 'todo-item';
    
    // Create text span
    const span = document.createElement('span');
    span.className = 'todo-text';
    span.textContent = todoText;
    span.onclick = function() {
        span.classList.toggle('completed');
    };
    
    // Create delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = function() {
        li.remove();
        checkEmptyState();
    };
    
    // Append elements
    li.appendChild(span);
    li.appendChild(deleteBtn);
    todoList.appendChild(li);
    
    // Clear input
    todoInput.value = '';
    todoInput.focus();
    
    checkEmptyState();
}

// Check if list is empty and show message
function checkEmptyState() {
    const existingEmptyState = document.querySelector('.empty-state');
    
    if (todoList.children.length === 0) {
        if (!existingEmptyState) {
            const emptyDiv = document.createElement('div');
            emptyDiv.className = 'empty-state';
            emptyDiv.textContent = 'No todos yet. Add one above!';
            todoList.appendChild(emptyDiv);
        }
    } else {
        if (existingEmptyState) {
            existingEmptyState.remove();
        }
    }
}

// Event listeners
addBtn.addEventListener('click', addTodo);

todoInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTodo();
    }
});

// Theme toggle functionality
function setTheme(isDark) {
    if (isDark) {
        document.body.classList.add('dark-theme');
        themeIcon.textContent = '☀️';
        localStorage.setItem('theme', 'dark');
    } else {
        document.body.classList.remove('dark-theme');
        themeIcon.textContent = '🌙';
        localStorage.setItem('theme', 'light');
    }
}

function toggleTheme() {
    const isDark = document.body.classList.contains('dark-theme');
    setTheme(!isDark);
}

// Load saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    setTheme(true);
}

// Theme toggle event listener
themeToggle.addEventListener('click', toggleTheme);

// Initialize empty state
checkEmptyState();
