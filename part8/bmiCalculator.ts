type bmiCategory =
  | "Underweight (Severe thinness)"
  | "Underweight (Moderate thinness)"
  | "Underweight (Mild thinness)"
  | "Normal range"
  | "Overweight (Pre-obese)"
  | "Obese (Class I)"
  | "Obese (Class II)"
  | "Obese (Class III)";

const verifyArguments = (args: string[]): void => {
  if (args.length < 4) throw new Error("not enough arguments");
  else if (args.length > 4) throw new Error("too many arguments");

  if (isNaN(Number(args[2])))
    throw new Error("height in cm argument is not a number");
  if (isNaN(Number(args[3])))
    throw new Error("weight in kg argument is not a number");
};

const calculateBmi = (heightInCm: number, weightInKg: number): bmiCategory => {
  const bmi: number = weightInKg / (heightInCm / 100) ** 2;

  if (bmi < 16.0) {
    return "Underweight (Severe thinness)";
  } else if (bmi >= 16.0 && bmi <= 16.9) {
    return "Underweight (Moderate thinness)";
  } else if (bmi >= 17.0 && bmi <= 18.4) {
    return "Underweight (Mild thinness)";
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    return "Normal range";
  } else if (bmi >= 25.0 && bmi <= 29.9) {
    return "Overweight (Pre-obese)";
  } else if (bmi >= 30.0 && bmi < -34.9) {
    return "Obese (Class I)";
  } else if (bmi >= 35.0 && bmi <= 39.9) {
    return "Obese (Class II)";
  } else if (bmi >= 40.0) {
    return "Obese (Class III)";
  }
};

try {
  verifyArguments(process.argv);
  console.log(calculateBmi(Number(process.argv[2]), Number(process.argv[3])));
} catch (error: unknown) {
  if (error instanceof Error) {
    console.error("Error: " + error.message);
  }
}
