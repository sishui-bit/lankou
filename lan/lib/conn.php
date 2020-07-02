<?php
// php语言中提供了以mysql_开头的函数，完成php与数据库之间交互的功能
    // 一、连接数据库（搭桥）    

    $conn =  mysqli_connect("localhost","root","root","mydb2001");


    // 二、执行SQL语句，传输数据（运输）
    $sqlStr = "insert into students(stuId,stuName,stuSex,stuAge) value ('01007','吴汉义','男',15)";

    $result = mysqli_query($conn,$sqlStr);

    // 三、断开连接（过河拆桥）
    mysqli_close($conn);

?>