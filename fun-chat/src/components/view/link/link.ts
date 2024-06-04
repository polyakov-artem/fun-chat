import { ChildComponentProps } from '../../../types/types';
import { Component } from '../component/component';

export class Link extends Component<'a'> {
  constructor(props: ChildComponentProps = {}) {
    props.attr ??= {};
    props.attr.href ??= '';
    props.attr.target ??= '_blank';
    super({ ...props, tag: 'a' });
  }
}
