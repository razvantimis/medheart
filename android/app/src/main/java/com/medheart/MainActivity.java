package com.medheart;

import com.facebook.react.ReactActivity;
import com.tkporter.sendsms.SendSMSPackage;
import android.content.Intent;
public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "MedHeart";
    }
    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        //probably some other stuff here
        SendSMSPackage.getInstance().onActivityResult(requestCode, resultCode, data);
    }
}
