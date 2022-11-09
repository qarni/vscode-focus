export class catimer {

  private work_length: number;
  private break_length: number;
  private long_break_length: number;

  private session_number: number;
  private max_sessions: number;
  private task_name: String;

  private paused: Boolean; // paused == F or working == T
  private minutes_remaining: number;
  private seconds_remianing: number;
  private session_type : number; //work 1, break 2, long break 3

  public constructor() {
      this.work_length = 25;
      this.break_length = 5;
      this.long_break_length = 15;

      this.session_number = 1;
      this.max_sessions = 4;
      this.task_name = "";

      this.paused = false;
      this.minutes_remaining = 0;
      this.seconds_remianing = 0;
      this.session_type = 1;   // W B OR L
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

  public set workLength(workLength: number) {
    this.work_length = workLength;
  }

  public set breakLength(breakLength: number) {
    this.break_length = breakLength;
  }

  public set longBreakLength(longBreakLength: number) {
    this.long_break_length = longBreakLength;
  }

  public set maxSessions(maxSessions: number) {
    this.max_sessions = maxSessions;
  }

  public get isPaused() : Boolean {
      return this.paused;
  }
  public get timeRemaining() : String {
      return this.minutes_remaining + ":" + this.seconds_remianing;
  }
  public get sessionType() : number {
      return this.session_type;
  }
  public get remainingMin () {
      return this.minutes_remaining;
  }
  public get remainingSec () {
      return this.seconds_remianing;
  }

  public set setTaskName(name : String) {
      this.task_name = name;
  }
  public changeStatus () {
      this.paused = !this.paused;
  }
  public setTimeRemaining (min : number, sec : number) {
      this.minutes_remaining = min;
      this.seconds_remianing = sec;
  }
  public setSessionType (newSessionType : number) {
      this.session_type = newSessionType;
  }
  public setSessionNumber (newNum : number) {
      this.session_number = newNum;
  }
}