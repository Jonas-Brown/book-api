package com.bookapi.book_api.config;

import com.bookapi.book_api.jwt.AuthTokenFilter;
import com.bookapi.book_api.services.LibraryUserDetailsService;

import lombok.RequiredArgsConstructor;

// import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

// import javax.sql.DataSource;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    // private final DataSource dataSource;
    private final CustomAuthenticationEntryPoint customAuthenticationEntryPoint;
    private final LibraryUserDetailsService libraryUserDetailsService;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        // types of filters
        /**
         * CsrfFilter Added by HttpSecurity#csrf
         * UsernamePasswordAuthenticationFilter Added by HttpSecurity#formLogin
         * BasicAuthenticationFilter Added by HttpSecurity#httpBasic
         * AuthorizationFilter Added by HttpSecurity#authorizationHttpRequests
         */
        /*
         * http.csrf(Customizer.withDefaults())
         * .authorizeHttpRequests(authorize -> authorize.anyRequest().authenticated())
         * .httpBasic(Customizer.withDefaults())
         * .formLogin(Customizer.withDefaults())
         * ;
         */

        /*
         * http.csrf(Customizer.withDefaults())
         * .authorizeHttpRequests(authorize -> authorize
         * .requestMatchers("/hello").permitAll()
         * 
         * .anyRequest().authenticated())
         * .httpBasic(Customizer.withDefaults())
         * .formLogin(Customizer.withDefaults())
         * ;
         */
        // authorizes /hello and /authenticate and then runs them through auth filter
        http.csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers("/auth").permitAll()
                        .requestMatchers("/register").permitAll()
                        .anyRequest().authenticated())

                .httpBasic(Customizer.withDefaults())
                .formLogin(Customizer.withDefaults())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .exceptionHandling(exception -> exception.authenticationEntryPoint(customAuthenticationEntryPoint))
                .addFilterBefore(authTokenFilter(), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    // is a bean but annotated as such under libraryUserDetails
    public UserDetailsService userDetailsService() {
        return libraryUserDetailsService;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthTokenFilter authTokenFilter() {
        return new AuthTokenFilter();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }
}