import { Component } from '../component/component';
import { ChildComponentProps } from '../../../types/types';

export class Div extends Component<'div'> {
  constructor(props: ChildComponentProps = {}) {
    super({ ...props, tag: 'div' });
  }
}
