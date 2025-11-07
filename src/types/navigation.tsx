export type RootStackParamList = {
  // Auth
  EmailVerification: undefined;
  Login: undefined;
  Registration: undefined;
  MainTabs: undefined;
  
  // Main
  Dashboard: undefined;
  CarDetails: undefined;
  Reminders: undefined;
  Filters: undefined;
  CreateReminder: undefined;
  
  // Garage
  Garage: undefined;
  AddCar: undefined;
  CarModels: { brand: string };
  CarGeneration: { brand: string; model: string };
  CarDetailsForm: { brand: string; model: string; generation: string };
};

//таб-навигатор
export type MainTabParamList = {
  Dashboard: undefined;
  Garage: undefined;
  History: undefined;
  Settings: undefined;
};