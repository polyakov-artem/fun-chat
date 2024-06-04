import { ChildComponentProps } from '../../../types/types';
import { Component } from '../component/component';

export class HeaderH5 extends Component<'h5'> {
  constructor(props: ChildComponentProps = {}) {
    super({ ...props, tag: 'h5' });
  }
}
