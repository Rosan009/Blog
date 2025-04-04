package com.omnify.Blog_BackEnd.service;

import com.omnify.Blog_BackEnd.model.User;
import com.omnify.Blog_BackEnd.model.UserPrincipal;
import com.omnify.Blog_BackEnd.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

public class UserService implements UserDetailsService {
    @Autowired
    private UserRepo repo;
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User userDetail=repo.findByEmail(email);

        if (userDetail == null) {
            throw new UsernameNotFoundException(email);  // Exception if email is not found
        }
        return new UserPrincipal(userDetail);
    }

    public void addUser(User userDetail) {

    }
}
