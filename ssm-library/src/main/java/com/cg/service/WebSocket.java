package com.cg.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import jakarta.websocket.OnClose;
import jakarta.websocket.OnMessage;
import jakarta.websocket.OnOpen;
import jakarta.websocket.Session;
import jakarta.websocket.server.ServerEndpoint;
import java.util.concurrent.CopyOnWriteArraySet;

@Component
@ServerEndpoint("/webSocket")
@Slf4j
public class WebSocket {
    private Session session;

    // 用于存储所有连接的WebSocket会话
    private static CopyOnWriteArraySet<WebSocket> webSocketSet = new CopyOnWriteArraySet<>();

    @OnOpen
    public void onOpen(Session session) {
        this.session = session;
        webSocketSet.add(this);
        log.info("【WebSocket连接已建立】，Session ID: {}，当前数量：{}", session.getId(), webSocketSet.size());
    }

    @OnClose
    public void onClose() {
        webSocketSet.remove(this);
        log.info("【WebSocket连接已关闭】，Session ID: {}，当前数量：{}", this.session.getId(), webSocketSet.size());
    }

    @OnMessage
    public void onMessage(String message) {
        log.info("【WebSocket收到消息】：{}，来自Session ID: {}", message, this.session.getId());
    }

    // 发送消息给所有连接的客户端
    public void sendMessage(String message) {
        for (WebSocket webSocket : webSocketSet) {
            try {
                webSocket.session.getBasicRemote().sendText(message);
                log.info("【WebSocket发送消息成功】：{}，发送到Session ID: {}", message, webSocket.session.getId());
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
}
