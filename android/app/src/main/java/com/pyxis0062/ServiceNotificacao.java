package com.pyxis0062;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.Service;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.database.sqlite.SQLiteDatabase;
import android.graphics.BitmapFactory;
import android.graphics.Color;
import android.os.Build;
import android.os.Bundle;
import android.os.IBinder;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.core.app.NotificationCompat;

import com.google.firebase.FirebaseApp;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;
import com.reactnativecommunity.asyncstorage.AsyncLocalStorageUtil;
import com.reactnativecommunity.asyncstorage.ReactDatabaseSupplier;

public class ServiceNotificacao extends Service {
    private String CPF;
    String CHANNEL_ID = "my_channel_01";

    static boolean active = false;
    FirebaseDatabase database;
    DatabaseReference myRef;

    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    @Override
    public void onCreate() {
        super.onCreate();

        active = true;
        SQLiteDatabase readableDatabase = null;
        readableDatabase = ReactDatabaseSupplier.getInstance(this.getApplicationContext()).getReadableDatabase();
        if (readableDatabase != null) {
            CPF = AsyncLocalStorageUtil.getItemImpl(readableDatabase, "cpfLogado");
            CPF = CPF.replace(".", "");
            CPF = CPF.replace("-", "");
            Log.d("CORE", CPF);
        }

        FirebaseApp.initializeApp(this);

        database = FirebaseDatabase.getInstance();
        myRef = database.getReference("notificacoes");

        //Buscando as notificações

        myRef.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot dataSnapshot) {
                if(dataSnapshot.exists()){
                    String para, mensagem, tipo, title, clientes, notId;
                    for (DataSnapshot s : dataSnapshot.getChildren()) {
                        mensagem = s.child("mensagem").getValue().toString();
                        para = s.child("para").getValue().toString();
                        tipo = s.child("tipo").getValue().toString();
                        title = s.child("title").getValue().toString();
                        notId = s.getKey();

                        Log.d("CORE", "Para: " + para);

                        if(para.equals(CPF)){
                            Log.d("CORE", "Criando a notificação");
                            Notificacao(title, tipo, mensagem);
                            //Removendo...
                            myRef.child(notId).setValue(null);
                        }

                        if(para.equals("*")){

                            //Verifica os clientes
                            clientes = s.child("clientes").getValue().toString();
                            Log.d("CORE", clientes);
                            if(verificaExiste(clientes)){
                                String[] c = clientes.split(";");
                                String nova = "";

                                for (int a = 0; a < c.length; a++){
                                    if(c[a].equals(CPF)){
                                        Log.d("CORE", "Criando a notificação");
                                        Notificacao(title, tipo, mensagem);
                                    }else{
                                        nova += c[a]+";";
                                    }
                                }

                                String[] b = nova.split(";");
                                if(b.length != c.length){
                                    //Aatualiza o firebase
                                    myRef.child(notId).child("clientes").setValue(nova);
                                }
                            }else{
                                Log.d("CORE", "Removendo já lido");
                                myRef.child(notId).setValue(null);
                            }
                        }
                    }
                }
            }

            @Override
            public void onCancelled(@NonNull DatabaseError databaseError) {

            }
        });
        myRef.addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot dataSnapshot) {
                Log.d("CORE", "Nova");
                if(dataSnapshot.exists()){
                    String para, mensagem, tipo, title, clientes, notId;
                    for (DataSnapshot s : dataSnapshot.getChildren()) {
                        mensagem = s.child("mensagem").getValue().toString();
                        para = s.child("para").getValue().toString();
                        tipo = s.child("tipo").getValue().toString();
                        title = s.child("title").getValue().toString();
                        notId = s.getKey();

                        Log.d("CORE", "Para: " + para);

                        if(para.equals(CPF)){
                            Log.d("CORE", "Criando a notificação");
                            Notificacao(title, tipo, mensagem);
                            //Removendo...
                            myRef.child(notId).setValue(null);
                        }

                        if(para.equals("*")){

                            //Verifica os clientes
                            clientes = s.child("clientes").getValue().toString();
                            if(verificaExiste(clientes)){
                                String[] c = clientes.split(";");
                                String nova = "";

                                for (int a = 0; a < c.length; a++){
                                    if(c[a].equals(CPF)){
                                        Log.d("CORE", "Criando a notificação");
                                        Notificacao(title, tipo, mensagem);
                                    }else{
                                        nova += c[a]+";";
                                    }
                                }

                                String[] b = nova.split(";");
                                if(b.length != c.length){
                                    //Aatualiza o firebase
                                    myRef.child(notId).child("clientes").setValue(nova);
                                }
                            }else{
                                Log.d("CORE", "Removendo já lido");
                                myRef.child(notId).setValue(null);
                            }
                        }
                    }
                }
            }

            @Override
            public void onCancelled(@NonNull DatabaseError databaseError) {

            }
        });

        Log.d("CORE", "Serviço Criado");
    }

    private boolean verificaExiste(String dados){
        String procura = ";";
        if(dados.toLowerCase().contains(procura.toLowerCase())){
            return true;
        }else{
            return false;
        }
    }


    @Override
    public ComponentName startForegroundService(Intent service) {
        return super.startForegroundService(service);
    }
    private void createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationChannel serviceChannel = new NotificationChannel(
                    CHANNEL_ID,
                    "Foreground Service Channel",
                    NotificationManager.IMPORTANCE_DEFAULT
            );

            NotificationManager manager = getSystemService(NotificationManager.class);
            manager.createNotificationChannel(serviceChannel);
        }
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        Log.d("CORE", "Serviço Destruido");
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            stopForeground(true);
        }
        Intent i = new Intent("com.pyxis0062.MY_NOTIFICATION");
        sendBroadcast(i);
        active = false;
    }

    @Override
    public void onTaskRemoved(Intent rootIntent) {
        super.onTaskRemoved(rootIntent);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            stopForeground(true);
        }
        Intent i = new Intent("com.pyxis0062.MY_NOTIFICATION");
        sendBroadcast(i);
        active = false;
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        createNotificationChannel();

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            Intent notificationIntent = new Intent(this, MainActivity.class);
            PendingIntent pendingIntent = PendingIntent.getActivity(this,
                    0, notificationIntent, 0);

            Notification notification = new NotificationCompat.Builder(this, CHANNEL_ID)
                    .setContentTitle("Buscando Notificações")
                    .setSmallIcon(R.drawable.logo)
                    .setContentIntent(pendingIntent)
                    .build();

            startForeground(1, notification);
        }


        //do heavy work on a background thread
        return Service.START_STICKY;
    }

    private void startInForeground(){

    }

    //Notificação
    private void Notificacao(String titulo, String tipo, String mensagem){
        Intent intent = new Intent(this, MainActivity.class);
        PendingIntent pIntent = PendingIntent.getActivity(this, 0, intent, 0);

        int NOTIFICATION_ID = 234;
        NotificationManager notificationManager = (NotificationManager) this.getSystemService(Context.NOTIFICATION_SERVICE);


        if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.O){
            CharSequence name = "my_channel_1";
            String description = "Meu canal";
            int importante = NotificationManager.IMPORTANCE_HIGH;
            NotificationChannel mChannel = new NotificationChannel(CHANNEL_ID, name, importante);
            mChannel.setDescription(description);
            mChannel.enableLights(true);
            mChannel.enableVibration(true);
            mChannel.setLightColor(Color.RED);
            mChannel.setVibrationPattern(new long[]{100, 200, 300, 400, 500, 400, 300, 200, 400});
            mChannel.setShowBadge(true);
            notificationManager.createNotificationChannel(mChannel);
        }

        NotificationCompat.Builder builder = null;
        //Informação
        if(tipo.equals("informacao")){
            builder = new NotificationCompat.Builder(this, CHANNEL_ID)
                    .setContentTitle(titulo)
                    .setContentText(mensagem)
                    .setSmallIcon(R.drawable.logo)
                    .setContentIntent(pIntent)
                    .setAutoCancel(true)
                    .setTicker(titulo)
                    .setLargeIcon(BitmapFactory.decodeResource(getResources(), R.drawable.logo));

            Notification n = builder.build();
            n.vibrate = new long[]{150, 300, 150, 600};
            n.defaults = Notification.DEFAULT_SOUND;

            notificationManager.notify(NOTIFICATION_ID,n);
        }else if(tipo.equals("chat")){
            builder = new NotificationCompat.Builder(this, CHANNEL_ID)
                    .setContentTitle(titulo)
                    .setContentText(mensagem)
                    .setSmallIcon(R.drawable.logo)
                    .setContentIntent(pIntent)
                    .setAutoCancel(true)
                    .setTicker(titulo)
                    .setLargeIcon(BitmapFactory.decodeResource(getResources(), R.drawable.logo));

            Notification n = builder.build();
            n.vibrate = new long[]{150, 300, 150, 600};
            n.defaults = Notification.DEFAULT_SOUND;

            notificationManager.notify(NOTIFICATION_ID,n);
        }else{
            Log.d("CORE", "Erro na notificação");
        }

    }
}
