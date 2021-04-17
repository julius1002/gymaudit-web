export class Set {
  id: string;
  reps: number;
  load: number;
  measureUnit: MeasureUnit;
  date: number;
  exerciseId: string;
}

export enum MeasureUnit {
  KILO_GRAMM = "Kilogramm",
  GRAMM = "Gramm",
  KILO_METER = "Kilometer",
  METER = "Meter",
  MILES = "Meilen",
  FEET = "Füße",
}
