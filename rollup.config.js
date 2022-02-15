import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';

const external = ['react', 'formik'];

const config = [
  {
    input: 'src/core/index.ts',
    plugins: [
      typescript({
        tsconfig: 'tsconfig.json',
      }),
    ],
    external: external.concat(Object.keys(pkg.dependencies || [])),
    output: [
      { dir: './dist', format: 'cjs', sourcemap: true },
      {
        dir: './dist/esm',
        format: 'es',
        sourcemap: true,
        preserveModules: true,
      },
    ],
  },
];

export default config;
