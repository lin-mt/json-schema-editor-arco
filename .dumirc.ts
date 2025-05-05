import { defineConfig } from 'dumi';

export default defineConfig({
  outputPath: 'docs-dist',
  alias: {
    src: './src',
  },
  base: '/json-schema-editor-arco/',
  publicPath: '/json-schema-editor-arco/',
  themeConfig: {
    name: 'Flode',
    socialLinks: {
      github: 'https://github.com/lin-mt/json-schema-editor-arco',
    },
  },
});
