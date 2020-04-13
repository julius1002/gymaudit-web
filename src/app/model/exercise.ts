export class Exercise{
    name:string;
    exerciseType:ExerciseType;
    muscleGroups:MuscleGroup[];
    description:string;
    date:number;
}

export enum ExerciseType{
    STRENGTH = "Kraft",
    CARDIO = "Ausdauer"
}

export enum MuscleGroup{
    CHEST = "Brust",
    UPPERLEGS = "Beine",
    BACK = "Rücken",
    CALVES = "Waden",
    FOREARMS = "Unterarme",
    BICEPS = "Bizeps",
    TRICEPS = "Trizeps",
    TRAPS = "Nacken",
    SHOULDERS = "Schultern",
    ABS = "Bauch"
}