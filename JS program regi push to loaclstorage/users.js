const userList = document.getElementById('userList');
const users = JSON.parse(localStorage.getItem("users") || "[]");

if (users.length === 0) {
  userList.innerHTML = "<li>No registered users found.</li>";
} else {
  users.forEach(user => {
    const li = document.createElement('li');
    li.style.marginBottom = "10px";
    li.innerHTML = `
      <strong>${user.firstName} ${user.lastName}</strong><br>
      DOB: ${user.dob}<br>
      Gender: ${user.gender}<br>
      Mobile: ${user.mobile}<br>
      Email: ${user.email}
    `;
    userList.appendChild(li);
  });
}
