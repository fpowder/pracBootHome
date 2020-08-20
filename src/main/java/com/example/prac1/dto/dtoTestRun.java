package com.example.prac1.dto;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class dtoTestRun {
    private static final Logger logger = LoggerFactory.getLogger(dtoTestRun.class);
    public static void main(String[] args){

        UserInfo userInfo = new UserInfo();

        logger.info("userInfo : {} ", userInfo);

    }

}
