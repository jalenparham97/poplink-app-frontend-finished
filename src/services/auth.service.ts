import { signInWithPopup, User as FirebaseUser } from 'firebase/auth';
import { firebaseAuth, googleAuthProvider } from '../libs/firebase';
import { axios } from '../libs/axios';
import { queryClient } from '../libs/react-query';
import { User } from '../types/user.types';

export async function logout() {
  queryClient.clear();
  return await firebaseAuth.signOut();
}

export async function authenticateWithGoogle() {
  const auth = await signInWithPopup(firebaseAuth, googleAuthProvider);
  return auth.user;
}

export async function signUpWithGoogle() {
  const firebaseUser: FirebaseUser = await authenticateWithGoogle();
  const { data: user } = await axios.post<User>('/auth/signup', {
    uid: firebaseUser.uid,
    email: firebaseUser.email,
    displayName: firebaseUser.displayName,
    photoURL: firebaseUser.photoURL,
  });
  return user;
}

export async function loginWithGoogle() {
  const firebaseUser: FirebaseUser = await authenticateWithGoogle();
  const user = await getLoginUser(firebaseUser.uid);
  return user;
}

export async function getLoginUser(uid: string) {
  const response = await axios.get<User>('/auth/login', { params: { uid } });
  return response.data;
}
