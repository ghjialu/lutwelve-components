// 动态导出目录名数组
const fileNames = ['chartsType', 'rankingType', 'summaryType'];
const componentImports = [
  import.meta.glob('./chartsType/*.vue'),
  import.meta.glob('./rankingType/*.vue'),
  import.meta.glob('./summaryType/*.vue'),
];
// 导出组件对象
export const components: Record<string, any> = {};
// 导出加载组件的异步函数
export const loadComponents = async () => {
  for (const [index, component] of componentImports.entries()) {
    const currentDir = fileNames[index];
    for (const path in component) {
      const module = await component[path]();
      const regex = new RegExp(`^\\.\\/${currentDir}\\/(.*)\\.\\w+$`);
      const componentName = path.replace(regex, '$1');
      components[componentName] = (module as { default: any }).default;
    }
  }
  return components;
};
loadComponents().then((res) => console.log(res));
