package haxxor.compiler.main;

import haxxor.compiler.sandbox.SandboxSecurityManager;
import haxxor.compiler.sandbox.SandboxTask;
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
        String input = System.getenv("input") == null ? "" : System.getenv("input");
        String serverinfostuff = System.getenv("serverinfostuff");

        source = "public class foo{public static void main(String[] args){System.out.println(\"Yu Jingze\");}}";

        SandboxTask task = new SandboxTask(source);

        System.setIn(new BufferedInputStream(new ByteArrayInputStream(input.getBytes())));

        ByteArrayOutputStream output = new ByteArrayOutputStream();

        PrintStream og = System.out;
        System.setOut(new PrintStream(output));

        System.setSecurityManager(new SandboxSecurityManager());

        task.start();
        try {
            synchronized (task) {
                task.wait(60 * 1000);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        task.stop();

        String out = output.toString();
        
        //send that stuff yo'
        og.println(out);
    }

}
