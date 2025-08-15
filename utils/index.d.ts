import { App, Component } from 'vue';

export function withInstall(component: Component): Component & { install: (app: App) => void };
