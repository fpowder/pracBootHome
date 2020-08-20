package com.example;

import java.security.SecureRandom;
import java.util.Random;

public class RandomTest {

    public static void main(String[] args) {

        String charset = "0123456789abcdefghijklmnopqrstuvwxyz!@#$";

        Random random = new Random();
        long i = random.nextInt(300000) + 60000;
        System.out.println("long i = " + i);

        SecureRandom secureRandom = new SecureRandom();
        long si = secureRandom.nextInt(300000) +60000;
        System.out.println("long si = "+si);


        Random random3 = new Random(System.currentTimeMillis());
        int pos = random.nextInt(charset.length());
        System.out.println("pos : "+pos);


        Random random2 = new Random(System.currentTimeMillis());
        System.out.println("System.currentTimeMillis() : "+ System.currentTimeMillis());
        int i2 = random2.nextInt(charset.length());
        System.out.println("int i2 : "+i2);

    }

}
