export function fileToBase64(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            // reader.result содержит data URL, начинающийся с "data:image/jpeg;base64,"
            const dataURL = reader.result as string;

            // Разделяем строку по запятой и берем вторую часть (после "base64,")
            const base64String = dataURL.split(',')[1];

            resolve(base64String);
        };
        reader.onerror = (error) => reject(error);

        reader.readAsDataURL(file);
    });
}