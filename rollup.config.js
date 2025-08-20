import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';

export default [
  {
    input: 'src/index.js',
    output: [
      { file: 'dist/inactivity-logout.esm.js', format: 'es', exports: 'named' },
      { file: 'dist/inactivity-logout.cjs.js', format: 'cjs', exports: 'named' },
      { file: 'dist/inactivity-logout.umd.js', format: 'umd', name: 'IdleSessionLogout', exports: 'named' }
    ],
    plugins: [
      resolve(),
      commonjs(),
      terser()
    ]
  }
];
