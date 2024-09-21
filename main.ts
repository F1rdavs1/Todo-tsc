let elForm: HTMLFormElement | null = document.querySelector("form");
let elList: HTMLElement | null = document.querySelector(".list");

interface Todo {
  id: number;
  value: string;
  isComplated: boolean;
}

let saveTodos = localStorage.getItem("todos");
let array: Todo[] = saveTodos ? JSON.parse(saveTodos) : [];

elForm?.addEventListener("submit", (e: Event) => {
  e.preventDefault();

  const form = e.target as HTMLFormElement;

  if (form) {
    let data: Todo = {
      id: array.length + 1,
      value: (form.elements[0] as HTMLInputElement).value,
      isComplated: false,
    };

    array.push(data);
    form.reset();
    updateLocalStorage();
    addList(array, elList);
  }
});

function addList(list: Todo[], arr: HTMLElement | null): void {
  if (arr) {
    arr.innerHTML = "";
    list.forEach((value, index) => {
      let elItem: HTMLElement = document.createElement("li");
      elItem.className = `flex justify-between relative ${
        value.isComplated
          ? "before:w-[60%] before:h-[2px] before:bg-black before:absolute before:top-6 before:right-0 before:left-11 before:bottom-0"
          : ""
      }`;
      elItem.innerHTML = `
        <div class="flex items-center">
          <input type="checkbox" onclick="clickCheck(${
            value.id
          })" class="w-[40px] mr-[5px] rounded-[45%] border-[2px] border-violet-300 ${
        value.isComplated ? "white" : "bg-violet-500"
      } flex justify-center items-center">
          <span class="text-violet-400 text-[20px]">${index + 1}.</span>
          <p class="text-violet-500 text-[23px]">${value.value}</p>
        </div>
        <div class="flex justify-between gap-3">
          <button onclick="clickUpdate(${
            value.id
          })" class="p-3 bg-[green] rounded-[12px] text-white font-medium duration-300 hover:bg-opacity-50">Update</button>
          <button onclick="clickDelete(${
            value.id
          })" class="p-3 bg-[red] rounded-[12px] text-white font-medium duration-300 hover:bg-opacity-50">Delete</button>
        </div>
      `;
      arr.append(elItem);
    });

    document.getElementById("all")!.textContent = array.length.toString();
    let trueobj: Todo[] = array.filter((item) => item.isComplated);
    document.getElementById("complated")!.textContent =
      trueobj.length.toString();
    document.getElementById("uncomplated")!.textContent = (
      array.length - trueobj.length
    ).toString();
  }
}

function updateLocalStorage(): void {
  localStorage.setItem("todos", JSON.stringify(array));
}

function clickDelete(id: number): void {
  let findedIndex: number = array.findIndex((item) => item.id === id);
  if (findedIndex !== -1) {
    array.splice(findedIndex, 1);
    updateLocalStorage();
    addList(array, elList);
  }
}

function clickCheck(id: number): void {
  let findedObj: Todo | undefined = array.find((item) => item.id === id);
  if (findedObj) {
    findedObj.isComplated = !findedObj.isComplated;
    updateLocalStorage();
    addList(array, elList);
  }
}

function clickUpdate(id: number): void {
  let findedObj: Todo | undefined = array.find((item) => item.id === id);
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
