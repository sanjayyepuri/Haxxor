package haxxor.queue;

import com.google.gson.Gson;
import com.rabbitmq.client.AMQP;
import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;
import com.rabbitmq.client.Consumer;
import com.rabbitmq.client.DefaultConsumer;
import com.rabbitmq.client.Envelope;
import java.io.IOException;
import java.util.EventListener;
import java.util.HashSet;
import java.util.Set;

/**
 *
 * @author Nathan Dias {@literal <nathanxyzdias@gmail.com>}
 */
public class CompileTaskReceiver {

    final static String QUEUE_NAME = "task_queue";

    final private Set<CompileTaskListener> listeners;

    final private Gson gson;

    public CompileTaskReceiver(String server) throws Exception {
        this(server, (CompileTaskListener) null);
    }

    public CompileTaskReceiver(String server, CompileTaskListener... listener) throws Exception {
        listeners = new HashSet<>();
        if (listener != null) {
            for (CompileTaskListener l : listener) {
                listeners.add(l);
            }
        }
        gson = new Gson();

        ConnectionFactory factory = new ConnectionFactory();
        System.out.println("ANCHOR: "+server);
        factory.setHost(server);
        Connection connection = factory.newConnection();
        Channel channel = connection.createChannel();

        channel.queueDeclare(QUEUE_NAME, true, false, false, null);
        System.out.println(" [*] Waiting for messages. To exit press CTRL+C");

        Consumer consumer = new DefaultConsumer(channel) {
            @Override
            public void handleDelivery(String consumerTag, Envelope envelope, AMQP.BasicProperties properties, byte[] body)
                    throws IOException {
                String message = new String(body, "UTF-8");
                System.out.println(" [x] Received '" + message + "'");
                CompileTask task = gson.fromJson(message, CompileTask.class);
                for (CompileTaskListener listener : listeners) {
                    listener.taskReceived(task);
                }
            }
        };
        channel.basicConsume(QUEUE_NAME, true, consumer);
    }

    public void addListener(CompileTaskListener t) {
        listeners.add(t);
    }

    @FunctionalInterface
    public static interface CompileTaskListener extends EventListener {

        public void taskReceived(CompileTask task);

    }

    public static class CompileTask {

        String submission;
        String input;
        String output;
        String namespace;
        String client;

    }
}
