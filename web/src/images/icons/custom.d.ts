//in order to import svg files in typescript
declare module "*.svg" {
  const content: any;
  export default content;
}
