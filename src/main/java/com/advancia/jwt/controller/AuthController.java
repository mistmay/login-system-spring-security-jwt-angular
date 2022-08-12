package com.advancia.jwt.controller;

import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.advancia.jwt.model.User;
import com.advancia.jwt.payload.request.LoginRequest;
import com.advancia.jwt.payload.request.SignupRequest;
import com.advancia.jwt.payload.response.MessageResponse;
import com.advancia.jwt.repository.UserRepository;
import com.advancia.jwt.security.jwt.JwtUtils;
import com.advancia.jwt.security.service.UserDetailsServiceImpl;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/auth")
public class AuthController {
	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	UserRepository userRepository;

	@Autowired
	PasswordEncoder encoder;

	@Autowired
	private UserDetailsServiceImpl userDetailsService;

	@Autowired
	JwtUtils jwtUtils;
	

	@PostMapping("/login")
	public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
		try {
		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
		SecurityContextHolder.getContext().setAuthentication(authentication);
		final UserDetails userDetails = userDetailsService.loadUserByUsername(loginRequest.getUsername());
		User user = userRepository.findByUsernameAndPassword(userDetails.getUsername(), userDetails.getPassword()).get();
		final String token = jwtUtils.generateTokenFromUsername(userDetails.getUsername());
		return ResponseEntity.ok(new MessageResponse(token, true, user));
		} catch (Exception e) {
			return ResponseEntity.ok(new MessageResponse("User or password not correct", false, null));
		}
	}

	@PostMapping("/register")
	public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
		if (userRepository.existsByUsername(signUpRequest.getUsername())) {
			return ResponseEntity.ok(new MessageResponse("Error: Username is already taken!", false, null));
		}
		if (userRepository.existsByEmail(signUpRequest.getEmail())) {
			return ResponseEntity.ok(new MessageResponse("Error: Email is already in use!", false, null));
		}
		User user = new User(signUpRequest.getUsername(), signUpRequest.getEmail(),
				encoder.encode(signUpRequest.getPassword()));
		userRepository.save(user);
		return ResponseEntity.ok(new MessageResponse("User registered successfully!", true, user));
	}
	
	@GetMapping("/istokenexpired/{token}")
	public ResponseEntity<Boolean> isTokenExpired(@PathVariable("token") String token) {
		try {
			return new ResponseEntity<>(jwtUtils.isTokenExpired(token), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}
