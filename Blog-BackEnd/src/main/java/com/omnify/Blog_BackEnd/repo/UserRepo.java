package com.omnify.Blog_BackEnd.repo;

import com.omnify.Blog_BackEnd.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepo extends JpaRepository<User,Integer> {
    User findByEmail(String email);
}
