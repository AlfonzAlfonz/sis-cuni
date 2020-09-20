import * as ts from "typescript";
import { promises as fs } from "fs";

const compile = async () => {
  const input = await fs.readFile("./client/source.ts");

  const { outputText } = ts.transpileModule(input.toString(), {
    compilerOptions: {
      skipLibCheck: true,
      target: 2,
      module: 1
    }
  });

  await fs.mkdir("./out", { recursive: true });
  return fs.writeFile("out/source.txt", outputText);
};

compile();
