import { classes } from '../../../common/js/constants';
import { ChildComponentProps } from '../../../types/types';
import { List } from '../list/list';

export class UsersList extends List {
  constructor(props: ChildComponentProps = {}) {
    props.classNames ??= [];
    props.classNames.push(classes.usersList);
    super(props);
  }
}
