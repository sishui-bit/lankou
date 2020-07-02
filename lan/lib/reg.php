<?php
    header("content-type:text/html;charset=utf-8");
    // 一、获取前端发送来的数据（用户名和密码）
    $phone = $_POST["phone"];
    $password = $_POST["password"];

    // 二、连接数据库进行处理（增？？）
    // 1、连接数据库
    $conn = mysqli_connect("localhost","root","root","mydb2001");

    // 2、执行sql语句
    
    $result = mysqli_query($conn,"insert into vip(phone,password) value ('".$phone."','".$password."')");    
    

    // 3、关闭数据库
    mysqli_close($conn);

    // 三、响应(就是使用echo)
    if($result){
        echo "恭喜您，注册成功！请<a href='login(mysqli).html'>登录</a>";
    }else{
        echo "不好意思，注册失败，请重新<a href='demo02reg(mysqli).html'>注册</a>";
    }


?>