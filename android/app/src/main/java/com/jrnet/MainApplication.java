package com.jrnet;

import android.app.Application;
import android.content.Intent;
import android.database.sqlite.SQLiteDatabase;
import android.os.Build;
import android.os.Bundle;
import android.util.Log;

import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;

import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
import com.reactnativecommunity.asyncstorage.AsyncLocalStorageUtil;
import com.reactnativecommunity.asyncstorage.ReactDatabaseSupplier;

import java.util.List;

public class MainApplication extends Application implements ReactApplication {



  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      @SuppressWarnings("UnnecessaryLocalVariable")
      List<ReactPackage> packages = new PackageList(this).getPackages();
      // Packages that cannot be autolinked yet can be added manually here, for example:
      // packages.add(new MyReactNativePackage());
      return packages;
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();


    //Criando a intent do serviço
    Intent service = new Intent(getApplicationContext(), ServiceNotificacao.class);
    //Buscando se o cliente já entrou no aplicativo
    SQLiteDatabase readableDatabase = null;
    readableDatabase = ReactDatabaseSupplier.getInstance(this.getApplicationContext()).getReadableDatabase();
    String impl = null;
    if (readableDatabase != null) {

      impl = AsyncLocalStorageUtil.getItemImpl(readableDatabase, "cpfLogado");
      Log.d("CORE", "CPF encontrado: " + impl);
    }
    if(impl != null){
      if(!ServiceNotificacao.active){
        getApplicationContext().startService(service);
      }
    }

    SoLoader.init(this, /* native exopackage */ false);
  }
}
