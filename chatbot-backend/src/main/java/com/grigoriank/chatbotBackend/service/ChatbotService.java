package com.grigoriank.chatbotBackend.service;

import com.grigoriank.chatbotBackend.dto.response.ApiResponse;

public interface ChatbotService {

    ApiResponse getCoinsDetails(String prompt) throws Exception;

    String simpleChat(String prompt);
}
