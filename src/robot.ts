import { Console } from 'console';
import { DIRECTIONS, Direction, TABLE_HEIGHT, TABLE_WIDTH } from './constants';

export class Robot {
  private x = 0;
  private y = 0;
  private facing;

  constructor() {}

  place(x: number, y: number, facing: Direction): void {
      this.x = x;
      this.y = y;
      this.facing = facing;
  }

  move(): void {

    const moveDelta = this.getMoveDelta(this.facing);
    let newX = this?.x + moveDelta?.x;
    let newY = this?.y + moveDelta?.y;
    if (this.isValidPosition(newX, newY)) {
      this.x = newX;
      this.y = newY;
    }
  }

  left(): void {
    if (!this.facing) return;
    const currentIndex = DIRECTIONS.indexOf(this.facing);
    this.facing = DIRECTIONS[(currentIndex + 3) % 4];
  }

  right(): void {
    if (!this.facing) return;
    const currentIndex = DIRECTIONS.indexOf(this.facing);
    this.facing = DIRECTIONS[(currentIndex + 1) % 4];
  }

  report(): string {
    if(this.x == undefined|| this?.y == undefined || this.facing == undefined) return "Robot not placed"
    return `${this.x},${this.y},${this.facing}`;
  }

  private getMoveDelta(direction: Direction): { x: number; y: number } {
    switch (direction) {
      case Direction.NORTH:
        return { x: 0, y: 1 };
      case Direction.SOUTH:
        return { x: 0, y: -1 };
      case Direction.EAST:
        return { x: 1, y: 0 };
      case Direction.WEST:
        return { x: -1, y: 0 };
    }
  }

  private isValidPosition(x: number, y: number): boolean {
    return x >= 0 && x < TABLE_WIDTH && y >= 0 && y < TABLE_HEIGHT;
  }
}
