// Function to fetch data from API and populate the dropdown
const taskList = document.getElementById("task-list");
const idDropdown = document.getElementById("id-list");
let allTodos = []; // Store data globally to filter without re-fetching

async function fetchData() {
  const url = 'https://jsonplaceholder.typicode.com/todos';
  
  try {
    const response = await fetch(url); // Wait for the initial response
    allTodos = await response.json(); // Wait to parse the JSON data
    
    populateDropdown(allTodos);
    renderTasks(allTodos); // Initial render of all tasks

  } catch (error) {
    console.error('Error:', error);
    taskList.innerHTML = '<p>Failed to load data.</p>';
  }
}

// 1. Function to display the tasks in [userID]: [title] format
function renderTasks(tasks) {
  taskList.innerHTML = ""; // Clear current list
  tasks.forEach(task => {
    const item = document.createElement('div');
    item.innerHTML = `<p><strong>${task.userId}</strong>: ${task.title}</p>`;
    taskList.appendChild(item);
  });
}

// 2. Function to extract unique User IDs and fill the dropdown
function populateDropdown(tasks) {
  // Get unique IDs using a Set
  const uniqueIds = [...new Set(tasks.map(task => task.userId))];

  // Add the "All" option first
  const allOption = document.createElement("option");
  allOption.value = "all";
  allOption.textContent = "Show All Users";
  idDropdown.appendChild(allOption);

  uniqueIds.forEach(id => {
    const option = document.createElement("option");
    option.value = id;
    option.textContent = `User ID: ${id}`; // Required format
    idDropdown.appendChild(option);
  });
}

// 3. Event Listener to filter data when dropdown changes
idDropdown.addEventListener("change", (e) => {
  const selectedId = e.target.value;
  
  if (selectedId === "all") {
    renderTasks(allTodos);
  } else {
    const filtered = allTodos.filter(task => task.userId == selectedId);
    renderTasks(filtered);
  }
});

fetchData();

const userLabel = document.querySelector(".all-user");
const dropdownContainer = document.getElementById("userid");

userLabel.addEventListener("click", () => {
  dropdownContainer.classList.toggle("show");
});