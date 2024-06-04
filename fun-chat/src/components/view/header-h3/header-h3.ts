import { ChildComponentProps } from '../../../types/types';
import { Component } from '../component/component';

export class HeaderH3 extends Component<'h3'> {
  constructor(props: ChildComponentProps = {}) {
    super({ ...props, tag: 'h3' });
  }
}
