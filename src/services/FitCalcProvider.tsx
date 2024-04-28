export function calculateIMC(weight: number, height: number) : number
{
    if (height === 0) {
        return 0;
    }
    let heightMeters = height / 100; 
    let bmi = weight / (heightMeters * heightMeters); 
    bmi = Math.round(bmi * 100) / 100;
    return bmi;
}

export function calculateAge(bornDate: string) : number
{
    const day = parseInt(bornDate.split("-")[0]);
    const month = parseInt(bornDate.split("-")[1]);
    const year = parseInt(bornDate.split("-")[2]);

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    const currentDay = new Date().getDate();

    let age = currentYear - year;
    if (currentMonth < month || (currentMonth === month && currentDay < day)) {
        age--;
    }

    return age;
}