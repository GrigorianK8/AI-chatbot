package com.grigoriank.chatbotBackend.controller;

import com.grigoriank.chatbotBackend.dto.PromptBodyDto;
import com.grigoriank.chatbotBackend.dto.response.ApiResponse;
import com.grigoriank.chatbotBackend.service.ChatbotService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/ai/chat")
public class ChatbotController {

    private final ChatbotService chatbotService;

    @PostMapping
    public ResponseEntity<ApiResponse> getCoinDetails(@RequestBody PromptBodyDto prompt) throws Exception {
        ApiResponse response = chatbotService.getCoinsDetails(prompt.getPrompt());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/simple")
    public ResponseEntity<String> simpleChatHandler(@RequestBody PromptBodyDto prompt) {
        String response = chatbotService.simpleChat(prompt.getPrompt());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
