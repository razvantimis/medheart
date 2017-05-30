export const action = (type, payload) => ({type, payload});

export function sleep(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(ms), ms);
  });
}

export function getLogger(tag) {
  return (message) => {
    if (typeof message === 'object'){
      console.log(`${tag} - ${JSON.stringify(message)}`);
    }else {
      console.log(`${tag} - ${message}`);
    }
  }
}


