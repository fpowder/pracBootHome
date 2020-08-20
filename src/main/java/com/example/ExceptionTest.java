package com.example;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ExceptionTest {

    private static final Logger logger = LoggerFactory.getLogger(ExceptionTest.class);

    public static String exceptProcessTest(){

        String a = null;

        if(a == null){
            logger.error("String a is null : {}");
            //throw new NullPointerException("String a is null");
        }

        String b = "test";
        logger.info("String b is :{}", b);
        return b;
    }

    public static void main(String[] args){
        exceptProcessTest();
    }
}
