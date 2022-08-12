package com.advancia.jwt.payload.response;

import com.advancia.jwt.model.User;

public class MessageResponse {
	private String message;
	private Boolean status;
	private User user;

	public MessageResponse(String message, Boolean status, User user) {
		this.message = message;
		this.status = status;
		this.user = user;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public Boolean getStatus() {
		return status;
	}

	public void setStatus(Boolean status) {
		this.status = status;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
	
}
