import { Component } from '../component/component';
import { classes } from '../../../common/js/constants';
import { ChildComponentProps } from '../../../types/types';

export class Button extends Component<'button'> {
  constructor(props: ChildComponentProps = {}) {
    props.classNames ??= [];
    props.classNames.push(classes.btn);
    super({ ...props, tag: 'button' });
  }
}
