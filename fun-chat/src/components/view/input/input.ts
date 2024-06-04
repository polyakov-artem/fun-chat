import { classes } from '../../../common/js/constants';
import { ChildComponentProps } from '../../../types/types';
import { Component } from '../component/component';

export class Input extends Component<'input'> {
  constructor(props: ChildComponentProps = {}) {
    props.classNames ??= [];
    props.classNames.push(classes.input);
    super({ ...props, tag: 'input' });
  }
}
