import { classes } from '../../../common/js/constants';
import { ChildComponentProps } from '../../../types/types';
import { Component } from '../component/component';

export class List extends Component<'ul'> {
  constructor(props: ChildComponentProps = {}) {
    props.classNames ??= [];
    props.classNames.push(classes.list);
    super({ ...props, tag: 'ul' });
  }
}
