const myForm = document.querySelector("#my-form");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const msg = document.querySelector(".msg");
// Listen for form submit
myForm.addEventListener("submit", onSubmit);

async function load() {
  const res = await axios.get("http://localhost:3000/user/get-user");
  for (let i = 0; i < res.data.users.length; i++) {
    display(res.data.users[i]);
  }
}

window.addEventListener("DOMContentLoaded", load);

function onSubmit(e) {
  e.preventDefault();

  if (nameInput.value === "" || emailInput.value === "") {
    // alert('Please enter all fields');
    msg.classList.add("error");
    msg.innerHTML = "Please enter all fields";
    // Remove error after 3 seconds
    setTimeout(() => msg.remove(), 3000);
  } else {
    // get data from user
    let newData = {
      name: nameInput.value,
      email: emailInput.value,
    };
    //save in local storage
    // localStorage.setItem(emailInput.value, JSON.stringify(newData));

    //save in crud
    axios
      .post("http://localhost:3000/user/add-user", newData)
      .then((res) => {
        display(newData);
      })
      .catch((err) => {
        console.error(err);
      });
    // display(newData);
    nameInput.value = "";
    emailInput.value = "";
  }
}

function display(user) {
  const parentNode = document.getElementById("users");
  var name = user.name;
  const childHTML = `<li id=${user.id}> ${user.name} - ${user.email} <button onclick = "deleteUser('${user.email}','${user.id}')">Delete</button> <button onclick = "editUser('${user.email}','${user.name}','${user.id}')">Edit</button> </li> `;
  parentNode.innerHTML = parentNode.innerHTML + childHTML;
}

function deleteUser(emailId, userID) {
  // console.log(userID);
  try {
    axios.delete(`http://localhost:3000/user/delete-user/${userID}`);
  } catch (error) {
    console.log(error);
  }
  // load();
  removeUserFromScreen(userID);
}

function removeUserFromScreen(emailId) {
  const node = document.getElementById(emailId);
  node.remove();
}
function editUser(emailId, name, userID) {
  document.getElementById("name").value = name;
  document.getElementById("email").value = emailId;
  deleteUser(emailId, userID);
}
