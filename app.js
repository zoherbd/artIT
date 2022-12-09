const http = require('http');
const fs = require('fs'); 
var mysql = require('mysql');
var formidable = require('formidable');
const PORT = process.env.PORT || 3000;

const hostname = '127.0.0.1'; 
const port = 3000; 

var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '',
    database: 'IT',
    multipleStatements: true
    });

// Creating a server
const server = http.createServer((request, response) => {
  let url = request.url;
  if(url === '/') { 
    mysqlConnection.query('SELECT * FROM article', (err, rows, fields) => {
      if (!err){
        let res = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Articles of the Faculty of Informatics Engineering</title>
          <style>
            body{
              background-color:#273746; 
              text-align: center;
            }
            ul{
              list-style: none;
            }
            li{
              padding-bottom: 10px;
            }
            h1{
              color: cornsilk;
            }
            h3{
              color: rgb(180, 180, 180);
            }
            a{
              color: blanchedalmond;
              text-decoration: none;
            }
            .btrn{
              color: hsl(0, 0%, 51%);
            }
          </style>
        </head>
        <body>
          <h1 dir="rtl"> كلية هندسة المعلوماتية</h1>
          <h3 dir="rtl">عناوين المقالات</h3>
        `
        for(var i=0 ; i<rows.length ;i++){
          res+=`<ul dir='rtl'><li><a href='/article_d/`+rows[i].id+`' target='_blank'>`+rows[i].title+`</a></li></ul>`
        }
        res+=`<div dir="rtl"><a href='/add' target="_blank" class="btrn">Add Article</a></div>
        <div dir="rtl"><a href='/articles'>List all article </a></div><div dir="rlt"><a href='/users'>users</a></div>
      </body>
      </html>`
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.end(res)
      }else{
        consloe.log(err);
      }
    })
  }else if(url ==='/articles'){
    mysqlConnection.query('SELECT * FROM article', (err, rows, fields) => {
      if (!err){
        let res = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <title>All Articles</title>
            <style>
              .container_table{
                width: auto;
                min-height: 100vh;
                background: #c4d3f6;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-wrap: wrap;
                padding: 33px 30px;
                }
              .warp_table{
                width: 960px;
                border-radius: 22px;
                overflow: hidden;
              }
              .top , .home{
                width: 100%;
                background: #c4d3f6;
                display: flex;
                align-items: center;
                justify-content: center;
              }
              th{
                color: #fff;
                background: #6c7ae0;
              }
              td{
                font-family: Poppins-Regular;
                font-size: 15px;
                color: #666;
                background-color: #ffff;
                line-height: 1.2;
                font-weight: unset!important;
                padding-top: 20px;
                padding-bottom: 20px;
                border-bottom: 2.5px solid #6c7ae0;
              }
              a{
                color: #5D6D7E;
                text-decoration: none;
              }
            </style>
          </head>
          <body>
            <div class="top">
              <h1>All Articles</h1>
            </div>
            <div class="home">
              <a href ="/" >Return Home</a>
            </div>
            <div class="container_table">
              <div class="warp_table">
              <table>
                <tr>
                  <th> Title </th>
                  <th> Author </th>
                  <th> Abstract </th>
                  <th> Link </th>
                  <th> Delete </th>
                  <th> Update </th>
                </tr>
        `
        for (var i = 0; i < rows.length; i++) {
            res +="<tr ><td dir='rtl'>"
                  + rows[i].title 
                  + "</td><td dir='rtl'>"
                  + rows[i].authors
                  + "</td><td>"
                  + rows[i].abstract
                  + "</td><td>"
                  + rows[i].link
                  + "</td><td><a href='/article/delete/"
                  + rows[i].authentication_code
                  + "'>Delete</a></td><td><a href='/article/update/"
                  + rows[i].authentication_code
                  + "'>Update</a></td></tr>"
        }
        res += "</table></div></div></body></html>"
        response.statusCode = 200;
        response.setHeader('Content-Type', 'text/html');
        response.end(res)
      }else {
        console.log(err);
      }
    })
  }else if(url.startsWith('/article_d')){
    let split_url = url.split("/")
    let article_authen = split_url[split_url.length - 1]
    mysqlConnection.query('SELECT * FROM article where id = '+article_authen , (err, rows, fields) => {
      if (!err){
        let res = `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8">
            <title>Article details</title>
            <style>
              body{
                background-color: #212F3C;
                color: #AEB6BF;
              }
              a{
                color: #D0D3D4;
                text-decoration: none;
              }
            </style>
          </head>
          <body>
            <div><a href ="/" >Return Home</a></div>
            <h1 dir="rtl">المقالة المختارة</h1>
            `
            for(var i =0 ; i<rows.length;i++)
            {res+=`<h3>the title : `+ rows[i].title +` </h3>
            <h4>Authors' names : `+ rows[i].authors + ` </h4>
            <h5>  abstract : </h5>
            <p> `+ rows[i].abstract +` </p>
            <div>download : `+ rows[i].link +` </div>
            <div>
            <a href='/article/delete/`+rows[i].authentication_code +`'>Delete</a>
            <a href='/article/update/`+rows[i].authentication_code +`'>Update</a>`
            }
            res+=`</div></body></html>`
        response.statusCode = 200;
        response.setHeader('Content-Type', 'text/html');
        response.end(res)
      }else {
        console.log(err);
      }
    })
  }else if(url.startsWith("/article/delete/")){
    let split_url = url.split("/")
    let article_authen = split_url[split_url.length - 1]
    let res=
    `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Delete Article</title>
      <style>
        body{
          background-color: #283747;
        }
        .btn_2{
          padding: 5px 15px;
          background: #ccc;
          border: 0 none;
          cursor: pointer;
          border-radius: 5px;
        }
        a{
          color: #D0D3D4;
          text-decoration: none;
        }
      </style>
    </head>
    <body>
      <div><a href ="/" >Return Home</a>
      <form action="/delete_article/`+article_authen+`" method="post">
        <input type="text" name="de_ar" id="de_ar" placeholder="*enter the authentication code" required>
        <div>
          <input class="btn_2" type="submit" value="click">
        </div>
      </form>
    </body>
    </html>`
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/html');
    response.end(res);
  }else if(url.startsWith('/delete_article') ){
    let split_url = url.split("/")
    let article_authen = split_url[split_url.length - 1]
    var form = new formidable.IncomingForm();
    form.parse(request, function (err, fields, files) {
      if(fields.de_ar == article_authen)
      {
        mysqlConnection.query('DELETE FROM article WHERE authentication_code=' + article_authen, (err, rows, fields) => {
          if (!err){
              response.statusCode = 302;
              response.setHeader('Location', '/articles');
              response.end()
          }else {
            console.log(err);
          }
          })
      }
      else{
        response.statusCode = 200;
      response.setHeader('Content-Type', 'text/html');
      response.end("the authentication code is wrong");
      }
    });
  }else if(url.startsWith("/article/update/")){
    let split_url = url.split("/")
    let article_authen = split_url[split_url.length - 1]
    mysqlConnection.query('SELECT * FROM article where authentication_code='+article_authen, (err, rows, fields) => {
      if (!err){
        let res=`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Update Article</title>
          <style>
            body{
              background-color: #283747;
            }
            .btn_1{
              padding: 5px 15px;
              background: #ccc;
              border: 0 none;
              cursor: pointer;
              border-radius: 5px;
            }
              a{
              color: #D0D3D4;
              text-decoration: none;
            }
          </style>
        </head>
        <body>
          <div><a href ="/" >Return Home</a></div>
          <form action="/update_article/`+article_authen+`" method="post">
            <h3 style="color: red;">If you do not know the authentication code, do not attempt the modification</h3>
        `    
        for (var i = 0; i < rows.length; i++)
          {
            res+=`<textarea name="upte_ti" id="upte_ti" cols="30" rows="1" required>`+rows[i].title+`</textarea></br>
            <textarea name="upte_au" id="upte_au" cols="30" rows="1" required>`+rows[i].authors+`</textarea></br>
            <textarea name="upte_ab" id="upte_ab" cols="30" rows="10" required>`+rows[i].abstract+`</textarea></br>
            <textarea name="upte_li" id="upte_li" cols="30" rows="1" required>`+rows[i].link+`</textarea></br>
            `
          }
        res+=
            `<input type="text" name="up_ar" id="de_ar" placeholder="*enter the authentication code" required></br>
            <div>
              <input class="btn_1" type="submit" value="click">
            </div>
          </form>
        </body>
        </html>`
        response.statusCode = 200;
        response.setHeader('Content-Type', 'text/html');
        response.end(res);
      }else {
    console.log(err);
      }
    })
  }else if(url.startsWith('/update_article') ){
    let split_url = url.split("/")
    let article_authen = split_url[split_url.length - 1]
    var form = new formidable.IncomingForm();
    form.parse(request, function (err, fields, files) {
      if(fields.up_ar == article_authen)
      {
        mysqlConnection.query('UPDATE article SET title = "'+fields.upte_ti+'" , authors= "'+fields.upte_au+'" , abstract = "'+fields.upte_ab+'", link="'+fields.upte_li+'" WHERE authentication_code=' + article_authen , (err, rows, fields) => {
          if (!err){
            response.statusCode = 302;
            response.setHeader('Location', '/articles');
            response.end()
          }else {
            console.log(err);
          }
          })
      }
      else{
        response.statusCode = 200;
        response.setHeader('Content-Type', 'text/html');
        response.end("the authentication code is wrong");
      }
    });
  }else if(url ==='/add') {
    response.writeHead(200, {'Content-Type': 'text/html'});
    fs.readFile('pages/add_article.html', null, function (error, data) {
      if (error) {
        response.writeHead(404);
        response.write('Whoops! Page not found!');
      }else {
        response.write(data);
      }
      response.end();
    });
  }else if(url === '/add_handler'){
    var form = new formidable.IncomingForm();
    form.parse(request, function (err, fields, files) {
      let query = "INSERT INTO article (title, authors, abstract, link , authentication_code) VALUES (?, ?, ?, ?,?);";
      let values_to_insert = [
        fields.title,
        fields.Authors,
        fields.abstract,
        fields.link,
        fields.authentication_code
      ]
      mysqlConnection.query(query, values_to_insert, (err, rows) => {
          if (err) throw err;
      });
      response.statusCode = 302; //Redirecting the article to the articles page
      response.setHeader('Location', '/articles');
      response.end();
    });
  }else if(url=='/users'){
    let res = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Login</title>
      <style>
      body{
        background-color:#273746; 
        text-align: center;
      }
      a{
        color: #D0D3D4;
        text-decoration: none;
      }
      </style>
    </head>
    <body>
      <div><a href ="/" >Return Home</a></div>
      <form action="/authen_code" method="post">
        <input type="text" name="us" id="us" placeholder="enter user name" required>
        <input type="password" name="pa" id="pa" placeholder="enter your password" required>
        <input type="submit" value="Login">
      </form>
    </body>
    </html>
    `
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/html');
    response.end(res);
  }else if (url.startsWith('/authen_code')){
    var form = new formidable.IncomingForm();
    form.parse(request, function (err, fields, files) {
      mysqlConnection.query('SELECT * FROM users where username ="'+fields.us+'"', (err, rows, fiellds) => {
        if(!err){
          for(var i=0 ; i<rows.length ;i++)
          if(fields.pa == rows[i].password){
            mysqlConnection.query('SELECT * FROM article' , (err, rows, fields) => {
            if (!err){
              let res=`<!DOCTYPE html>
              <html lang="en">
              <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>artile for authen code</title>
                <style>
                body{
                  background-color:#273746; 
                  text-align: center;
                }
                table{
                  border-collapse: collapse;
                  line-height: 2;
                }
                .tab{
                  width: auto;
                  min-height: 100vh;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  flex-wrap: wrap;
                  padding: 33px 30px;
                }
                a{
                  color: #D0D3D4;
                  text-decoration: none;
                }
                th{
                  padding: 10px;
                  font-weight: inherit;
                  position: relative;
                  color: #111111;
                  background-color: #adcce9;
                }
                td{
                  padding: 10px;
                  font-weight: inherit;
                  position: relative;
                  color: #111111;
                }
                tr:nth-child(odd){
                  background-color: #ffffff;
                }
                tr:nth-child(even){
                  background-color: #e9f2fa;
                }

                </style>
              </head>
              <body>
                <div><a href ="/" >Return Home</a></div>  
                <div class ='tab'>
                <table>
                    <tr>
                    <th>Title</th>
                    <th>Authen code</th>
                    </tr>
              `
              for(var i=0 ; i<rows.length ; i++){
                res+=`<tr><td  dir='rtl'>`
                +rows[i].title
                +`</td><td dir='rtl'>`
                +rows[i].authentication_code
                +`</td></tr>`
              }
              res+=`</div></table></body></html>`
              response.statusCode = 200;
              response.setHeader('Content-Type', 'text/html');
              response.end(res)
            }else {
              console.log(err);
            }
          })
        }
          else{
            response.statusCode = 200;
            response.setHeader('Content-Type', 'text/html');
            response.end("the password is worng!")
          }
        }
      else{
          console.log(err);
        }
      })
    });
  }else { // If the article entered a page that doesn't exist, send the 'page not found' response
    response.statusCode = 404;
    response.setHeader('Content-Type', 'text/html');
    response.end(`<div style="color: red;">Whoops! Page not found!</div>
                  <div><a href="/">Return home</a></div>`);
  }
});

  // Running the server
server.listen(port,  () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
