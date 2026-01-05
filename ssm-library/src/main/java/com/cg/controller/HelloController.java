package com.cg.controller;

import com.cg.service.WebSocket;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * name: HelloController
 * Date: 2025/5/6 11:48
 * Description:
 */
@RestController
public class HelloController {

    @Autowired
    private WebSocket webSocket;

    @RequestMapping("/hello")
    public String hello(){
        // 发送一条测试消息到所有连接的客户端
        webSocket.sendMessage("Hello from server via WebSocket!");
        return "Hello, SSM!";
    }
}

