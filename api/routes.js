const express = require('express');
const router = express.Router();
const conn = require('./../db');
const apiKey = 'Ms334ddsMMsdoaMCEO3256ks';
const uuid = require('uuid');


 router.post(`/${apiKey}/createuser`, (req, res) => {
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
  
   router.get(`/${apiKey}/getusers`, (req, res) => {
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
  
  
   router.post(`/${apiKey}/updateuser/:uid`, (req, res) => {
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
  
   router.post(`/${apiKey}/deleteuser`, (req, res) => {
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
  
  
   router.get(`/${apiKey}/getuser/:uid`, (req, res) => {
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
  
   router.get(`/${apiKey}/getposts/:uid`, (req, res) => {
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
  
   router.get(`/${apiKey}/getpost/:id`, (req, res) => {
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
   router.post(`/${apiKey}/createpost`, (req, res) => {
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
  
   router.post(`/${apiKey}/updatepost/:id`, (req, res) => {
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
  
   router.post(`/${apiKey}/deletepost/`, (req, res) => {
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
    
    

  module.exports = router;