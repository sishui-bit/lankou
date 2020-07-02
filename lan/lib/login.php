<?php
    header("content-type:text/html;charset=utf-8");
    // 一、接收前端的数据
    $phone = $_POST['phone'];
    $userpass = $_POST['userpass'];


    // 二、处理（连接数据库，进行查询）
    // 1、连接数据库
    $conn = mysqli_connect("localhost","root","root","mydb2001");

    // 2、执行sql语句
    // 执行查询语句的返回值是个表格
    // $result = mysqli_query($conn,"select * from user where phone='{$phone}' and userpass='{$userpass}'");
    $sql = "select * from user";

    // 执行sql语句 query()
    // 使用query()方法 执行查询时 获得到的结果  叫 结果集
    $result = $mysqli->query($sql);

    // 3、关闭数据库
     


    // 三、响应结果
    // mysqli_fetch_all()函数：把结果进行转换
    // $arr = mysqli_fetch_all($result);
    $arr = array(); // 定义一个空数组
    while($row = $result->fetch_assoc()){ // 循环从结果集中获取一条数据
        array_push($arr,$row);
    }

    // var_dump($arr);
    $json = json_encode($arr);
    echo $json;
 
    if(count($arr)==1){
        echo "亲，恭喜您，登录成功！去<a href='index.html'>主页</a>";
    }else{
        echo "登录失败，用户名或者密码错误，请重新<a href='login.html'>登录</a>";
    }

?>