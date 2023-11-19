export const formatNumberToDecimalPlace = (number: number, decimalPlaces?:number) => {
    // Check if the provided number is not a valid number
    if (Number.isNaN(number)) {
        return "0";
    }

    // Round the number to the specified decimal places
    const roundedNumber = Number(number).toFixed(decimalPlaces);

    // Convert the rounded number to a string
    return Number(roundedNumber).toLocaleString("en-US", {
        maximumFractionDigits: decimalPlaces,
        minimumFractionDigits: decimalPlaces,
    });

};