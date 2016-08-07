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
import io.socket.client.IO;
import io.socket.client.Socket;

public class Main {

    public static void main(String[] args) {
        
        String user = System.getenv("client") == null ? "" : System.getenv("source");
        String source = System.getenv("source") == null ? "" : System.getenv("source");
        String input = System.getenv("input") == null ? "" : System.getenv("input");
        String output = System.getenv("output") == null ? "" : System.getenv("output");
        String namespace = System.getenv("namespace") == null ? "" : System.getenv("namespace");
        
//        source = "public class foo{public static void main(String[] args){System.out.println(\"Yu Jingze\");}}";

        SandboxTask task = new SandboxTask(source);

        System.setIn(new BufferedInputStream(new ByteArrayInputStream(input.getBytes())));

        ByteArrayOutputStream outputstr = new ByteArrayOutputStream();

        PrintStream og = System.out;
        System.setOut(new PrintStream(outputstr));

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

        String out = outputstr.toString();
        
        boolean success = out.equals(output);
        
        //send that stuff yo'
        try {
            Socket socket = IO.socket("http://localhost:3000/"+namespace);
            String result = String.format("{user: %s, result:%s}",user , success?"true":"false");
            socket.emit("program_result", result);
        } catch(Exception e){
            e.printStackTrace();
        }
        og.println(out);
    }

}
