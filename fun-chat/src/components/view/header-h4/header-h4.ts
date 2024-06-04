import { ChildComponentProps } from '../../../types/types';
import { Component } from '../component/component';

export class HeaderH4 extends Component<'h4'> {
  constructor(props: ChildComponentProps = {}) {
    super({ ...props, tag: 'h4' });
  }
}
