import typescript from '@rollup/plugin-typescript';
import pkg from './package.json';

const external = ['react'].concat(Object.keys(pkg.dependencies || []));

const config = [
  {
    input: 'src/index.ts',
    external,
    plugins: [
      typescript({
        tsconfig: './tsconfig.json',
        outDir: './dist',
        declaration: true,
        declarationDir: './dist',
      }),
    ],
    output: { dir: './dist', format: 'cjs', sourcemap: true },
  },
  {
    input: 'src/index.ts',
    external,
    plugins: [
      typescript({
        tsconfig: './tsconfig.json',
        outDir: './dist/esm',
        declaration: false,
      }),
    ],
    output: {
      dir: './dist/esm',
      format: 'es',
      sourcemap: true,
      preserveModules: true,
    },
  },
];

export default config;
