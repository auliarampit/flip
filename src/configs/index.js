const base = {
    urlBackend: 'https://nextar.flip.id/frontend-test',
  };
  
  const local = {};
  
  const dev = {};
  
  const prd = {};
  
  let config;
  
  if (!__DEV__) {
    config = prd;
    // } else if (Constants.isDevice) {
    // 	config = Dev
  } else {
    config = dev;
  }
  
  //config = Dev
  //config = Prod
  
  config = Object.assign({}, base, config);
  
  export default config;