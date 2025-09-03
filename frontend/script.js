const API_URL = "http://localhost:5050/habits";

// Fetch and display habits
async function fetchHabits() {
  const res = await fetch(API_URL);
  const habits = await res.json();

  const list = document.getElementById("habitList");
  const empty = document.getElementById("emptyState");
  list.innerHTML = "";

  if (!habits.length) {
    empty.classList.remove("hidden");
    return;
  } else {
    empty.classList.add("hidden");
  }

  const today = new Date().setHours(0, 0, 0, 0);
  let completedToday = 0;

  habits.forEach(habit => {
    const li = document.createElement("li");
    li.className = "item";

    const name = document.createElement("span");
    name.textContent = habit.name;

    const actions = document.createElement("div");
    actions.className = "item__actions";

    // Done button
    const doneBtn = document.createElement("button");
    doneBtn.className = "btn btn--done";
    doneBtn.textContent = "✅";
    doneBtn.onclick = async () => {
      await fetch(`${API_URL}/${habit._id}/progress`, { method: "PUT" });
      fetchHabits();
    };

    // Streak button
    const streakBtn = document.createElement("button");
    streakBtn.className = "btn btn--streak";
    streakBtn.textContent = "🔥";
    streakBtn.onclick = async () => {
      const res = await fetch(`${API_URL}/${habit._id}/streak`);
      const data = await res.json();
      alert(`${habit.name} streak: ${data.streak} days`);
    };

    // Edit button
    const editBtn = document.createElement("button");
    editBtn.className = "btn btn--edit";
    editBtn.textContent = "✏️";
    editBtn.onclick = async () => {
      const newName = prompt("Edit habit name:", habit.name);
      if (newName) {
        await fetch(`${API_URL}/${habit._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: newName })
        });
        fetchHabits();
      }
    };

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "btn btn--delete";
    deleteBtn.textContent = "🗑";
    deleteBtn.onclick = async () => {
      if (confirm("Delete this habit?")) {
        await fetch(`${API_URL}/${habit._id}`, { method: "DELETE" });
        fetchHabits();
      }
    };

    actions.append(doneBtn, streakBtn, editBtn, deleteBtn);
    li.append(name, actions);
    list.appendChild(li);

    if (habit.logs.some(date => new Date(date).setHours(0,0,0,0) === today)) {
      completedToday++;
    }
  });

  updateDashboard(completedToday, habits.length);
}

// Update dashboard stats and progress bar
function updateDashboard(completed, total) {
  document.getElementById("dashboardStats").textContent =
    `${completed} / ${total} habits completed today`;

  const percent = total ? (completed / total) * 100 : 0;
  document.getElementById("progressFill").style.width = `${percent}%`;
}

// Add new habit
async function addHabit() {
  const input = document.getElementById("habitInput");
  const name = input.value.trim();
  if (!name) return alert("Enter a habit!");

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId: "1", name })
  });

  input.value = "";
  fetchHabits();
}

// Dark mode toggle
document.getElementById("toggleDark").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// Initialize
fetchHabits();
