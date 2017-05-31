package com.medheart.cipher;

import android.util.Log;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.google.gson.Gson;

import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.Arrays;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.spec.SecretKeySpec;

/**
 * Created by razvantimis on 27/05/2017.
 */

public class CipherModule extends ReactContextBaseJavaModule {

    public CipherModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }
    @Override
    public String getName() {
        return "CipherModule";
    }

    @ReactMethod
    public void handleAESAuth(String valueStr, String secretKeyStr, Callback cipherCallback) throws InvalidKeyException, NoSuchPaddingException, NoSuchAlgorithmException, BadPaddingException, IllegalBlockSizeException {
        Log.d("cipher", valueStr);
        Log.d("cipher", secretKeyStr);

        Gson gson = new Gson();

        byte[] value = gson.fromJson(valueStr, byte[].class);
        byte[] secretKey= gson.fromJson(secretKeyStr, byte[].class);

        byte[] mValue = Arrays.copyOfRange(value, 3, 19);
        Cipher ecipher = Cipher.getInstance("AES/ECB/NoPadding");
        SecretKeySpec newKey = new SecretKeySpec(secretKey, "AES");
        ecipher.init(Cipher.ENCRYPT_MODE, newKey);
        byte[] enc = ecipher.doFinal(mValue);

        String rez = gson.toJson(enc, byte[].class);
        Log.d("cipher", rez);
        cipherCallback.invoke(rez);
    }
}
