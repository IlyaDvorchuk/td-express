export const ValidateNumberInput = {
    getValidInput(value: string) {
        return value.replace(/[^0-9.,\s]/g, '');
    },

    removePoints(value: string) {
       return value.replace(/,/g, '.');
    }
}