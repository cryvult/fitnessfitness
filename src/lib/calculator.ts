export function calculateBMI(weight: number, height: number) {
    const heightInMeters = height / 100;
    return Number((weight / (heightInMeters * heightInMeters)).toFixed(2));
}

export function calculateBMR(weight: number, height: number, age: number, gender: string) {
    if (gender === 'male') {
        return Math.round(10 * weight + 6.25 * height - 5 * age + 5);
    } else {
        return Math.round(10 * weight + 6.25 * height - 5 * age - 161);
    }
}

export function calculateTDEE(bmr: number, activity: number) {
    return Math.round(bmr * activity);
}

export function calculateTargetCalories(tdee: number, goal: string) {
    if (goal === 'lose') return tdee - 500;
    if (goal === 'gain') return tdee + 300;
    return tdee;
}

export function calculateMacros(calories: number, goal: string, weight: number) {
    const protein = Math.round(weight * 2.2);
    const proteinCalories = protein * 4;

    const fatsCalories = Math.round(calories * 0.25);
    const fats = Math.round(fatsCalories / 9);

    const carbsCalories = calories - proteinCalories - fatsCalories;
    const carbs = Math.round(carbsCalories / 4);

    return { protein, fats, carbs };
}
