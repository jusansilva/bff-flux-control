export class CreateLaunchEvent {
  constructor(
    private readonly type: string,
    private readonly description: string,
    private readonly value: number,
    private readonly date: Date,
  ) {}
}
