import globals from 'globals'
import pluginJs from '@eslint/js'
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended')

export default [
  { files: ['**/*.js'], languageOptions: { sourceType: 'commonjs' } },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  eslintPluginPrettierRecommended,
]
