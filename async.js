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
// let resUser = [];

function request(GET, url) {
  return new Promise((succes, fals) => {
    const xhr = new XMLHttpRequest();
    xhr.open(GET, url);
    xhr.onload = succes;
    xhr.onerror = fals;
    xhr.send();
  });
}

btn.addEventListener("click", () => {
  getUsersData();
});

async function getUsersData() {
  let resUser = await request("GET", usersData);
  resUser = JSON.parse(resUser.target.response);
  try {
    list.innerHTML = " ";
    resUser.forEach(users => {
      const field = document.createElement("button");
      field.classList.add("list-group-item");
      field.classList.add("list-group-item-action");
      field.addEventListener("click", () => {
        show(users.id);
      });
      field.id = "user_id" + users.id;
      field.textContent = users.name;
      list.appendChild(field);
    });
    message.innerHTML = "Request Users succes";
  } catch {
    message.innerHTML = "Request failed";
  }
}

function show() {
  postList.innerHTML = " ";
  getComment();
  getUsersPost();
}

async function getUsersPost() {
  let resPost = await request("GET", usersPost);
  resPost = JSON.parse(resPost.target.response);
  try {
    resPost.forEach(post => {
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
    message.innerHTML = "Request Posts succes";
  } catch {
    message.innerHTML = "Request failed";
  }
}

async function getComment() {
  let resCom = await request("GET", usersComment);
  comResult = JSON.parse(resCom.target.response);
  try {
    let count = 0;
    comResult.forEach(comm => {
      count += comm.postId;
    });
    countCom = count;
  } catch {
    message.innerHTML = "Request failed";
  }
}

function showComment(resultComment) {
  comments.innerHTML = " ";
  resultComment.forEach(comm => {
    const field = document.createElement("p");
    field.classList.add("list-group-item");
    field.classList.add("list-group-item-action");
    field.textContent = comm.name;
    comments.appendChild(field);
  });
  message.innerHTML = "Request Comments succes";
}
