    export type RootStackParamList = {
      // Auth flow
      
      EmailLogin: undefined;
      EmailVerification: undefined;
      EmailVerificationScreen:undefined;
      Login: undefined;
      Registration: undefined;
      useAdaptiveStyles: undefined;
      // Main app
      MainTabs: undefined;
      HybridTabIcon:undefined;
      
      // Individual screens (если нужен прямой доступ)
      Dashboard: undefined;
      CarDetails: undefined;
      Reminders: undefined;
      Filters: undefined;
      CreateReminder: undefined;
      Garage: undefined;
      AddCar: undefined;
      CarModels: { brand: string };
      CarGeneration: { brand: string; model: string };
      CarDetailsForm: { brand: string; model: string; generation: string };
      History: undefined;
    };

    declare global {
      namespace ReactNavigation {
        interface RootParamList extends RootStackParamList {}
      }
    }