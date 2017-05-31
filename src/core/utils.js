export const action = (type, payload) => ({type, payload});

export function sleep(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(ms), ms);
  });
}

export function getLogger(tag) {
  return (message) => {

    console.log(`${tag} - ${message}`);
  }
}
/**
 * Return 0 if can't convert
 * @param {*} value - on monitoring heart rate value , bytes array
 */
export function handleHeartrate(value) {
  if (value.length == 2 && value[0] == 0) {
    let hrValue = (value[1] & 0xff);
    return hrValue
  } else {
    return 0;
  }
}

