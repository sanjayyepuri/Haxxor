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
        String input = System.getenv("input") == null ? "" : System.getenv("input");
        
        source = "public class foo{public static void main(String[] args){System.out.println(\"watfat\");}}";
        
        SandboxTask task = new SandboxTask(source);
        
        System.setIn(new BufferedInputStream(new ByteArrayInputStream(input.getBytes())));
        
        ByteArrayOutputStream output = new ByteArrayOutputStream();
        
        PrintStream o = System.out;
        System.setOut(new PrintStream(output));
        
        System.setSecurityManager(new SandboxSecurityManager());
        task.run();
        
        String out = output.toString();
        o.println(out);
        System.getenv().put("output", out);
    }
    
}
