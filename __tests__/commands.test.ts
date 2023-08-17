// __tests__/commands.test.ts
import { Robot } from '../src/robot';
import { Table } from '../src/table';
import { Command } from '../src/commands';
import { TABLE_WIDTH, TABLE_HEIGHT } from '../src/constants';

describe('Toy Robot Simulator', () => {
  let robot: Robot;
  let table: Table;
  let command: Command;

  beforeEach(() => {
    robot = new Robot();
    table = new Table();
    command = new Command(robot, table);
  });

  test('PLACE command places the robot on the table', () => {
    command.execute('PLACE 0,0,NORTH');
    expect(robot.report()).toBe('0,0,NORTH');
  });

  test('MOVE command moves the robot one step in the facing direction', () => {
    command.execute('PLACE 0,0,NORTH');
    command.execute('MOVE');
    expect(robot.report()).toBe('0,1,NORTH');
  });

  test('MOVE command is ignored if it would cause the robot to fall off', () => {
    command.execute('PLACE 0,0,SOUTH');
    command.execute('MOVE');
    expect(robot.report()).toBe('0,0,SOUTH');
  });

  test('LEFT command rotates the robot 90 degrees to the left', () => {
    command.execute('PLACE 0,0,NORTH');
    command.execute('LEFT');
    expect(robot.report()).toBe('0,0,WEST');
  });

  test('RIGHT command rotates the robot 90 degrees to the right', () => {
    command.execute('PLACE 0,0,EAST');
    command.execute('RIGHT');
    expect(robot.report()).toBe('0,0,SOUTH');
  });

  test('REPORT command provides the current robot position and direction', () => {
    command.execute('PLACE 2,3,WEST');
    const report = command.execute('REPORT');
    expect(report).toBe('2,3,WEST');
  });

  test('Invalid commands should be ignored', () => {
    command.execute('PLACE 1,1,EAST');
    command.execute('INVALID_COMMAND');
    expect(robot.report()).toBe('1,1,EAST');
  });

  test('Repeated PLACE commands should update robot position', () => {
    command.execute('PLACE 0,0,NORTH');
    command.execute('PLACE 3,2,EAST');
    expect(robot.report()).toBe('3,2,EAST');
  });

  test('Robot should not fall off the table', () => {
    command.execute(`PLACE ${TABLE_WIDTH - 1},${TABLE_HEIGHT - 1},NORTH`);
    command.execute('RIGHT');
    command.execute('MOVE');
    expect(robot.report()).toBe(`${TABLE_WIDTH - 1},${TABLE_HEIGHT - 1},EAST`);
  });
  
  test('Robot should ignore commands if not placed', () => {
    command.execute('MOVE');
    command.execute('LEFT');
    command.execute('RIGHT');
    command.execute('REPORT');
    expect(robot.report()).toBe('Robot not placed');
  });
});
