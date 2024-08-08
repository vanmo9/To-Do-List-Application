document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    const completedTaskList = document.getElementById('completed-task-list');
    const totalTasksElement = document.getElementById('total-tasks');
    const completedTasksElement = document.getElementById('completed-tasks');
    const pendingTasksElement = document.getElementById('pending-tasks');
    const todaysDate = new Date().toLocaleDateString();
    document.getElementById('todays-date').textContent = todaysDate;

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            addTask(taskText);
            taskInput.value = '';
            updateTaskSummary();
        }
    });

    taskList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-task')) {
            e.target.parentElement.remove();
            updateTaskSummary();
        } else if (e.target.tagName === 'LI') {
            e.target.classList.toggle('completed');
            moveCompletedTask(e.target);
        }
    });

    function addTask(task) {
        const emoji = getEmoji(task);
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.innerHTML = `${emoji} ${task}`;
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn btn-danger btn-sm delete-task';
        deleteBtn.textContent = 'Delete';
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    }

    function getEmoji(task) {
        const emojis = {
            "fishing": "🎣",
            "gym": "🏋️‍♂️",
            "shopping": "🛒",
            "reading": "📚",
            "cooking": "🍳",
            "running": "🏃‍♂️",
            "cleaning": "🧹",
            "studying": "📖"
        };
        for (const key in emojis) {
            if (task.toLowerCase().includes(key)) {
                return emojis[key];
            }
        }
        return "🔹"; // default emoji
    }

    function moveCompletedTask(taskItem) {
        if (taskItem.classList.contains('completed')) {
            const li = taskItem.cloneNode(true);
            li.querySelector('.delete-task').addEventListener('click', () => {
                li.remove();
                updateTaskSummary();
            });
            completedTaskList.appendChild(li);
        } else {
            completedTaskList.querySelectorAll('li').forEach(li => {
                if (li.textContent === taskItem.textContent) {
                    li.remove();
                }
            });
        }
    }

    function updateTaskSummary() {
        const totalTasks = taskList.children.length;
        const completedTasks = taskList.querySelectorAll('.completed').length;
        const pendingTasks = totalTasks - completedTasks;

        totalTasksElement.textContent = totalTasks;
        completedTasksElement.textContent = completedTasks;
        pendingTasksElement.textContent = pendingTasks;
    }
});