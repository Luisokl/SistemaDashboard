import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyCBx1zie09gn21_FdSS0xbFn5UMIVxuWyQ",
    authDomain: "sistema-3f33c.firebaseapp.com",
    projectId: "sistema-3f33c",
    storageBucket: "sistema-3f33c.appspot.com",
    messagingSenderId: "748555846527",
    appId: "1:748555846527:web:dba319bdb513e5f5c0d04a",
    measurementId: "G-HT3504SV0T"
};

const firebaseApp = initializeApp(firebaseConfig)

const auth = getAuth(firebaseApp)
const db = getFirestore(firebaseApp)
const storage = getStorage(firebaseApp)

export { auth, db, storage };