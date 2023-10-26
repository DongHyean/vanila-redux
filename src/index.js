// #1
// import { createStore } from "redux";
// const add = document.getElementById("add");
// const minus = document.getElementById("minus");
// const number = document.querySelector("span");

// number.innerText = 0;

// const ADD = "ADD";
// const MINUS = "MINUS";

// // reducer
// const countModifier = (count = 0, action) => {
//   // ... modify state
//   //console.log(count, action);

//   switch (action.type) {
//     case ADD:
//       return count + 1;
//     case MINUS:
//       return count - 1;
//     default:
//       return count;
//   }
// };

// const countStore = createStore(countModifier);
// console.log(countStore);
// console.log(countStore.getState());

// const onChange = () => {
//   console.log("there was a change on the store", countStore.getState());
//   number.innerText = countStore.getState();
// };

// countStore.subscribe(onChange);

// /*
// countStore.dispatch({ type: "ADD" });
// countStore.dispatch({ type: "MINUS" });
// console.log(countStore.getState());
// */

// add.addEventListener("click", () => {
//   countStore.dispatch({ type: ADD });
// });
// minus.addEventListener("click", () => {
//   countStore.dispatch({ type: MINUS });
// });

// #2
import { createStore } from "redux";

const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";

const addToDo = (text) => {
  return { type: ADD_TODO, text };
};

const deleteToDo = (id) => {
  return { type: DELETE_TODO, id };
};

const reducer = (state = [], action) => {
  //console.log(action);
  switch (action.type) {
    case ADD_TODO:
      return [...state, { text: action.text, id: Date.now() }];
    case DELETE_TODO:
      return state.filter((toDo) => toDo.id !== action.id);
    default:
      return state;
  }
};
const store = createStore(reducer);

store.subscribe(() => {
  console.log(store.getState());
});

const dispatchAddToDo = (text) => {
  store.dispatch(addToDo(text));
};

const dispatchDeleteToDo = (e) => {
  //console.log("delete");
  //console.log(e.target.parentNode.id);

  const id = parseInt(e.target.parentNode.id);
  store.dispatch(deleteToDo(id));
};

const paintToDos = () => {
  const toDos = store.getState();

  ul.innerHTML = "";

  toDos.forEach((toDo) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.innerText = "DEL";
    btn.addEventListener("click", dispatchDeleteToDo);
    li.id = toDo.id;
    li.innerText = toDo.text;
    li.appendChild(btn);
    ul.appendChild(li);
  });
};

store.subscribe(paintToDos);

// const createToDo = (toDo) => {
//   const li = document.createElement("li");
//   li.innerText = toDo;
//   ul.appendChild(li);
// }; => dispatch

const onSubmit = (e) => {
  e.preventDefault();
  const toDo = input.value;
  input.value = "";
  //store.dispatch({ type: ADD_TODO, text: toDo });
  dispatchAddToDo(toDo);
};

form.addEventListener("submit", onSubmit);
