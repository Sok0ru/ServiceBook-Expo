
export type RootStackParamList = {
  Login: undefined;
  EmailVerification: { email: string };
  Main: undefined;
    CarDetailsForm: {
    brand: string;
    model: string;
    generation: string;
  };

};
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}