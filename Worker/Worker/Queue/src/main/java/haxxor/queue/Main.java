package haxxor.queue;

import java.io.IOException;
import static java.lang.System.out;
import java.util.Scanner;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author Nathan Dias {@literal <nathanxyzdias@gmail.com>}
 */
public class Main {

    public static void main(String[] args) throws Exception {

        Scanner yo = new Scanner(System.in);
        out.println("Queue IP, dawg");

        String ip = yo.nextLine();

        String jhome = System.getenv("JAVA_HOME");

        final String JCOMPILER_PATH 
                = "C:/users/natha/documents/gitkraken/Compete-Engine/Worker/Java Compiler/dist/Java_Compiler.jar";

        ProcessBuilder builder = new ProcessBuilder(jhome + "/bin/java.exe", "-jar", JCOMPILER_PATH);

        builder.redirectError(ProcessBuilder.Redirect.INHERIT);
        builder.redirectOutput(ProcessBuilder.Redirect.INHERIT);
        builder.redirectInput(ProcessBuilder.Redirect.INHERIT);



        CompileTaskReceiver rec = new CompileTaskReceiver(ip, (task) -> {
            
            builder.environment().put("source", task.submission);
            builder.environment().put("input", task.input);
            builder.environment().put("serverinfostuff", null);
            try {
                builder.start();
            } catch (IOException ex) {
                
            }

        });

    }

}
