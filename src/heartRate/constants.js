const BASE_UUID = '0000%s-0000-1000-8000-00805f9b34fb';

// Auth

// Services

const UUID_SERVICE_MIBAND2_SERVICE = BASE_UUID.replace('%s', 'FEE1') ;



// CHARACTERISTIC

const UUID_CHARACTERISTIC_AUTH = '00000009-0000-3512-2118-0009af100700';


// key

 /**
     * Mi Band 2 authentication has three steps.
     * This is step 1: sending a "secret" key to the band.
     * This is byte 0, followed by {@link #AUTH_BYTE} and then the key.
     * In the response, it is byte 1 in the byte[] value.
  */
const AUTH_SEND_KEY = 0x01;


/**
 * Mi Band 2 authentication has three steps.
 * This is step 2: requesting a random authentication key from the band.
 * This is byte 0, followed by {@link #AUTH_BYTE}.
 * In the response, it is byte 1 in the byte[] value.
 */
const AUTH_REQUEST_RANDOM_AUTH_NUMBER = 0x02;
    
/**
 * Mi Band 2 authentication has three steps.
 * This is step 3: sending the encrypted random authentication key to the band.
 * This is byte 0, followed by {@link #AUTH_BYTE} and then the encrypted random authentication key.
 * In the response, it is byte 1 in the byte[] value.
 */
const AUTH_SEND_ENCRYPTED_AUTH_NUMBER = 0x03;

/**
 * Received in response to any authentication requests (byte 0 in the byte[] value.
 */
const AUTH_RESPONSE = 0x10;
/**
 * Received in response to any authentication requests (byte 2 in the byte[] value.
 * 0x01 means success.
 */
const AUTH_SUCCESS = 0x01;
/**
 * Received in response to any authentication requests (byte 2 in the byte[] value.
 * 0x04 means failure.
 */
const AUTH_FAIL = 0x04;
/**
 * In some logs it's 0x0...
 */
const AUTH_BYTE = 0x8;

const SECRET_KEY = [0x30, 0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x40, 0x41, 0x42, 0x43, 0x44, 0x45]

const sendKey = [AUTH_SEND_KEY, AUTH_BYTE, ...SECRET_KEY];

const requestAuthNumber = [ AUTH_REQUEST_RANDOM_AUTH_NUMBER, AUTH_BYTE]

// heart rate
const UUID_SERVICE_HEART_RATE = BASE_UUID.replace('%s', '180D');

const UUID_CHARACTERISTIC_HEART_RATE_CONTROL_POINT = BASE_UUID.replace('%s','2A39');
const UUID_CHARACTERISTIC_HEART_RATE_MEASUREMENT = BASE_UUID.replace('%s', '2A37');

const COMMAND_SET_HR_MANUAL =  0x2;
const COMMAND_SET__HR_CONTINUOUS = 0x1;
const startHeartMeasurementManual = [0x15, COMMAND_SET_HR_MANUAL, 1, 0, 1];
const stopHeartMeasurementManual = [0x15, COMMAND_SET_HR_MANUAL, 0];
const startHeartMeasurementContinuous = [0x15, COMMAND_SET__HR_CONTINUOUS, 1];
const stopHeartMeasurementContinuous = [0x15, COMMAND_SET__HR_CONTINUOUS, 0];

// other
const UUID_CHARACTERISTIC_SERIAL_NUMBER_STRING = BASE_UUID.replace('%s', '2A25');

export { UUID_SERVICE_MIBAND2_SERVICE,
  UUID_CHARACTERISTIC_AUTH,
  sendKey,
  requestAuthNumber,

  UUID_SERVICE_HEART_RATE,
  UUID_CHARACTERISTIC_HEART_RATE_CONTROL_POINT,
  UUID_CHARACTERISTIC_HEART_RATE_MEASUREMENT,

  startHeartMeasurementManual,
  stopHeartMeasurementManual,
  startHeartMeasurementContinuous,
  stopHeartMeasurementContinuous,
  // other
  UUID_CHARACTERISTIC_SERIAL_NUMBER_STRING,
  // key
  SECRET_KEY,
  // state auth
  AUTH_RESPONSE,
  AUTH_FAIL,
  AUTH_SUCCESS,
  AUTH_SEND_ENCRYPTED_AUTH_NUMBER,
  AUTH_REQUEST_RANDOM_AUTH_NUMBER,
  AUTH_SEND_KEY,
  AUTH_BYTE}