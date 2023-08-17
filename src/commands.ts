import { Robot } from './robot';
import { Table } from './table';
import { Direction } from './constants';

export class Command {
  private robot: Robot;
  private table: Table;

  constructor(robot: Robot, table: Table) {
    this.robot = robot;
    this.table = table;
  }

  execute(command: string): string {
    const [action, args] = command.split(' ');
    switch (action) {
      case 'PLACE':
        const [x, y, facing] = args.split(',');
        if (this.table.isValidPosition(Number(x), Number(y))) {
          this.robot.place(Number(x), Number(y), facing as Direction);
        }
        break;
      case 'MOVE':
        this.robot.move();
        break;
      case 'LEFT':
        this.robot.left();
        break;
      case 'RIGHT':
        this.robot.right();
        break;
      case 'REPORT':
        return this.robot.report();
      default:
        break;
    }
    return '';
  }
}
