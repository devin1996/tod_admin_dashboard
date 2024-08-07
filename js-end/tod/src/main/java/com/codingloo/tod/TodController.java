package com.codingloo.tod;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TodController {

    @RequestMapping("/hello")
    public String hello(){
        return "Hello! Welcome to TOD";
    }


}
