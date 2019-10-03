export class Time {
  public readonly minutes: number;
  public readonly seconds: number;
  public readonly name: string;

  constructor(minutes: number = 0, seconds: number = 0, name: string = "Task") {
    this.minutes = Time.clamp(minutes, 0, 99);
    this.seconds = Time.clamp(seconds, 0, 59);
    this.name = name;
  }

  public toString() {
    return `${this.minutes < 10 ? "0" : ""}${this.minutes}:${
      this.seconds < 10 ? "0" : ""
    }${this.seconds}`;
  }

  public reduceByOneSecond(): Time {
    const time = Time.fromTime(this);
    let newMinutes = time.minutes;
    let newSeconds = time.seconds - 1;

    if (newMinutes <= 0 && newSeconds <= 0) return new Time();

    if (newSeconds < 0) {
      newMinutes--;
      newSeconds = 59;
    }

    return new Time(newMinutes, newSeconds);
  }

  public equals(other: Time) {
    return this.minutes === other.minutes && this.seconds === other.seconds;
  }

  public toSeconds = () => this.minutes * 60 + this.seconds;

  private static clamp(x: number, min: number, max: number) {
    return Math.max(min, Math.min(x, max));
  }

  public static fromTime = (time: Time) =>
    new Time(time.minutes, time.seconds, time.name);
}
