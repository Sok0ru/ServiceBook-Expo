    export type RootStackParamList = {
      // Auth flow
      Main:undefined;
      Auth:undefined;
      EmailLogin: undefined;
      EmailVerificationScreen:undefined;
      EmailVerification: { email: string; password?: string };
      Login: undefined;
      Registration: undefined;
      // Main app
      MainTabs: undefined;
      
      // Individual screens (если нужен прямой доступ)
      Dashboard: undefined;
      Reminders: undefined;
      Filters: undefined;
      CreateReminder: undefined;
      Garage: undefined;
      AddCar: undefined;
      CarModels: { brand: string };
      CarGeneration: { brand: string; model: string };
      CarDetailsForm: { brand: string; model: string; generation: string; };
      History: undefined;
      CarDetails: { carId: string };
      

    };

    export type Car = {
      id: string;
      brand: string;
      model: string;
      vin?: string;
      year?: number;
      mileage?: number;
      color?: string;
      plate?: string;
    };
    declare global {
      namespace ReactNavigation {
        interface RootParamList extends RootStackParamList {}
      }
    }