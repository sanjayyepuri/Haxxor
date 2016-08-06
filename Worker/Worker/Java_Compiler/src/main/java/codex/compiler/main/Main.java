package codex.compiler.main;

import codex.compiler.sandbox.SandboxSecurityManager;
import codex.compiler.sandbox.SandboxTask;
import java.io.BufferedInputStream;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.PrintStream;

/**
 *
 * @author Nathan Dias {@literal <nathanxyzdias@gmail.com>}
 */
public class Main {

    public static void main(String[] args) {

        String source = System.getenv("source");
        String input = System.getenv("input");

        SandboxTask task = new SandboxTask(source);

        System.setIn(new BufferedInputStream(new ByteArrayInputStream(input.getBytes())));

        ByteArrayOutputStream output = new ByteArrayOutputStream();

        System.setOut(new PrintStream(output));

        System.setSecurityManager(new SandboxSecurityManager());
        task.run();

        String out = output.toString();

        System.getenv().put("output", out);
    }

}
