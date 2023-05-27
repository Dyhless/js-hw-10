declare module 'slim-select/dist/slimselect.min' {
  interface SlimSelectOptions {
    select: string | HTMLElement;
  }

  class SlimSelect {
    constructor(options: SlimSelectOptions);
  }

  export default SlimSelect;
}
