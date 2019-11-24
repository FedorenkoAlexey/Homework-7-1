const usersData = "https://jsonplaceholder.typicode.com/users";
const usersPost = "https://jsonplaceholder.typicode.com/posts?userId=1";
const usersComment = "https://jsonplaceholder.typicode.com/comments?postId=1";

const btn = document.getElementById("getUser");
const list = document.getElementById("list-group");
const postList = document.getElementById("post-list");
const comments = document.getElementById("comment-list");
const message = document.getElementById("message");

let comResult;
let countCom = 0;

console.log(postList);

btn.addEventListener("click", () => {
  getUsersData();
  // .then(getUsersPost());
});

function getUsersData() {
  return new Promise(function(succes, fail) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", usersData);
    xhr.onload = () => {
      if (xhr.status !== 200) {
        message.innerHTML = "Request failed: " + xhr.status;
      } else {
        const resp = JSON.parse(xhr.response);
        showUsers(resp);
        message.innerHTML = "Request succses: " + xhr.status;
        // console.log(`Loded: ${xhr.status} ${xhr.response}`);
      }
    };
    xhr.onerror = () => {
      console.log("Network Error: " + xhr.status);
    };
    xhr.send();
  });
}

function showUsers(r) {
  list.innerHTML = " ";
  r.forEach(users => {
    const field = document.createElement("button");
    field.classList.add("list-group-item");
    field.classList.add("list-group-item-action");
    field.addEventListener("click", () => {
      show(users.id);
    });
    // field.setAttribute("onclick", show(users.id));
    field.id = "user_id" + users.id;
    field.textContent = users.name;
    list.appendChild(field);
  });
}
//---------------------------------------------------------------//
function show(id) {
  postList.innerHTML = " ";
  getComment();
  getUsersPost();
}

function getUsersPost() {
  return new Promise(function(succes, fail) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", usersPost);
    xhr.onload = () => {
      if (xhr.status !== 200) {
        console.log("Request failed: " + xhr.status);
      } else {
        const resp = JSON.parse(xhr.response);
        showPost(resp);
        // console.log(`Loded: ${xhr.status} ${xhr.response}`);
      }
    };
    xhr.onerror = () => {
      console.log("Network Error: " + xhr.status);
    };
    xhr.send();
  });
}

function showPost(r) {
  r.forEach(post => {
    const li = document.createElement("li");
    li.classList.add("list-group-item");
    li.classList.add("d-flex");
    li.classList.add("justify-content-between");
    li.classList.add("align-items-center");
    li.addEventListener("click", () => {
      showComment(comResult);
    });
    li.textContent = post.title;
    postList.appendChild(li);
    const span = document.createElement("span");
    span.classList.add("badge");
    span.classList.add("badge-primary");
    span.classList.add("badge-pill");
    span.id = "post";
    // span.textContent = setTimeout(() => {
    //   innerHTML = "55";
    // }, 3000);
    span.textContent = countCom;
    li.appendChild(span);
  });
}

function getComment() {
  return new Promise(function(succes, fail) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", usersComment);
    xhr.onload = () => {
      if (xhr.status !== 200) {
        console.log("Request failed: " + xhr.status);
      } else {
        const resp = JSON.parse(xhr.response);
        comResult = resp;
        comVal(resp);
        // showComment(resp);
        // 	console.log(`Loded: ${xhr.status} ${xhr.response}`);
      }
    };
    xhr.onerror = () => {
      console.log("Network Error: " + xhr.status);
    };
    xhr.send();
  });
}

function showComment(r) {
  comments.innerHTML = " ";
  r.forEach(comm => {
    const field = document.createElement("p");
    field.classList.add("list-group-item");
    field.classList.add("list-group-item-action");
    field.textContent = comm.name;
    comments.appendChild(field);
  });
}

function comVal(r) {
  let count = 0;
  r.forEach(comm => {
    count += comm.postId;
  });
  countCom = count;
}
