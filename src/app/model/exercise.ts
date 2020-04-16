
export interface Exercise{
    id:string;
    name:string;
    exerciseType:ExerciseType;
    muscleGroups:MuscleGroup[];
    description:string;
    date:number;
    pictureUrl:string;
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
