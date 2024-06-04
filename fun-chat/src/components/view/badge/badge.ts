import { classes } from '../../../common/js/constants';
import { ChildComponentProps } from '../../../types/types';
import { Span } from '../span/span';

export class Badge extends Span {
  constructor(props: ChildComponentProps = {}) {
    props.classNames ??= [];
    props.classNames.push(classes.badge);
    super(props);
  }
}
