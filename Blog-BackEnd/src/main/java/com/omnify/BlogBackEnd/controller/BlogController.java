package com.omnify.BlogBackEnd.controller;

import com.omnify.BlogBackEnd.model.Blog;
import com.omnify.BlogBackEnd.service.BlogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("blog")
public class BlogController {
    @Autowired private BlogService blogService;
    @GetMapping
    public List<Blog> getData(){
        return blogService.getData();
    }
    @PostMapping
    public void postData(@RequestBody Blog blog){
        blogService.postData(blog);
    }
    @PutMapping("/{id}")
    public void editBlog(@PathVariable int id, @RequestBody Blog blogData) {
        System.out.println(id);
        blogService.changeData(id,blogData);
    }

    @DeleteMapping("/{id}")
    public void deleteBlog(@PathVariable int id) {
        System.out.println("id:"+id);
        blogService.deleteData(id);
    }
}
