export class AuthStateProvider
{
    public async getUserAuthState(): Promise<User> 
    {   
        //TODO: Implement method to bring user from API
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