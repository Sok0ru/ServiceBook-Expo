    // src/types/navigation.ts
    export type RootStackParamList = {
      // Auth flow
      EmailLogin: undefined;
      EmailVerification: { email: string };
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
      TestAddCar: undefined;
      CarModels: undefined;
      CarGeneration: undefined;
      CarDetailsForm: undefined;
    };

    declare global {
      namespace ReactNavigation {
        interface RootParamList extends RootStackParamList {}
      }
    }