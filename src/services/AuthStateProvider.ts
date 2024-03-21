export class AuthStateProvider
{
    public getUserAuthState(): User 
    {   
        return {
            id: '1',
            name: 'Tomas Parra',
            email: 'tparra@unal.edu.co',
            token: 'testing_token_here',
            username: 'Tomas1802',
            HasAnsweredSurvey: false
        };
    }
}