const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http');
const server = http.createServer(app);
const port =  process.env.port || 5000;
const uuid = require('uuid');
const conn = require('./db');
const path = require('path');

const apiKey = 'Ms334ddsMMsdoaMCEO3256ks';

app.use(cors());
app.use(express.json());

server.listen(port, () => {
    console.log('server listen on port: ' + port);
});

app.use(express.static(path.join(__dirname, './public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.post(`/${apiKey}/apis/createuser`, (req, res) => {
  const user_uid = uuid.v4().substring(0, 8);
  console.log(req.body);
  const {user_name, user_profile, user_password, user_batch} = req.body;
    conn.query("INSERT INTO tbl_users SET ?", {user_uid,user_name,user_profile,user_password,user_batch}, (err, result) => {
        if(err){
          res.send({
            status: false,
            message: 'user not created'
          })
        }else{
        res.send({
          status: true,
          message: 'user successfully created'
        });
      }
    });
    console.log("data saved...");
});

app.get(`/${apiKey}/apis/getusers`, (req, res) => {
  conn.query("SELECT * FROM tbl_users", (err, result) => {
    if(err){
      res.send({status: false, message: 'users data not get', data: []})
    }else{
      res.send({
        status: true,
        message: 'users data',
        data: result
      });
    }
  });
});


app.post(`/${apiKey}/apis/updateuser/:uid`, (req, res) => {
  const { uid } = req.params;
  const {user_name, user_password, user_batch} = req.body;
    conn.query("UPDATE tbl_users SET ? WHERE user_uid = ?", [{user_name, user_password, user_batch}, uid], (err, result) => {
        if(err){
          res.send({
            status: false,
            message: 'user not update'
          })
        }else{
        res.send({
          status: true,
          message: 'user successfully update'
        });
      }
    });
    console.log("data updated...");
});

app.post(`/${apiKey}/apis/deleteuser`, (req, res) => {
  const { uid } = req.body;
    conn.query(`DELETE FROM tbl_users WHERE user_uid='${uid}'`, (err, result) => {
        if(err){
          console.log(err);
          res.send({
            status: false,
            message: `user error: ${err}`
          })
        }else{
        res.send({
          status: true,
          message: 'user successfully deleted'
        });
      }
    });
    console.log("user deleted...");
});


app.get(`/${apiKey}/apis/getuser/:uid`, (req, res) => {
  const { uid } = req.params;
  conn.query(`SELECT * FROM tbl_users WHERE user_uid='${uid}'`, (err, result) => {
    if(err){
      res.send({status: false, message: 'user data not get', data: []})
    }else{
      res.send({
        status: true,
        message: 'single user data',
        data: result
      });
    }
  });
  console.log("request get");
});

app.get(`/${apiKey}/apis/getposts/:uid`, (req, res) => {
  const { uid } = req.params;
  conn.query(`SELECT id,user_uid,post_title,date FROM tbl_posts WHERE user_uid='${uid}' ORDER BY id DESC`, (err, result) => {
    if(err){
      res.send({status: false, message: `${err}`, data: []})
    }else{
      res.send({status: true, message: 'single user get posts list', data: result})
    }
  });
  console.log("get posts");
});

// get single post

app.get(`/${apiKey}/apis/getpost/:id`, (req, res) => {
  const id = req.params.id;
  conn.query(`SELECT post_content from tbl_posts WHERE id='${id}'`, (err, result) => {
    if(err){
      res.send({status: false, message: `${err}`, data: []})
    }else{
      res.send({status: true, message: 'single user get posts data', data: result})
    }
  });
  console.log("get single post");
});

// create post
app.post(`/${apiKey}/apis/createpost`, (req, res) => {
  console.log(req.body);
  const {user_uid, post_title, post_content} = req.body;
    conn.query("INSERT INTO tbl_posts SET ?", {user_uid, post_title, post_content}, (err, result) => {
        if(err){
          res.send({
            status: false,
            message: `${err}`
          })
        }else{
        res.send({
          status: true,
          message: 'post successfully upload'
        });
      }
    });
    console.log("post created...");
});

app.post(`/${apiKey}/apis/updatepost/:id`, (req, res) => {
  const { id } = req.params;
  const {user_uid, post_title, post_content} = req.body;
    conn.query("UPDATE tbl_posts SET ? WHERE id = ?", [{user_uid, post_title, post_content},id], (err, result) => {
        if(err){
          res.send({
            status: false,
            message: `post error: ${err}`
          })
        }else{
        res.send({
          status: true,
          message: 'post successfully update'
        });
      }
    });
    console.log("post updated...");
});

app.post(`/${apiKey}/apis/deletepost/`, (req, res) => {
  const { id } = req.body;
    conn.query(`DELETE FROM tbl_posts WHERE id='${id}'`, (err, result) => {
        if(err){
          console.log(err);
          res.send({
            status: false,
            message: `post error: ${err}`
          })
        }else{
        res.send({
          status: true,
          message: 'post successfully deleted'
        });
      }
    });
    console.log("post deleted...");
});
  
  