// src/main/java/com/amine/backend/config/SecurityConfig.java
package com.amine.backend.config;

import com.amine.backend.security.AuthTokenFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.*;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.*;

import java.util.List;

@Configuration
public class SecurityConfig {

    @Autowired
    private UserDetailsService userDetailsSvc;

    @Autowired
    private AuthTokenFilter authFilter;

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        var provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(userDetailsSvc);
        provider.setPasswordEncoder(passwordEncoder());
        return provider;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                // 1) Enable CORS (uses corsConfigurationSource())
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                // 2) Disable CSRF (we're stateless & using JWT)
                .csrf(csrf -> csrf.disable())
                // 3) Stateless session management
                .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                // 4) URL rules
                .authorizeHttpRequests(auth -> auth
                        // allow pre-flight OPTIONs
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                        // open auth endpoints
                        .requestMatchers("/api/auth/**").permitAll()
                        // everything else under /api/tasks requires authentication
                        .requestMatchers("/api/tasks/**").authenticated()
                )
                // 5) Hook in our DAO provider & JWT filter
                .authenticationProvider(authenticationProvider())
                .addFilterBefore(authFilter, UsernamePasswordAuthenticationFilter.class)
        ;

        return http.build();
    }

    /**
     * CORS configuration so your React dev server at http://localhost:4173
     * can talk to this backend.
     */
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        var cfg = new CorsConfiguration();
        cfg.setAllowedOrigins(List.of("http://localhost:4173"));  // your front-end origin
        cfg.setAllowedMethods(List.of("GET","POST","PUT","DELETE","OPTIONS"));
        cfg.setAllowedHeaders(List.of("*"));
        cfg.setAllowCredentials(true);

        var source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", cfg);
        return source;
    }

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration authConfig
    ) throws Exception {
        return authConfig.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
