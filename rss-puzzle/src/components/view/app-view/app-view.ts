import { Page } from '../page/page';

export class AppView {
  page!: Page;
  init() {
    this.page = new Page();
  }
}
