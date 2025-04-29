// Select elements from the HTML
const taskInput = document.getElementById("task");
const taskList = document.getElementById("task-list");
const messageContainer = document.getElementById("message-container");

// Task limit
const taskLimit = 5;

// Add a new task to the list
function addTask() {
    const taskText = taskInput.value.trim();

    // Condition for task limit
    if (taskList.childElementCount >= taskLimit) {
        showTaskLimitMessage();
        return;
    }

    if (taskText !== "") {
        const li = document.createElement("li");
        li.innerHTML = taskText +
            '<button class="removeButton" onclick="removeTask(this)">Remove</button>';

        taskList.appendChild(li);
        taskInput.value = "";
    }
}

// Remove a task from the list
function removeTask(element) {
    const li = element.parentElement;
    li.classList.add('fade-out'); // Add fade-out class for animation

    // Wait for the animation to finish before removing the element
    li.addEventListener('animationend', () => {
        taskList.removeChild(li);
    });
}

// Show message if the limit was reached
function showTaskLimitMessage() {
    messageContainer.innerText = "Task limit reached. You can only have 5 tasks at a time.";
    messageContainer.style.display = "block";
    setTimeout(() => {
        messageContainer.style.display = "none";
    }, 3000); // Hide the message after 3 seconds
}

// Event listener to add a task when Enter key is pressed
taskInput.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});
