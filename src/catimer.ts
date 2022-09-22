export class catimer {
  private work_length: Number;
  private break_length: Number;
  private long_break_length: Number;

  private session_number: Number;
  private max_sessions: Number;
  private task_name: String;
  private task_list: String[];

  private is_running: Boolean; // paused == F or working == T
  private time: Number; // TODO: update this to be an actual timer

  public constructor() {
    this.work_length = 25;
    this.break_length = 5;
    this.long_break_length = 20;

    this.session_number = 1;
    this.max_sessions = 4;
    this.task_name = "";
    this.task_list = [];

    this.is_running = false;
    this.time = this.work_length;
  }

  public get workLength(): Number {
    return this.work_length;
  }
  public get breakLength(): Number {
    return this.break_length;
  }
  public get longBreakLength(): Number {
    return this.long_break_length;
  }

  public get sessionNumber(): Number {
    return this.session_number;
  }
  public get maxSessions(): Number {
    return this.max_sessions;
  }
  public get taskName(): String {
    return this.task_name;
  }
  public get taskList(): String[] {
    return this.task_list;
  }

  public get isRunning(): Boolean {
    return this.is_running;
  }
  public get timeRemaining(): Number {
    return this.time;
  }

  public set workLength(workLength: Number) {
    this.work_length = workLength;
  }
  public set breakLength(breakLength: Number) {
    this.break_length = breakLength;
  }
  public set longBreakLength(longBreakLength: Number) {
    this.long_break_length = longBreakLength;
  }
  public set maxSessions(maxSessions: Number) {
    this.max_sessions = maxSessions;
  }
  public set setTaskName(name: String) {
    this.task_name = name;
  }

  public set addTask(task: String) {
    this.task_list.concat(task);
  }

  public changeStatus() {
    this.is_running = !this.is_running;
  }
}
