package com.example.prac1.normalService;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class serviceController {

    @RequestMapping(value = "/index")
    public String index(){
        System.out.println("/index request");

        return "index";
    }

}
