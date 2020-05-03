import { Set } from "src/app/model/set";
export interface Exercise {
  id: string;
  name: string;
  exerciseType: ExerciseType;
  muscleGroups: MuscleGroup[];
  description: string;
  date: number;
  pictureUrl: string;
  unitId: string;
}

export enum ExerciseType {
  STRENGTH = "Kraft",
  CARDIO = "Ausdauer",
  STRENGTH_ENDURANCE = "Kraftausdauer",
  MAXIMUM_STRENGTH = "Maximalkraft",
}

export enum MuscleGroup {
  CHEST = "Brust",
  UPPERLEGS = "Beine",
  BACK = "Rücken",
  CALVES = "Waden",
  FOREARMS = "Unterarme",
  BICEPS = "Bizeps",
  TRICEPS = "Trizeps",
  TRAPS = "Nacken",
  SHOULDERS = "Schultern",
  ABS = "Bauch",
}
