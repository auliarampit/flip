const base = {
    urlBackend: 'https://nextar.flip.id/frontend-test',
  };
  
  const local = {};
  
  const dev = {};
  
  const prd = {};
  
  let config;
  
  if (!__DEV__) {
    config = prd;
  } else {
    config = dev;
  }
  
  config = Object.assign({}, base, config);
  
  export default config;