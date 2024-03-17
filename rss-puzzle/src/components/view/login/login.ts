import { classes } from '../../../common/js/constants';
import { createDomElement } from '../../utils/utils';
import { LoginBlock } from '../login-block/login-block';

export class Login {
  node!: HTMLElement;
  loginBlock!: LoginBlock;
  getNode() {
    if (!this.node) {
      this.node = this.createNode();
    }

    return this.node;
  }

  createNode() {
    const node = createDomElement({ tag: 'main', classNames: [classes.login] });
    const container = createDomElement({ classNames: [classes.loginInner, classes.container] });
    const window = createDomElement({
      classNames: [classes.window, classes.windowTransparent, classes.windowSmall],
    });

    if (!this.loginBlock) {
      this.loginBlock = new LoginBlock();
    }

    node.append(container);
    container.append(window);
    window.append(this.loginBlock.getNode());

    return node;
  }
}
