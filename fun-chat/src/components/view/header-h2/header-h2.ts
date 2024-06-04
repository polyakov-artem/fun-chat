import { ChildComponentProps } from '../../../types/types';
import { Component } from '../component/component';

export class HeaderH2 extends Component<'h2'> {
  constructor(props: ChildComponentProps = {}) {
    super({ ...props, tag: 'h2' });
  }
}
