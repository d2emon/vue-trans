import { Module } from 'vuex';

const files = require.context('.', false);
const modules: {[s: string]: Module<any, any>} = {};

files.keys().forEach((key: string) => {
  if (key === './index.ts') return;
  modules[key] = files(key).default;
});

export default modules;
