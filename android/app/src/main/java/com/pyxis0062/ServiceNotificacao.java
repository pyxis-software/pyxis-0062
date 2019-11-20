package com.pyxis0062;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.Service;
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
                    String para, mensagem, tipo, title;
                    for (DataSnapshot s : dataSnapshot.getChildren()) {
                        mensagem = s.child("mensagem").getValue().toString();
                        para = s.child("para").getValue().toString();
                        tipo = s.child("tipo").getValue().toString();
                        title = s.child("title").getValue().toString();

                        Log.d("CORE", "Para: " + para);

                        if(para.equals(CPF)){
                            Log.d("CORE", "Criando a notificação");
                            Notificacao(title, tipo, mensagem);
                            //Removendo...
                            dataSnapshot.getRef().setValue(null);
                        }

                        if(para.equals("*")){
                            Log.d("CORE", "Criando a notificação");
                            Notificacao(title, tipo, mensagem);
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
                    String para, mensagem, tipo, title;
                    for (DataSnapshot s : dataSnapshot.getChildren()) {
                        mensagem = s.child("mensagem").getValue().toString();
                        para = s.child("para").getValue().toString();
                        tipo = s.child("tipo").getValue().toString();
                        title = s.child("title").getValue().toString();

                        Log.d("CORE", "Para: " + para);

                        if(para.equals(CPF)){
                            Log.d("CORE", "Criando a notificação");
                            Notificacao(title, tipo, mensagem);
                            //Removendo...
                            dataSnapshot.getRef().setValue(null);
                        }

                        if(para.equals("*")){
                            Log.d("CORE", "Criando a notificação");
                            Notificacao(title, tipo, mensagem);
                        }
                    }

                    //Removendo...
                }
            }

            @Override
            public void onCancelled(@NonNull DatabaseError databaseError) {

            }
        });

        Log.d("CORE", "Serviço Criado");
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        Log.d("CORE", "Serviço Destruido");
        active = false;
    }

    @Override
    public void onTaskRemoved(Intent rootIntent) {
        super.onTaskRemoved(rootIntent);
        active = false;
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        return super.onStartCommand(intent, flags, startId);
    }

    public static class Notifi {

        public String mensagem;
        public String para;
        public String tipo;
        public String title;

        public Notifi() {
        }

        public Notifi(String mensagem, String para, String tipo, String titulo) {
            this.mensagem = mensagem;
            this.para = para;
            this.tipo = tipo;
            this.title = titulo;
        }

        public String getMensagem() {
            return mensagem;
        }

        public void setMensagem(String mensagem) {
            this.mensagem = mensagem;
        }

        public String getPara() {
            return para;
        }

        public void setPara(String para) {
            this.para = para;
        }

        public String getTipo() {
            return tipo;
        }

        public void setTipo(String tipo) {
            this.tipo = tipo;
        }

        public String getTitulo() {
            return title;
        }

        public void setTitulo(String titulo) {
            this.title = titulo;
        }
    }

    //Apaga notificacao
    private void deleteNot(){

    }


    //Notificação
    private void Notificacao(String titulo, String tipo, String mensagem){
        Intent intent = new Intent(this, MainActivity.class);
        PendingIntent pIntent = PendingIntent.getActivity(this, 0, intent, 0);

        int NOTIFICATION_ID = 234;
        NotificationManager notificationManager = (NotificationManager) this.getSystemService(Context.NOTIFICATION_SERVICE);

        String CHANNEL_ID = "my_channel_01";
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


        }else if(tipo.equals("chat")){
            builder = new NotificationCompat.Builder(this, CHANNEL_ID)
                    .setContentTitle(titulo)
                    .setContentText(mensagem)
                    .setSmallIcon(R.drawable.logo)
                    .setContentIntent(pIntent)
                    .setAutoCancel(true)
                    .setTicker(titulo)
                    .setLargeIcon(BitmapFactory.decodeResource(getResources(), R.drawable.logo))
                    .addAction(R.drawable.logo, "Ver", pIntent);
        }else{
            Log.d("CORE", "Erro na notificação");
        }
        Notification n = builder.build();
        n.vibrate = new long[]{150, 300, 150, 600};
        n.defaults = Notification.DEFAULT_SOUND;

        notificationManager.notify(NOTIFICATION_ID,n);
    }
}
