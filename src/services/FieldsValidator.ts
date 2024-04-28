export class FieldsValidator
{
    public static validateField(ref: string, value: string): boolean {
        switch (ref) {
            case 'email':
                return FieldsValidator.validateEmail(value);
            case 'password':
                return FieldsValidator.validatePassword(value);
            case 'username':
                return FieldsValidator.validateUsername(value);
            case 'name':
                return FieldsValidator.validateName(value);
            case 'last-name':
                return FieldsValidator.validateName(value);
            case 'height':
                return FieldsValidator.validateHeight(value);
            case 'weight':
                return FieldsValidator.validateWeight(value);
            case 'bornDate':
                return FieldsValidator.validateBornDate(value);
            case 'age':
                return true;
            case 'imc':
                return true;
            default:
                return true;
        }
    }
    public static validateEmail(email: string): boolean
    {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return emailRegex.test(email);
    }

    public static validatePassword(password: string): boolean
    {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        return passwordRegex.test(password);
    }

    public static validateUsername(username: string): boolean
    {
        const usernameRegex = /^[a-zA-Z0-9._-]{4,}$/;
        return usernameRegex.test(username);
    }

    public static validateName(name: string): boolean
    {
        const nameRegex = /^[a-zA-Z\s]{4,}$/;
        return nameRegex.test(name);
    }

    public static validateHeight(height: string): boolean
    {
        const heightRegex = /^[1-2]{1}[0-9]{1,2}$/;
        return heightRegex.test(height);
    }

    public static validateWeight(weight: string): boolean
    {
        const weightRegex = /^[0-9]{1,3}$/;
        return weightRegex.test(weight);
    }

    public static validateBornDate(bornDate: string): boolean
    {
        const date = bornDate.split('-');
        const day = parseInt(date[0]);
        const month = parseInt(date[1]);
        const year = parseInt(date[2]);
        const currentYear = new Date().getFullYear();

        console.log("day", day);
        console.log("month", month);
        console.log("year", year);

        if (currentYear - year < 18) {
            return false;
        }
        if (currentYear - year === 18) {
            if (month > new Date().getMonth() + 1) {
                return false;
            }
            if (month === new Date().getMonth() + 1) {
                if (day > new Date().getDate()) {
                    return false;
                }
            }
        }

        const bornDateRegex = /^[0-9]{2}-[0-9]{2}-[0-9]{4}$/;

        return bornDateRegex.test(bornDate);
    }
}