import { TABLE_WIDTH, TABLE_HEIGHT } from './constants';

export class Table {
  constructor() {}

  isValidPosition(x: number, y: number): boolean {
    return x >= 0 && x < TABLE_WIDTH && y >= 0 && y < TABLE_HEIGHT;
  }
}
