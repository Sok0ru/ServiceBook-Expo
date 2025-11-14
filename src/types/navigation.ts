    export type RootStackParamList = {
      // Auth flow
      Main:undefined;
      Auth:undefined;
      EmailLogin: undefined;
      EmailVerificationScreen:undefined;
      EmailVerification: { email: string; password?: string };
      Login: undefined;
      Registration: undefined;
      MainTabs: undefined;
      
      // Individual screens (если нужен прямой доступ)
      Dashboard: undefined;
      Reminders: undefined;
      Filters: undefined;
      CreateReminder: undefined;
      Garage: undefined;
      History: undefined;
      CarDetails: { carId: string };
      

    };
    export type MainTabParamList = {
      Dashboard: undefined;
      Garage: undefined;
      History: undefined;
      Settings: undefined;
      AddCarStack: undefined;  
    };

    export type AddCarStackParamList = {
      AddCar: undefined;
      CarModels: { brand: string };
      CarGeneration: { brand: string; model: string };
      CarDetailsForm: { brand: string; model: string; generation: string };
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
    export type Brand = {
      id: string;
      name: string;
    };
    declare global {
      namespace ReactNavigation {
        interface RootParamList extends RootStackParamList {}
      }
    }