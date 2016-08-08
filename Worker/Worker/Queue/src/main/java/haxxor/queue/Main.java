package haxxor.queue;

import java.io.IOException;
import static java.lang.System.out;
import java.util.Scanner;

/**
 *
 * @author Nathan Dias {@literal <nathanxyzdias@gmail.com>}
 */
public class Main {

    public static void main(String[] args) throws Exception {

        Scanner yo = new Scanner(System.in);
        out.println("Queue IP, dawg");

        String ip = "localhost";//yo.nextLine();

        String jhome = System.getenv("JAVA_HOME");

        final String JCOMPILER_PATH 
                = "/Users/sanjayyepuri/Documents/Computer Science/CodeX/Worker/Worker/Java_Compiler/build/libs/Java_Compiler-1.0-SNAPSHOT.jar";
        System.out.println(jhome);
        ProcessBuilder builder = new ProcessBuilder("/usr/bin/java", "-jar", JCOMPILER_PATH, "-cp", "");

        builder.redirectError(ProcessBuilder.Redirect.INHERIT);
        builder.redirectOutput(ProcessBuilder.Redirect.INHERIT);
        builder.redirectInput(ProcessBuilder.Redirect.INHERIT);

        CompileTaskReceiver rec = new CompileTaskReceiver(ip, (task) -> {
            builder.environment().put("client", task.client);
            builder.environment().put("source", task.submission);
            builder.environment().put("input", task.input);
            builder.environment().put("namespace", task.namespace);
            builder.environment().put("output", task.output);
            try {
                builder.start();
            } catch (IOException ex) {
                
            }

        });

    }

}
