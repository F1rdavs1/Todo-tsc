"use strict";
let elForm = document.querySelector("form");
let elList = document.querySelector(".list");
let saveTodos = localStorage.getItem("todos");
let array = saveTodos ? JSON.parse(saveTodos) : [];
elForm === null || elForm === void 0 ? void 0 : elForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const form = e.target;
    if (form) {
        let data = {
            id: array.length + 1,
            value: form.elements[0].value,
            isComplated: false,
        };
        array.push(data);
        form.reset();
        updateLocalStorage();
        addList(array, elList);
    }
});
function addList(list, arr) {
    if (arr) {
        arr.innerHTML = "";
        list.forEach((value, index) => {
            let elItem = document.createElement("li");
            elItem.className = `flex justify-between relative ${value.isComplated
                ? "before:w-[60%] before:h-[2px] before:bg-black before:absolute before:top-6 before:right-0 before:left-11 before:bottom-0"
                : ""}`;
            elItem.innerHTML = `
        <div class="flex items-center">
          <input type="checkbox" onclick="clickCheck(${value.id})" class="w-[40px] mr-[5px] rounded-[45%] border-[2px] border-violet-300 ${value.isComplated ? "white" : "bg-violet-500"} flex justify-center items-center">
          <span class="text-violet-400 text-[20px]">${index + 1}.</span>
          <p class="text-violet-500 text-[23px]">${value.value}</p>
        </div>
        <div class="flex justify-between gap-3">
          <button onclick="clickUpdate(${value.id})" class="p-3 bg-[green] rounded-[12px] text-white font-medium duration-300 hover:bg-opacity-50">Update</button>
          <button onclick="clickDelete(${value.id})" class="p-3 bg-[red] rounded-[12px] text-white font-medium duration-300 hover:bg-opacity-50">Delete</button>
        </div>
      `;
            arr.append(elItem);
        });
        document.getElementById("all").textContent = array.length.toString();
        let trueobj = array.filter((item) => item.isComplated);
        document.getElementById("complated").textContent =
            trueobj.length.toString();
        document.getElementById("uncomplated").textContent = (array.length - trueobj.length).toString();
    }
}
function updateLocalStorage() {
    localStorage.setItem("todos", JSON.stringify(array));
}
function clickDelete(id) {
    let findedIndex = array.findIndex((item) => item.id === id);
    if (findedIndex !== -1) {
        array.splice(findedIndex, 1);
        updateLocalStorage();
        addList(array, elList);
    }
}
function clickCheck(id) {
    let findedObj = array.find((item) => item.id === id);
    if (findedObj) {
        findedObj.isComplated = !findedObj.isComplated;
        updateLocalStorage();
        addList(array, elList);
    }
}
function clickUpdate(id) {
    let findedObj = array.find((item) => item.id === id);
    if (findedObj) {
        let newValue = prompt("Update your Todo:", findedObj.value);
        if (newValue !== null && newValue.trim() !== "") {
            findedObj.value = newValue;
            updateLocalStorage();
            addList(array, elList);
        }
    }
}
addList(array, elList);
