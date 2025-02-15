package com.chat.websocket.controller;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ChatController {

    @GetMapping("/ws-test")
    public String testWebSocket() {
        return "WebSocket connection is active!";
    }
}
