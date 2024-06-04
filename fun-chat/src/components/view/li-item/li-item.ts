import { ChildComponentProps } from '../../../types/types';
import { Component } from '../component/component';

export class LiItem extends Component<'li'> {
  constructor(props: ChildComponentProps = {}) {
    super({ ...props, tag: 'li' });
  }
}
