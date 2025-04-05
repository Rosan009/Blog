package com.omnify.BlogBackEnd.service;

import com.omnify.BlogBackEnd.model.User;
import com.omnify.BlogBackEnd.model.UserPrincipal;
import com.omnify.BlogBackEnd.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService implements UserDetailsService {
    @Autowired
    private UserRepo repo;
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User userDetail=repo.findByEmail(email);

        if (userDetail == null) {
            throw new UsernameNotFoundException(email);
        }
        return new UserPrincipal(userDetail);
    }

    public void addUser(User user) {
        user.setPassword(new BCryptPasswordEncoder(12).encode(user.getPassword()));
           repo.save(user);
    }
}
