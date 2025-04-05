package com.omnify.BlogBackEnd.repo;

import com.omnify.BlogBackEnd.model.Blog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BlogRepo extends JpaRepository<Blog,Integer> {
}
