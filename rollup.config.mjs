import vue from 'rollup-plugin-vue';
import typescript from 'rollup-plugin-typescript2';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import css from 'rollup-plugin-css-only';
import less from 'rollup-plugin-less';
import alias from '@rollup/plugin-alias';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);


const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
      exports: 'named',
    },
    {
      file: 'dist/index.esm.js',
      format: 'es',
      exports: 'named',
    },
  ],
  plugins: [
    alias({
      entries: [
        { find: '/@', replacement: path.resolve(__dirname, '.') }
      ]
    }),
    nodeResolve(),
    commonjs(),
    vue({
      target: 'browser',
      css: true,
      exposeFilename: false,
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith('vue-component-') || tag === 'Loading3QuartersOutlined' || tag === 'Tooltip' || tag === 'div' || tag === 'img' || tag === 'span' || tag === 'template' || tag === 'transition' || tag === 'keep-alive' || tag === 'slot' || tag === 'teleport' || tag === 'component' || tag === 'suspense' || tag === 'fragment' || tag === 'text' || tag === 'comment' || tag === 'static' || tag === 'portal' || tag === 'model' || tag === 'slot-scope' || tag === 'transition-group' || tag === 'keep-alive-include' || tag === 'router-link' || tag === 'router-view' || tag === 'scroll-view' || tag === 'cover-view' || tag === 'movable-view' || tag === 'icon' || tag === 'progress'
        }
      }
    }),
    css({
      output: 'dist/index.css',
    }),
    typescript({
      tsconfig: './tsconfig.json',
      tsconfigOverride: {
        compilerOptions: {
          declaration: true,
          outDir: 'dist',
          allowImportingTsExtensions: true,
          noEmit: true,
        },
        include: ['src/**/*', 'utils/**/*', 'HLCardComponent/**/*'],
        exclude: ['node_modules'],
      },
      include: ['**/*.ts', '**/*.tsx'],
      exclude: ['node_modules'],
    }),
  ],
  external: ['vue'],
}