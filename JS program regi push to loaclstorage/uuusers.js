// Uses this code for editing or deleting the registration form if SIR told

const userList = document.getElementById("userList");
let users = JSON.parse(localStorage.getItem("users") || "[]");

function saveUsers() {
  localStorage.setItem("users", JSON.stringify(users));
  renderUsers();
}

function renderUsers() {
  userList.innerHTML = "";

  if (users.length === 0) {
    userList.innerHTML = "<li>No registered users found.</li>";
    return;
  }

  users.forEach((user, index) => {
    const li = document.createElement("li");
    li.style.marginBottom = "15px";

    li.innerHTML = `
      <div>
        <strong>${user.firstName} ${user.lastName}</strong><br>
        DOB: ${user.dob}<br>
        Gender: ${user.gender}<br>
        Mobile: ${user.mobile}<br>
        Email: ${user.email}<br>
        <button onclick="editUser(${index})">Edit</button>
        <button onclick="deleteUser(${index})" style="background-color: red; color: white; margin-left: 10px;">Delete</button>
      </div>
    `;

    userList.appendChild(li);
  });
}

function deleteUser(index) {
  if (confirm("Are you sure you want to delete this user?")) {
    users.splice(index, 1);
    saveUsers();
  }
}

function editUser(index) {
  const user = users[index];
  const formHtml = `
    <form id="editForm">
      <input type="text" id="editFirstName" value="${user.firstName}" required />
      <input type="text" id="editLastName" value="${user.lastName}" required />
      <input type="date" id="editDob" value="${user.dob}" required />
      <select id="editGender" required>
        <option value="Male" ${user.gender === 'Male' ? 'selected' : ''}>Male</option>
        <option value="Female" ${user.gender === 'Female' ? 'selected' : ''}>Female</option>
      </select>
      <input type="text" id="editMobile" value="${user.mobile}" required maxlength="10" />
      <input type="email" id="editEmail" value="${user.email}" required />
      <button type="submit">Save</button>
      <button type="button" onclick="renderUsers()" style="margin-left: 10px;">Cancel</button>
    </form>
  `;

  userList.children[index].innerHTML = formHtml;

  document.getElementById("editForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const updated = {
      firstName: document.getElementById("editFirstName").value.trim(),
      lastName: document.getElementById("editLastName").value.trim(),
      dob: document.getElementById("editDob").value,
      gender: document.getElementById("editGender").value,
      mobile: document.getElementById("editMobile").value.trim(),
      email: document.getElementById("editEmail").value.trim()
    };

    const mobileValid = /^\d{10}$/.test(updated.mobile);
    const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    if (!mobileValid) {
      alert("Mobile must be exactly 10 digits.");
      return;
    }

    if (!emailPattern.test(updated.email)) {
      alert("Email must be a valid Gmail address.");
      return;
    }

    users[index] = updated;
    saveUsers();
  });
}

renderUsers();
