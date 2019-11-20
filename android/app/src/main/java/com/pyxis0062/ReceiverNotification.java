package com.pyxis0062;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;

public class ReceiverNotification extends BroadcastReceiver {
    @Override
    public void onReceive(Context context, Intent intent) {
        Intent serviceIntent = new Intent(context, ServiceNotificacao.class);
        serviceIntent.putExtra("hasInternet", "sim");
        if(!ServiceNotificacao.active){
            context.startService(serviceIntent);
        }

    }

}
