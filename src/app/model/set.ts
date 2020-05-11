export interface Set {
  id: string;
  reps: number;
  number: number;
  measureUnit: MeasureUnit;
  calculatedVolume: number;
  date: number;
  exerciseId: number;
}

export enum MeasureUnit {
  KILO_GRAMM = "Kilogramm",
  GRAMM = "Gramm",
  KILO_METER = "Kilometer",
  METER = "Meter",
  MILES = "Meilen",
  FEET = "Füße",
}
