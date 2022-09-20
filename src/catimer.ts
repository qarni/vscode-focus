export class catimer {

    private work_length: Number;
    private break_length: Number;
    private long_break_length: Number;

    private session_number: Number;
    private max_sessions: Number;
    private task_name: String;

    private status: Boolean; // paused == F or working == T
    private time: Number;   // TODO: update this to be an actual timer


    public constructor() {
        this.work_length = 25;
        this.break_length = 5;
        this.long_break_length = 20;

        this.session_number = 1;
        this.max_sessions = 4;
        this.task_name = "";

        this.status = false;
        this.time = this.work_length;
    }

    public get workLength() : Number {
        return this.work_length;
    }
    public get breakLength() : Number {
        return this.break_length;
    }
    public get longBreakLength() : Number {
        return this.long_break_length;
    }

    public get sessionNumber() : Number {
        return this.session_number;
    }
    public get maxSessions() : Number {
        return this.max_sessions;
    }
        public get taskName() : String {
        return this.task_name;
    }

    public get currStatus() : Boolean {
        return this.status;
    }
    public get timeRemaining() : Number {
        return this.time;
    }
    
}
