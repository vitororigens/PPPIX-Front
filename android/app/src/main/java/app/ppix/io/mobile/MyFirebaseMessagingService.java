package app.ppix.io.mobile;

import android.util.Log;
import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;

public class MyFirebaseMessagingService extends FirebaseMessagingService {

    private static final String TAG = "MyFirebaseMsgService";

    @Override
    public void onMessageReceived(RemoteMessage remoteMessage) {
        // Handle incoming FCM messages here.
        // Você pode implementar o código para exibir uma notificação ou realizar ações específicas.
        Log.d(TAG, "From: " + remoteMessage.getFrom());

        if (remoteMessage.getData().size() > 0) {
            Log.d(TAG, "Message data payload: " + remoteMessage.getData());
            // Handle data payload here.
        }

        if (remoteMessage.getNotification() != null) {
            Log.d(TAG, "Message Notification Body: " + remoteMessage.getNotification().getBody());
            // Handle notification payload here.
        }
    }

    @Override
    public void onNewToken(String token) {
        // Handle token refresh. Se necessário, você pode enviar o novo token para o servidor.
        Log.d(TAG, "Refreshed token: " + token);
    }
}
