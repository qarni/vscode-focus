export class catimer {

  private work_length: number;
  private break_length: number;
  private long_break_length: number;

  private session_number: number;
  private max_sessions: number;
  private task_name: String;

  private is_running: Boolean; // paused == F or working == T
  private minutes_remaining: number;
  private seconds_remianing: number;
  private session_name : String; //work, break, long break

  public constructor() {
      this.work_length = 25;
      this.break_length = 5;
      this.long_break_length = 15;

      this.session_number = 1;
      this.max_sessions = 4;
      this.task_name = "";

      this.is_running = false;
      this.minutes_remaining = this.work_length;
      this.seconds_remianing = 0;
      this.session_name = "work";
  }

  public get workLength() : number {
      return this.work_length;
  }
  public get breakLength() : number {
      return this.break_length;
  }
  public get longBreakLength() : number {
      return this.long_break_length;
  }

  public get sessionNumber() : number {
      return this.session_number;
  }
  public get maxSessions() : number {
      return this.max_sessions;
  }
  public get taskName() : String {
      return this.task_name;
  }

  public get isRunning() : Boolean {
      return this.is_running;
  }
  public get timeRemaining() : String {
      return this.minutes_remaining + ":" + this.seconds_remianing;
  }
  public get sessionName() : String {
      return this.session_name;
  }

  public set setTaskName(name : String) {
      this.task_name = name;
  }
  public changeStatus () {
      this.is_running = !this.is_running;
  }
  public setTimeRemaining (min : number, sec : number) {
      this.minutes_remaining = min;
      this.seconds_remianing = sec;
  }
  public setSessionName (newSessionName : String) {
      this.session_name = newSessionName;
  }
}