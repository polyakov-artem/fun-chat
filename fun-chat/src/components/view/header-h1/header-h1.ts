import { ChildComponentProps } from '../../../types/types';
import { Component } from '../component/component';

export class HeaderH1 extends Component<'h1'> {
  constructor(props: ChildComponentProps = {}) {
    super({ ...props, tag: 'h1' });
  }
}
