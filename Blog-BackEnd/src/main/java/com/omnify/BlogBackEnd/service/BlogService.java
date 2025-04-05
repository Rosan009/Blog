package com.omnify.BlogBackEnd.service;

import com.omnify.BlogBackEnd.model.Blog;
import com.omnify.BlogBackEnd.repo.BlogRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BlogService {
    @Autowired private BlogRepo blogRepo;
    public List<Blog> getData() {
        return blogRepo.findAll();
    }

    public void postData(Blog blog){
        blogRepo.save(blog);
    }

    public void changeData(int id, Blog blogData) {
        Optional<Blog> blog=blogRepo.findById(id);

        Blog blog1=blog.get();
        blog1.setAuthor(blogData.getAuthor());
        blog1.setTitle(blogData.getTitle());
        blog1.setContent(blogData.getContent());
        System.out.println("data"+blog1);
        blogRepo.save(blog1);
    }

    public void deleteData(int id) {
        blogRepo.deleteById(id);
    }
}
