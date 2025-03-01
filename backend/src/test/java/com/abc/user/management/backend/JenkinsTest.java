package com.abc.user.management.backend;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class JenkinsTest {

    @Test
    void testJenkinsBuild() {
        System.out.println("Running Jenkins build test");
        assertEquals(4, 2+2);
    }
}
