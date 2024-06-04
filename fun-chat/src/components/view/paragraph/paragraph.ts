import { ChildComponentProps } from '../../../types/types';
import { Component } from '../component/component';

export class Paragraph extends Component<'p'> {
  constructor(props: ChildComponentProps = {}) {
    super({ ...props, tag: 'p' });
  }
}
