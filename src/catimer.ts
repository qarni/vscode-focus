class catimer {

    private work_length: Number;
    private break_length: Number;
    private long_break_length: Number;

    private session_number: Number;
    private max_sessions: Number;
    private task_name: String;

    public constructor() {
        this.work_length = 25;
        this.break_length = 5;
        this.long_break_length = 20;

        this.session_number = 0;
        this.max_sessions = 4;
        this.task_name = "";
    }


}
