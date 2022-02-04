export class User 
{

    private id: number;
    public username: string;
    public PersonalInformation = {
        first_name: '',
        last_name: '',
        email: ''
    };
    private _token: string;
    private tokenExpiredAt: Date;
    public verified: boolean = false;

    get token () {
        return this._token;
    }

    constructor (id: number, username: string, first_name: string, last_name: string, email: string, token: string, tokenExpiredAt: Date, verified: boolean) {
        this.id = id;
        this.username = username;
        this.PersonalInformation.first_name = first_name;
        this.PersonalInformation.last_name = last_name;
        this.PersonalInformation.email = email;
        this._token = token;
        this.tokenExpiredAt = tokenExpiredAt;
        this.verified = verified;
    }

}