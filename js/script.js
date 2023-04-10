// sound setting
class Sound {
  constructor() {
    this.taskComplete = new Audio("sounds/task-complete.mp3");
    this.taskComplete.volume = 0.5;
    this.taskComplete.loop = false;
  }
  start() {
    this.taskComplete.play();
  }
  stop() {
    this.taskComplete.pause();
  }
}
let sound = new Sound();

const form = document.getElementById("form");
const iconInput = document.getElementById("input-icon-el");
const input = document.getElementById("input-el");
const massage = document.getElementById("msg");
const taskList = document.getElementById("task-list-el");
const titleWrapper = document.getElementById("title-wrapper");
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
  titleWrapper.style.display = "none";

  toDoListData.push({
    text: input.value,
    check: false,
  });
  localStorage.setItem("data", JSON.stringify(toDoListData));
  input.value = "";

  displayToDoList();
};

const displayToDoList = () => {
  taskList.innerHTML = "";

  return toDoListData.map((x, y) => {
    x["id"] = y;
    x["checkEl"] = (y + 1) * -85;
    x["checkIcon"] = (y + 2) * -56;
    const { text, id, checkEl, checkIcon } = x;
    return (taskList.innerHTML += `
    <li class="task-item"  id="${id}">
        <div class="item-text">
          <i id= "${checkIcon}" class="fa-regular fa-circle" onclick ="checkToDoList(this,${checkEl})"></i>
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
  displayLogo();
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
    sound.start();
  } else {
    checkIcon.classList.add("fa-circle");
    checkIcon.classList.remove("fa-circle-check");
    check_el.classList.remove("check");
    search.check = false;
    localStorage.setItem("data", JSON.stringify(toDoListData));
  }
};

const checkLine = () => {
  for (let i = 0; i < toDoListData.length; i++) {
    let tick = document.getElementById(`${toDoListData[i].checkEl}`);
    let checkIconEl = document.getElementById(`${toDoListData[i].checkIcon}`);
    if (
      toDoListData[i].check === true &&
      checkIconEl.classList.contains("fa-circle")
    ) {
      checkIconEl.classList.remove("fa-circle");
      checkIconEl.classList.add("fa-circle-check");
      tick.classList.add("check");
    } else if (toDoListData[i].check === false) {
      checkIconEl.classList.add("fa-circle");
      checkIconEl.classList.remove("fa-circle-check");
      tick.classList.remove("check");
    }
  }
};
0;

const displayLogo = () => {
  if (toDoListData.length > 0) {
    titleWrapper.style.display = "none";
  } else if (toDoListData.length === 0 || undefined) {
    titleWrapper.style.display = "block";
  }
};

let themeData = [
  {
    color: "blue",
    name: "blue",
  },
  {
    color: "purple",
    name: "purple",
  },
  {
    color: "",
    name: "dark red",
  },
  {
    color: "",
    name: "red",
  },
  {
    color: "",
    name: "green",
  },
  {
    color: "",
    name: "lightBlue",
  },
  {
    color: "",
    name: "darkBlue",
  },
];

localStorage.setItem("themeData", JSON.stringify(themeData));
const displaySettingData = () => {
  for (let i = 0; i < themeData.length; i++) {
    let theme_btn_group = document.querySelector(".theme-btn-group");
    let themeBtn = document.createElement("div");
    themeBtn.setAttribute("id", themeData[i].name);
    themeBtn.style.background = themeData[i].color;
    themeData[i]["choice"] = false;
    themeBtn.addEventListener("click", (e) => {
      document.querySelector("body").style.background = themeData[i].color;
      let search = themeData.find((x) => x.name === e.target.id);
      if (search) {
        themeData[i].choice = true;
        localStorage.setItem("themeData", JSON.stringify(themeData));
      }
    });
    theme_btn_group.appendChild(themeBtn);
  }
};

const setting = () => {
  let dropdown_container = document.querySelector(".dropdown-container");
  if (!dropdown_container.classList.contains("active")) {
    dropdown_container.classList.add("active");
  } else {
    dropdown_container.classList.remove("active");
  }
};

(() => {
  toDoListData = JSON.parse(localStorage.getItem("data")) || [];
  themeData = JSON.parse(localStorage.getItem("themeData")) || [];

  displayToDoList();
  checkLine();
  displayLogo();
  displaySettingData();
})();
