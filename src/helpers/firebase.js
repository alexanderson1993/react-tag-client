import { firebase } from "@firebase/app";
import "@firebase/auth";

var config = {
  apiKey: process.env.GATSBY_FIREBASE_API_KEY,
  databaseURL: process.env.GATSBY_FIREBASE_DATABASE_URL,
  storageBucket: process.env.GATSBY_FIREBASE_STORAGE_BUCKET,
  authDomain: process.env.GATSBY_FIREBASE_AUTH_DOMAIN,
  messagingSenderId: process.env.GATSBY_FIREBASE_MESSAGE_SENDER_ID,
  projectId: process.env.GATSBY_FIREBASE_PROJECT_ID,
  appId: process.env.GATSBY_FIREBASE_APP_ID,
};
let authItem;
let baseAuthItem;
let googleProviderItem;
let twitterProviderItem;
let githubProviderItem;

if (typeof window !== "undefined") {
  firebase.initializeApp(config);
  authItem = firebase.auth();
  baseAuthItem = firebase.auth;

  googleProviderItem = new firebase.auth.GoogleAuthProvider();
  twitterProviderItem = new firebase.auth.TwitterAuthProvider();
  githubProviderItem = new firebase.auth.GithubAuthProvider();
}

export const auth = authItem;
export const baseAuth = baseAuthItem;
export const googleProvider = googleProviderItem;
export const twitterProvider = twitterProviderItem;
export const githubProvider = githubProviderItem;
