package com.abc.user.management.backend;

import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.Test;

class JenkinsTest {

    @Test
    void testJenkinsBuild() {
        System.out.println("Running Jenkins build test");
        assertEquals(6, 4+3);
    }
}
