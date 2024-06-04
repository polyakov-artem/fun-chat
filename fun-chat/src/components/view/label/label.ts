import { ChildComponentProps } from '../../../types/types';
import { Component } from '../component/component';

export class Label extends Component<'label'> {
  constructor(props: ChildComponentProps = {}) {
    super({ ...props, tag: 'label' });
  }
}
