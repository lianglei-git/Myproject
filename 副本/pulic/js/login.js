// post  ajax
function aPost(url, data, callback) {
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      callback && callback(xhr.responseText);
    }
  }
  xhr.open('POST', url);
  let newData = Object.keys(data).map(key => key + '=' + data[key]).join('&');
  // console.log(newData);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.send(newData);
}


// 注册按钮
register.onclick = function () {
  var user = username.value;
  var pass = password.value;

  aPost('/api/v1/register', {
    "zhanghao": user,
    "mima": pass
  }, function (data) {
    var data = JSON.parse(data);
    alert(data.title)
    console.log(data)
  })
}

// 登陆按钮
login.onclick = function () {
  var user = username.value;
  var pass = password.value;

  aPost('/api/v1/login', {
    "zhanghao": user,
    "mima": pass
  }, function (data) {
    var data = JSON.parse(data);
    location.href = data.redirect;
    localStorage.setItem("userid", data.id)
    alert(data.title)
  });

}