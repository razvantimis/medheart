# MedHeart App
Help people for better life

## Heart Rate 

# Mi Band 2 authentication has three steps.
 
Step 1: sending a "secret" key to the band.
  
AUTH_SEND_KEY = 0x01;
  
Step 2: requesting a random authentication key from the band.
  
AUTH_REQUEST_RANDOM_AUTH_NUMBER = 0x02;
   
Step 3: sending the encrypted random authentication key to the band.

AUTH_SEND_ENCRYPTED_AUTH_NUMBER = 0x03;


Received in response to any authentication requests (byte 0 in the byte[] value.

AUTH_RESPONSE = 0x10;

Received in response to any authentication requests (byte 2 in the byte[] value. 0x01 means success.
AUTH_SUCCESS = 0x01;
 
In some logs it's 0x0...
 
 AUTH_BYTE = 0x8;


# Mi band 2 Caracteristici

Support

BASE_UID = "0000%s-0000-1000-8000-00805f9b34fb"

UUID_SERVICE_MIBAND_SERVICE = "FEE0"
UUID_SERVICE_MIBAND2_SERVICE = "0000%FEE1%-0000-1000-8000-00805f9b34fb"
UUID_SERVICE_HEART_RATE = "0000%180D%-0000-1000-8000-00805f9b34fb"

UUID_SERVICE_DEVICE_INFORMATION = "180A"
UUID_SERVICE_GENERIC_ACCESS = "1800"
UUID_SERVICE_GENERIC_ATTRIBUTE = "1801"



## Predicted heart disease