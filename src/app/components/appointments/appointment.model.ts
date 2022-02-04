export class Appointment 
{

    public id: number = 0;
    public title: string = '';
    public description: string = '';
    public date: string = '';
    public remind_me: boolean = false;
    public time: string = '';

    constructor (id: number, title: string, description: string, date: string, remind_me: boolean) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.date = date;
        this.remind_me = remind_me;
    }

}