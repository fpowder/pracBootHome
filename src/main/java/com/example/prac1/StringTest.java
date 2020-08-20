package com.example.prac1;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class StringTest {

    public static void main(String[] args){

        Logger logger = LoggerFactory.getLogger(StringTest.class);

        Integer i = new Integer(2);

        String isEmptyCheck = "sdsdsd";
        String isEmptyCheck2 = "";
        String isEmptyCheck3;

        logger.info("String empty ??  : {}", isEmptyCheck.isEmpty());
        logger.info("String empty ??  : {}", isEmptyCheck2.isEmpty());
        //logger.info("String empty ??  : {}", isEmptyCheck3);


    }

}
