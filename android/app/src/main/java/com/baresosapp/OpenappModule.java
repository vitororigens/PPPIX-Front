package com.baresosapp;

import android.content.Intent;
import android.content.pm.PackageManager;
import android.net.Uri;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;

public class OpenappModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;

    public OpenappModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "Openapp";
    }

    @ReactMethod
    public void openApp(String packageName, Promise promise) {
        Intent sendIntent = this.reactContext.getPackageManager().getLaunchIntentForPackage(packageName);
        if (sendIntent == null) {
            promise.resolve(false);
            return;
        }

        sendIntent.addCategory(Intent.CATEGORY_LAUNCHER);
        this.reactContext.startActivity(sendIntent);
        promise.resolve(true);
    }

    @ReactMethod
    public void getAllAppsInstalled(Promise promise) {
        try{
            // Get all apps and return Json with name and package
            PackageManager pm = this.reactContext.getPackageManager();
            Intent intent = new Intent(Intent.ACTION_MAIN, null);
            intent.addCategory(Intent.CATEGORY_LAUNCHER);
            String json = "[";
            for (android.content.pm.ResolveInfo resolveInfo : pm.queryIntentActivities(intent, 0)) {
                json += "{\"name\":\"" + resolveInfo.loadLabel(pm) + "\",\"package\":\"" + resolveInfo.activityInfo.packageName + "\"},";
            }
            json = json.substring(0, json.length() - 1);
            json += "]";
            promise.resolve(json);
        } catch (Exception e) {
            promise.reject(e);
        }
        // PackageManager pm = this.reactContext.getPackageManager();
        // Intent intent = new Intent(Intent.ACTION_MAIN, null);
        // intent.addCategory(Intent.CATEGORY_LAUNCHER);
        // String[] packages = pm.getPackageInfo(this.reactContext.getPackageName(), PackageManager.GET_PERMISSIONS).requestedPermissions;
        // promise.resolve(packages);
    }

    @ReactMethod
    public void initCall(String numberToCall, Promise promise){
        Uri number = Uri.parse(numberToCall);
        try{
            Intent callIntent = new Intent(Intent.ACTION_DIAL, number);
            getReactApplicationContext().startActivity(callIntent);
            promise.resolve(true);
        } catch (Exception e) {
            promise.reject(e.getMessage(), "Cannot dial to number");
        }
    }
}
