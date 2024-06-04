import { ChildComponentProps } from '../../../types/types';
import { Component } from '../component/component';

export class Span extends Component<'span'> {
  constructor(props: ChildComponentProps = {}) {
    super({ ...props, tag: 'span' });
  }
}
