package com.example;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class mathTest {

    private static final Logger logger = LoggerFactory.getLogger(mathTest.class);
    public static void main(String[] args){

        long l = (long)(3535 / 1024 / 1024);
        double ceiling = Math.ceil(4.2);
        long ceiling2 = (long)4.2;

        System.out.println(ceiling);
        System.out.println(ceiling2);
        System.out.println(1600/3600);

        Map<String,String> testMap = new HashMap<String, String>();
        boolean mapNotNull = testMap.isEmpty();

        logger.info("mapNotNull : {}",mapNotNull);
        logger.info(testMap.get("nonkey"));

        List test = new ArrayList();

        logger.info("typeof 20f is : {} ", Float.valueOf(20f));

    }

}
