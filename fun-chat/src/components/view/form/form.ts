import { ChildComponentProps } from '../../../types/types';
import { Component } from '../component/component';

export class Form extends Component<'form'> {
  constructor(props: ChildComponentProps = {}) {
    props.attr ??= {};
    props.attr.action ??= '';
    super({ ...props, tag: 'form' });
  }
}
