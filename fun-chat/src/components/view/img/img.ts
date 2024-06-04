import { ChildComponentProps } from '../../../types/types';
import { Component } from '../component/component';

export class Img extends Component<'img'> {
  constructor(props: ChildComponentProps = {}) {
    props.attr ??= {};
    props.attr.alt ??= '';
    super({ ...props, tag: 'img' });
  }
}
