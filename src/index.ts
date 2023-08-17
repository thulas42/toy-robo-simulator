// src/index.ts
import * as readline from 'readline';
import { Robot } from './robot';
import { Table } from './table';
import { Command } from './commands';
import { TABLE_WIDTH, TABLE_HEIGHT } from './constants';

const robot = new Robot();
const table = new Table();
const command = new Command(robot, table);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const promptUser = () => {
  rl.question('Enter a command (or "exit" to quit): ', (inputCommand) => {
    if (inputCommand.trim().toLowerCase() === 'exit') {
      rl.close();
      return;
    }

    const output = command.execute(inputCommand);
    console.log(output);

    promptUser();
  });
};

promptUser();
