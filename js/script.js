const form = document.getElementById("form");
const iconInput = document.getElementById("input-icon-el");
const input = document.getElementById("input-el");
const massage = document.getElementById("msg");
const taskList = document.getElementById("task-list-el");
const titleWrapper = document.getElementById("title-wrapper");
titleWrapper.style.display = "block";
from.addEventListener("click", (event) => {
  event.preventDefault();
  iconInput.classList.remove("fa-plus");
  iconInput.classList.remove("fa-solid");
  iconInput.classList.add("fa-circle");
  iconInput.classList.add("fa-regular");
});

from.addEventListener("submit", (event) => {
  event.preventDefault();
  if (input.value === "") {
    massage.textContent = " value not valid ! ";
  } else {
    massage.textContent = "";
    getToDoListData();
  }
});

let toDoListData = [];
const getToDoListData = () => {
  toDoListData.push({
    text: input.value,
    check: false,
  });
  localStorage.setItem("data", JSON.stringify(toDoListData));
  input.value = "";

  displayToDoList();
};

const displayToDoList = () => {
  titleWrapper.style.display = "none";
  taskList.innerHTML = "";
  return toDoListData.map((x, y) => {
    x["id"] = y;
    x["checkEl"] = y * -1;
    const { text, id, checkEl } = x;
    return (taskList.innerHTML += `
    <li class="task-item"  id="${id}">
        <div class="item-text">
          <i class="fa-regular fa-circle" onclick ="checkToDoList(this,${checkEl})"></i>
           <span id ="${checkEl}">${text}</span>
        </div>
          <i class="fa-solid fa-trash-can" onclick ="removeToDoList(this,${id})"></i>
    </li>
  
  `);
  });
};

const removeToDoList = (e, id) => {
  let element = e.parentElement;
  let elId = element.id;
  toDoListData = toDoListData.filter((x) => x.id !== id);
  localStorage.setItem("data", JSON.stringify(toDoListData));
  document.getElementById(elId).remove();
};

const checkToDoList = (e, checkEl) => {
  let search = toDoListData.find((x) => x["checkEl"] === checkEl);
  let checkIcon = e;
  let check_el = document.getElementById(checkEl);
  if (checkIcon.classList.contains("fa-circle")) {
    checkIcon.classList.remove("fa-circle");
    checkIcon.classList.add("fa-circle-check");
    check_el.classList.add("check");
    search.check = true;
    localStorage.setItem("data", JSON.stringify(toDoListData));
  } else {
    checkIcon.classList.add("fa-circle");
    checkIcon.classList.remove("fa-circle-check");
    check_el.classList.remove("check");
    search.check = false;
    localStorage.setItem("data", JSON.stringify(toDoListData));
  }
};

//

(() => {
  toDoListData = JSON.parse(localStorage.getItem("data")) || [];
  displayToDoList();
})();
