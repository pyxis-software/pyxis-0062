package com.pyxis0062;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;

import com.facebook.react.HeadlessJsTaskService;

public class NetworkChangeReceiver extends BroadcastReceiver {

    @Override
    public void onReceive(final Context context, final Intent intent) {
        Intent serviceIntent = new Intent(context, MyTaskService.class);
        serviceIntent.putExtra("hasInternet", "sim");
        context.startService(serviceIntent);
        HeadlessJsTaskService.acquireWakeLockNow(context);
    }
}