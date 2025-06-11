package com.bookapi.book_api.jwt;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.bookapi.book_api.services.LibraryUserDetailsService;

import java.io.IOException;

//This is executed once per HttpRequest
@Component
@Slf4j
@RequiredArgsConstructor
public class AuthTokenFilter extends OncePerRequestFilter {
    @Autowired
    private JwtUtils jwtUtils;
    @Autowired
    private LibraryUserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain) throws ServletException, IOException {
        log.info("Calling Auth token filter for url --> {}", request.getRequestURI());
        // Get the token from header
        String jwtToken = jwtUtils.getJwtDetailsFromHeader(request);
        // Validate the token
        if (jwtToken != null && jwtUtils.validateJwtToken(jwtToken)) {
            // Get the userName
            String userName = jwtUtils.extractUserNameFromJwtToken(jwtToken);
            // Get the userDetails object - username, roles etc from the extracted userName
            UserDetails userDetails = userDetailsService.loadUserByUsername(userName);
            // Manually set authentication token in the request context
            UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
                    userDetails,
                    null, userDetails.getAuthorities());
            log.info("Token Roles extracted from JWT --> {}", userDetails.getAuthorities());
            usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            // At this point user is authenticated and set in the context
            SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
        } else {
            log.info("Jwt token seems invalid. ");
        }
        filterChain.doFilter(request, response);
    }
}