'use strict'

const dotenv=require('dotenv');
const assert=require('assert');
const { AssertionError } = require('assert');

dotenv.config();

const {
    PORT,
    HOST,
    HOST_URL,
    API_KEY,
    AUTHDOMAIN,
    DATABASEURL,
    PROJECTID,
    STORAGEBUCKET,
    MESSAGINGSENDERID,
    APPID
}=process.env;

assert(PORT,'PORT IS REQUIRED');
assert(HOST,'HOST IS REQUIRED');

module.exports={
    port:PORT,
    host:HOST,
    url: HOST_URL,
    firebaseConfig : {
        /*apiKey: API_KEY,
        authDomain: AUTHDOMAIN,
        databaseURL: DATABASEURL,
        projectId: PROJECTID,
        storageBucket:STORAGEBUCKET,
        messagingSenderId: MESSAGINGSENDERID,
        appId: APPID*/

        //firebaseConfig : {
            apiKey: "AIzaSyD960s-J7T63lqpCzXbHL4hAlSgzyO1DG8",
            authDomain: "tpo-1-9bef4.firebaseapp.com",
            databaseURL: "https://tpo-1-9bef4-default-rtdb.firebaseio.com",
            projectId: "tpo-1-9bef4",
            storageBucket: "tpo-1-9bef4.appspot.com",
            messagingSenderId: "808549179434",
            appId: "1:808549179434:web:8ef0480d5122c27e33e353"
          }
}