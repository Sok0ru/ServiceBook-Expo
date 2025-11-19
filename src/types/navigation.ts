    import { Reminder } from '../api/reminders';
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
      Reminders: {carId: string};
      Filters: undefined;
      CreateReminder: { carId: string; editReminder?: Reminder };
      Garage: undefined;
      History: { carId: string };
      CarDetails: { carId: string };
      AddCarStackNavigator:undefined;
      LogIn:undefined;
      TestNotifications:undefined;
      CarModels: { brand: string };
      CarGeneration: { brand: string; model: string };
      SelectCarForReminder: undefined;

    };
    export type MainTabParamList = {
      Dashboard: undefined;
      Garage: undefined;
      History: undefined;
      Settings: undefined;
      MainTabs:undefined;
      MainTabBar:undefined;
      AddCarStack: { screen?: 'AddCar' | 'CarModels' | 'CarGeneration' | 'CarDetailsForm' }; 
    };

    export type AddCarStackParamList = {
      AddCar: undefined;
      CarModels: { brand: string };
      CarGeneration: { brand: string; model: string };
      CarDetailsForm: { brand: string; model: string; generation: string };
      Garage:undefined;
    };
    export type Car = {
      name(name: any): unknown;
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

export { Reminder };
