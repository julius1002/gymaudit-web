export interface Trainee {
  email: string;
  firstName: string;
  lastName: string;
  birthday: number;
  traineeLevel: TraineeLevel;
}

export enum TraineeLevel {
  BEGINNER = "Anfänger",
  AMATEUR = "Amateur",
  INTERMEDIATE = "Durschnittlich",
  PRO = "Profi",
}
