package app.ppix.io.mobile;

import android.app.Notification;
import android.app.NotificationManager;
import android.app.Service;
import android.content.BroadcastReceiver;
import android.content.Intent;
import android.content.IntentFilter;
import android.os.IBinder;
import android.app.NotificationChannel;

import androidx.core.app.NotificationCompat;


public class LockScreenService extends Service {

    private BroadcastReceiver mReceiver;

    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    @Override
    public void onCreate() {
        super.onCreate();
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        IntentFilter filter = new IntentFilter(Intent.ACTION_SCREEN_ON);
        filter.addAction(Intent.ACTION_SCREEN_OFF);
        mReceiver = new LockScreenIntentReceiver();
        registerReceiver(mReceiver, filter);
        startForeground();
        return START_STICKY;
    }

    private void startForeground() {
        NotificationChannel channel = null;
        String CHANNEL_ID = "CHANNEL_PPPIX";
        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.O) {
            channel = new NotificationChannel(CHANNEL_ID, "PennSkanvTicChannel", NotificationManager.IMPORTANCE_HIGH);

            channel.setDescription("PPPix channel for foreground service notification");

            NotificationManager notificationManager = getSystemService(NotificationManager.class);
            notificationManager.createNotificationChannel(channel);

            Notification notification = new NotificationCompat.Builder(this, CHANNEL_ID)
                    .setContentTitle(getResources().getString(R.string.app_name))
                    .setTicker(getResources().getString(R.string.app_name))
                    .setContentText("Running")
                    .setContentIntent(null)
                    .setOngoing(true)
                    .build();
            startForeground(9999, notification);
        }
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        unregisterReceiver(mReceiver);
    }
}