document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('todo-form');
    const input = document.getElementById('todo-input');
    const list = document.getElementById('todo-list');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const task = input.value.trim();

        if (!task || task.length < 3) {
            alert('Tehtävän täytyy olla yli 3 merkkiä pitkä!');
            input.style.border = '2px solid red';
            return;
        }

        input.style.border = '';
        const listItem = document.createElement('li');
        listItem.innerHTML = `${task} <button>Poista</button>`;

        listItem.querySelector('button').addEventListener('click', () => {
            list.removeChild(listItem);
        });

        listItem.addEventListener('click', () => {
            listItem.classList.toggle('completed');
        });

        list.appendChild(listItem);
        input.value = '';
    });
});
