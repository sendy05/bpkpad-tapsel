#!/usr/bin/env node
import { spawn } from 'child_process';

const prismaCmd = process.platform === 'win32' ? 'npx.cmd' : 'npx';
const child = spawn(prismaCmd, ['prisma', 'generate'], { stdio: 'inherit' });

child.on('exit', (code) => {
  if (code !== 0) {
    console.error(`Prisma generate failed with code ${code}`);
    process.exit(code);
  }
});
