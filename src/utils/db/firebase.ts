import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "ISI_API_KEY_KAMU",
  authDomain: "framework-next-9f416.firebaseapp.com",
  projectId: "framework-next-9f416",
  storageBucket: "framework-next-9f416.appspot.com",
  messagingSenderId: "663015797614",
  appId: "1:663015797614:web:ffdbe46de74dd87663877f"
};

const app = initializeApp(firebaseConfig);

export default app;