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
}