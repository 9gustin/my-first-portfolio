const FirebaseKey = 'BJ5BtuMiqkIQHURJZd82ir6MMbqdeRPlStOUW9oTNopS1YbU40q7jhYayvmuqtVErUSXQNgYBBvI4YEc0xcSEv4';
firebase.initializeApp(pushConfig);

const messaging = firebase.messaging();
messaging.usePublicVapidKey(FirebaseKey);

messaging.requestPermission()
.then( ()=>{
    console.log('Permiso ok');
    return messaging.getToken();   
})
.then(token=>{
    console.log(token);
})
.catch(err=>{
    console.log('Ocurrio un error', err);
});

messaging.onMessage(payload=>{
    console.log(payload);
});