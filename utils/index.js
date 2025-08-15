import { App, Component } from 'vue';

export function withInstall(component) {
  component.install = (app) => {
    app.component(component.name || 'UnknownComponent', component);
  };
  return component;
}