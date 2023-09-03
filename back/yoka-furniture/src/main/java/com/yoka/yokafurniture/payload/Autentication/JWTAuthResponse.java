package com.yoka.yokafurniture.payload.Autentication;

public class JWTAuthResponse {

    private String accessToken;
    private UserResponse userResponse;
    private String tokenType = "Bearer";

    public JWTAuthResponse(String accessToken, UserResponse userResponse) {
        this.accessToken = accessToken;
        this.userResponse = userResponse;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public String getTokenType() {
        return tokenType;
    }

    public void setTokenType(String tokenType) {
        this.tokenType = tokenType;
    }

    public UserResponse getUserResponse() {
        return userResponse;
    }

    public void setUserResponse(UserResponse userResponse) {
        this.userResponse = userResponse;
    }
}
