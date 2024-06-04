import { classes } from '../../../common/js/constants';
import { ChildComponentProps } from '../../../types/types';
import { Component } from '../component/component';

export class Page extends Component<'div'> {
  constructor(props: ChildComponentProps = {}) {
    props.classNames ??= [];
    props.classNames.push(classes.page);
    super({ ...props, tag: 'div' });
  }

  redraw(): void {
    const bodyElementsSelector = 'body > *:not(script)';
    const bodyElement = document.body.querySelectorAll(bodyElementsSelector);
    bodyElement.forEach((element) => element.remove());
    document.body.append(this.node);
  }
}
