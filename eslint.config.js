import antfu from '@antfu/eslint-config'
import oxlint from 'eslint-plugin-oxlint'

import nuxt from './.nuxt/eslint.config.mjs'

export default antfu({
  unocss: true,
  formatters: true,
  pnpm: true,
}, oxlint.configs['flat/recommended'])
  .append(nuxt())
