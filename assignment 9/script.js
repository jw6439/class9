window.onload = function() { // 等页面加载完毕，执行下面代码

      // fetch
      let list = document.getElementById('list'); // 获取id为list的元素
      let html = ''; // 定义html变量，默认为空字符

      // 使用ajax（fetch）请求书籍apis，获取书籍数据
      fetch('https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=uFlOT6eRtzi0SAHwi0tR7nQSPpKbIkdd')
      
      .then(response => response.json()) 
      .then(function(res) {
          console.log(res)
          if(res.status == "OK") { // 接口响应成功
            let books = res.results.books; // 获取书籍数组
            books.forEach(function(item, index) { // 遍历书籍数组
              // 字符串拼接html
              html += '<li>'
              html += '<div class="img">'
              html += '<img src="'+item.book_image+'" width="100" height="100">'
              html += '</div>'
              html += '<div class="des">'
              html += '<h2>'+item.title+'</h2>'
              html += '<h3>'+item.author+'</h3>'
              html += '<p>'+item.description+'</p>'
              html += '</div>'
              html += '</li>'
            })
            list.innerHTML = html; // 把html字符串放到list元素里，展示书籍列表
          }
      })
      .catch(err => console.log('Request Failed', err)); // 请求报错，显示报错信息

      // search books
      let search = document.getElementById('search'); // 获取输入框元素
      let btn = document.getElementById('btn'); // 获取搜索按钮

      btn.onclick = function() { // 点击搜索按钮事件
        
        let val = search.value; // 获取搜索框的值
        
        let lis = list.getElementsByTagName('li'); // 获取书籍列表的每项
        for(var i = 0; i < lis.length; i++) { // 通过for循环遍历数组
          var title = lis[i].getElementsByTagName('h2')[0]; // 获取h2元素
          title = title.innerHTML.toUpperCase(); // 统一转为大写字母
          console.log(title) 
          if(title.indexOf(val.toUpperCase()) != -1) { // 判断当前书籍名称是否为输入框搜索的一致
            lis[i].style.display = 'flex'; // 如果搜索到了，那么设置他的display属性为flex
          } else { // 否则
            if(val != '') {
              lis[i].style.display = 'none'; // 设置他的display属性为none
            }
            
          }
        }
      }

    }