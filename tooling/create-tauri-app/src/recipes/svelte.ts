// Copyright 2019-2021 Tauri Programme within The Commons Conservancy
// SPDX-License-Identifier: Apache-2.0
// SPDX-License-Identifier: MIT

import { join } from 'path'
import { shell } from '../shell'
import { Recipe } from '../types/recipe'

const completeLogMsg = `
  Your installation completed.
  To start, run yarn tauri:serve
`

const svelte: Recipe = {
  descriptiveName: {
    name: 'Svelte (https://svelte.dev/)',
    value: 'svelte'
  },
  shortName: 'svelte',
  extraNpmDevDependencies: [],
  extraNpmDependencies: [],
  configUpdate: ({ cfg }) => ({
    ...cfg,
    distDir: `../public`,
    devPath: 'http://localhost:5000',
  }),
  preInit: async ({ cwd, cfg }) => {
    await shell(
      'npx',
      [
        'degit',
        'sveltejs/template',
        `${cfg.appName}`,
      ],
      { cwd }
    )

    cwd = `${cwd}/${cfg.appName}`

    // Add Typescript
    await shell(
      'node',
      [
        'scripts/setupTypeScript.js',
      ],
      { cwd }
    )

  },
  postInit: async () => {
    console.log(completeLogMsg)
    return await Promise.resolve()
  }
}

export { svelte }
