var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var sanitizeHtml = require('sanitize-html');
var template = require('../lib/template.js');
var shortid = require('shortid');
var db = require('../lib/db');

module.exports = function (passport) {
  router.get('/login', function (request, response) {
    var fmsg = request.flash();
    var feedback = '';
    if (fmsg.error) {
      feedback = fmsg.error[0];
    }
    var title = 'WEB - login';
    var list = template.list(request.list);
    var html =`
      <!DOCTYPE html>
      <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
      <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
      <script src="https://kit.fontawesome.com/643b7edb9b.js" crossorigin="anonymous"></script>
      <script
      src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.js">
      </script>
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>
      <style>
          body {
            background-color:white;
          }
          ul {
            list-style-type: none;
            margin: 0;
            padding: 0;
            overflow: hidden;
            background-color: #38444d;
          }

          li {
            float: left;
          }

          li a, .dropbtn {
            display: inline-block;
            color: white;
            text-align: center;
            padding: 14px 16px;
            text-decoration: none;
          }

          li a:hover, .dropdown:hover .dropbtn {
            background-color: red;
          }

          li.dropdown {
            display: inline-block;
          }

          .dropdown-content {
            display: none;
            position: absolute;
            background-color: #f9f9f9;
            min-width: 160px;
            box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
            z-index: 1;
          }

          .dropdown-content a {
            color: black;
            padding: 12px 16px;
            text-decoration: none;
            display: block;
            text-align: left;
          }

          .dropdown-content a:hover {background-color: #f1f1f1;}

          .dropdown:hover .dropdown-content {
            display: block;
          }
          div.ex1 {
            width: 600px;
            margin: 100px auto;
            padding: 30px 0px;
            background-color: #a1a9d3;
            border: 3px solid black;
          }
          header {
            display:block;
            padding:2px;
            margin:0;
            top: 0px;
            background-color: #01438f;
          }
      </style>
      <title>invAIST</title>
      </head>
      <body>

      <header>
        <div class ="w3-row">
          <div class ="w3-col s4">
          <p style="color:white">

      &emsp;<i class="fa-solid fa-chart-simple"></i>&nbsp;invAIST</p>
      </div>
      </header>
      <style>
              .price{
                margin:0px;
                font-size: 25px;
              }
              .updown{
                margin:0px;
                padding-bottom: 10px;
              }
              #my-chart.line {
              height: 200px;
              max-width: 400px;
              margin: 0 auto;
            }
            .header_card {
              background-color: #a1a9d3;
              color:white;
            }
            #budget {
              font-size: 23px;
              margin:2px;
            }
        </style>
      <div class="ex1">
        <img src="https://scontent.ficn2-2.fna.fbcdn.net/v/t1.6435-9/171254098_736058853748259_7868857286441811331_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=973b4a&_nc_ohc=LaSUR44QT88AX-YxIs9&_nc_ht=scontent.ficn2-2.fna&oh=00_AfB3Mb4kFcw9vslMVw8PR2ha2N8jkhsMzuSWaSQxn0X-0g&oe=64DD812B"
           alt="Lamp" width="500" style = "border-radius: 30%; margin:0px 45px;text-align:center; background-color:black; opacity:80%;border: 2px solid black;" height="500">

                  <div class="container">
                     <form action="/auth/login_process" method="post">
                      <label>조 번호 </label>
                      <input type="text" name ="email"placeholder="조 번호를 입력하세요.."  required>
                      <label>비밀번호 </label>
                      <input type="password" name ="pwd" placeholder="비밀번호를 입력하세요.." required>
                      <input class="a12" type="submit" value="로그인"></input>
                      <!-- <input type="checkbox" checked="checked"> Remember me -->
                      <!-- <button type="button" class="cancelbtn"> Cancel</button> -->
                      <!-- Forgot <a href="#"> password? </a> -->
                      </form>
                  </div>
             <style>

                    .a12 {
                           background-color: #01438f;
                           width: 100%;
                            color: white;
                            padding: 15px;
                            margin: 10px 0px;
                            border: none;
                            cursor: pointer;
                             }
                     form {
                            border: 3px solid #a1a9d3;
                        }
                     input[type=text], input[type=password] {
                            width: 100%;
                            margin: 8px 0;
                            padding: 12px 20px;
                            display: inline-block;
                            border: 2px #a1a9d3;
                            box-sizing: border-box;
                        }
                     button:hover {
                            opacity: 0.7;
                        }
                      .cancelbtn {
                            width: auto;
                            padding: 10px 18px;
                            margin: 10px 5px;
                        }


                     .container {
                            padding: 25px;
                            background-color: #7282ba;
                        }
            </style>
      </div>

      </body>
      </html>

    `;
    response.send(html);
  });

  router.post('/login_process',
    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/auth/login',
      failureFlash: true,
      successFlash: true
    }));

  router.get('/register', function (request, response) {
    var fmsg = request.flash();
    var feedback = '';
    if (fmsg.error) {
      feedback = fmsg.error[0];
    }
    var title = 'WEB - login';
    var list = template.list(request.list);
    var html = template.HTML(title, list, `
        <div style="color:red;">${feedback}</div>
        <form action="/auth/register_process" method="post">
          <p><input type="text" name="email" placeholder="email" value="egoing7777@gmail.com"></p>
          <p><input type="password" name="pwd" placeholder="password" value="111111"></p>
          <p><input type="password" name="pwd2" placeholder="password" value="111111"></p>
          <p><input type="text" name="displayName" placeholder="display name" value="egoing"></p>
          <p>
            <input type="submit" value="register">
          </p>
        </form>
      `, '');
    response.send(html);
  });

  router.post('/register_process', function (request, response) {
    var post = request.body;
    var email = post.email;
    var pwd = post.pwd;
    var pwd2 = post.pwd2;
    var displayName = post.displayName;
    if(pwd !== pwd2){
      request.flash('error', 'Password must same!');
      response.redirect('/auth/register');
    } else {
      var user = {
        id:shortid.generate(),
        email:email,
        password:pwd,
        displayName:displayName
      };
      db.get('users').push(user).write();
      request.login(user, function(err){
        console.log('redirect');
        return response.redirect('/');
      })
    }
  });

  router.get('/logout', function (request, response) {
    request.logout();
    request.session.save(function () {
      response.redirect('/');
    });
  });

  return router;
}
