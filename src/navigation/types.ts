
export type RootStackParamList = {
  Login: undefined;
  EmailVerification: { email: string };
  Main: undefined;

};
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}