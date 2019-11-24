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

btn.addEventListener("click", () => {
  getUsersData().then(r => showUsers(r));
});

function getUsersData() {
  return new Promise(function(succes, fail) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", usersData);
    xhr.onload = () => {
      if (xhr.status !== 200) {
        fail((message.innerHTML = "Request failed: " + xhr.status));
      } else {
        succes(
          (resp = JSON.parse(xhr.response)),
          (message.innerHTML = "Request succes: " + xhr.status)
        );
      }
    };
    xhr.onerror = () => {
      message.innerHTML = "Network Error: " + xhr.status;
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
  getComment().then(r => comVal(r));
  getUsersPost().then(res => showPost(res));
}

function getUsersPost() {
  return new Promise(function(succes, fail) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", usersPost);
    xhr.onload = () => {
      if (xhr.status !== 200) {
        fail((message.innerHTML = "Request failed: " + xhr.status));
      } else {
        succes(
          (resp = JSON.parse(xhr.response)),
          (message.innerHTML = "Request : " + xhr.status)
        );
      }
    };
    xhr.onerror = () => {
      message.innerHTML = "Network Error: " + xhr.status;
    };
    xhr.send();
  });
}

function showPost(r) {
  r.forEach(post => {
    const li = document.createElement("button");
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
    span.classList.add("badge-pill");
    span.classList.add("spinner-border", "float-right");
    span.id = "post";
    span.textContent = " ";
    li.appendChild(span);

    setTimeout(() => {
      span.classList.remove("spinner-border", "float-right");
      span.classList.add("badge", "badge-primary");
      span.textContent = countCom;
    }, 1000);
  });
}

function getComment() {
  return new Promise(function(succes, fail) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", usersComment);
    xhr.onload = () => {
      if (xhr.status !== 200) {
        fail((message.innerHTML = "Request failed: " + xhr.status));
      } else {
        succes(
          (resp = JSON.parse(xhr.response)),
          (comResult = resp)
          // comVal(resp)
        );
      }
    };
    xhr.onerror = () => {
      message.innerHTML = "Network Error: " + xhr.status;
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
  message.innerHTML = "Request Comments succes";
}

function comVal(r) {
  let count = 0;
  r.forEach(comm => {
    count += comm.postId;
  });
  countCom = count;
}
