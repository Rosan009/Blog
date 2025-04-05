package com.omnify.BlogBackEnd.repo;

import com.omnify.BlogBackEnd.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepo extends JpaRepository<User,Integer> {
    User findByEmail(String email);
}
