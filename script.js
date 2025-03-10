document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('todo-form');
    const input = document.getElementById('todo-input');
    const errorMessage = document.getElementById('error-message');
    const todoList = document.getElementById('todo-list');
    const remainingTasks = document.getElementById('remaining-tasks');
    let todos = JSON.parse(localStorage.getItem('todos')) || [];

    const updateRemainingTasks = () => {
        const remainingCount = todos.filter(todo => !todo.completed).length;
        remainingTasks.textContent = `Tehtäviä jäljellä: ${remainingCount}`;
    };

    const renderTodos = () => {
        todoList.innerHTML = '';
        todos.forEach((todo, index) => {
            const li = document.createElement('li');
            li.textContent = todo.text;
            li.classList.toggle('completed', todo.completed);
        
            const completeButton = document.createElement('button');
            completeButton.textContent = todo.completed ? 'Poista' : 'Valmis';
            completeButton.classList.add('complete');
            completeButton.classList.add('green-button'); // Add this line
        
            completeButton.addEventListener('click', () => {
                todos[index].completed = !todos[index].completed;
                localStorage.setItem('todos', JSON.stringify(todos));
                renderTodos();
                updateRemainingTasks();
            });
        
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Poista';
            removeButton.classList.add('remove');
            removeButton.addEventListener('click', () => {
                todos.splice(index, 1);
                localStorage.setItem('todos', JSON.stringify(todos));
                renderTodos();
                updateRemainingTasks();
            });
        
            li.appendChild(completeButton);
            li.appendChild(removeButton);
            todoList.appendChild(li);
        });
        
        updateRemainingTasks();
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = input.value.trim();
        if (text === '') {
            errorMessage.textContent = 'Tehtävä ei voi olla tyhjä';
            input.classList.add('error');
        } else if (text.length < 3) {
            alert('Syötä vähintään 3 merkkiä');  // This will display an alert
            errorMessage.textContent = 'Tehtävä on liian lyhyt';
            input.classList.add('error');
        }
             else {
            todos.push({ text, completed: false });
            localStorage.setItem('todos', JSON.stringify(todos));
            input.value = '';
            errorMessage.textContent = '';
            input.classList.remove('error');
            renderTodos();
        }
    });

    renderTodos();
});

