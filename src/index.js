let page = 1;
let commentsPerPage = 0;

function getCommentsList(isRender) {
  document.getElementById("prev").disabled = false;
  document.getElementById("next").disabled = false;
  const URL = isRender ? '/api/comments' : '/api/comments/page/' + page;
  xhr = new XMLHttpRequest();
  xhr.open("get", URL, true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        let data = xhr.responseText;
        data = JSON.parse(data);
        if (data.length > 0) {
          document.getElementById("list").innerHTML = '';
          if (isRender) { commentsPerPage = data.length};
          for (let item in data) {
            let ul = document.createElement("ul");
            for (let i in data[item]) {
              var li = document.createElement('li');
              li.appendChild(document.createTextNode(i == 'id' ? new Date(data[item][i]) : data[item][i]));
              ul.appendChild(li);
            }
            document.getElementById("list").appendChild(ul);
            document.getElementById("page").innerHTML = page;
          }
          document.getElementById("next").disabled = data.length < commentsPerPage;
        } else {
          document.getElementById("next").disabled = true;
          page = page - 1;
        }
        if (page === 1) { document.getElementById("prev").disabled = true; }
      } else {
        alert("요청오류 : " + xhr.status);
      }
    }
  }
  xhr.send(null);
}

document.addEventListener("DOMContentLoaded", function(event) {
  getCommentsList(true);
});

document.getElementById('prev').addEventListener('click', function(event){
  if (page === 1) {
    return;
  } else {
    page = page - 1;
    getCommentsList();
  }
});

document.getElementById('next').addEventListener('click', function(event){
  page = page + 1;
  getCommentsList();
});

document.getElementById('enroll').addEventListener('submit', function(event){
  const sendForm = {
    author: enroll.author.value,
    comment: enroll.comment.value
  }
  if (sendForm.author.length < 1 || sendForm.comment.length < 10) {
    alert("본문은 10자 이상, 이름은 1자 이상 작성하여야 합니다.");
    return;
  } else {
    let url = "/api/comments"; 
    let xhr = new window.XMLHttpRequest();
    xhr.open('POST', url, true)
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
    xhr.send(JSON.stringify(sendForm))
  }
});