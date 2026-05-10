import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '4mclrukh',
    dataset: 'production'
  },
  deployment: {
    appId: 'xl8hl6wv4gdf4qdijjrezmmp',
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
  }
})
