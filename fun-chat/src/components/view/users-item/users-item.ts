import { classes } from '../../../common/js/constants';
import { LiItem } from '../li-item/li-item';
import { UsersItemProps } from '../../../types/types';

export class UsersItem extends LiItem {
  constructor(props: UsersItemProps = { isLogined: false }) {
    props.classNames ??= [];
    props.classNames.push(classes.usersItem);
    super(props);
    this.configure(props);
  }

  configure(props: UsersItemProps) {
    props.isLogined && this.addClass(classes.usersItemActive);
  }
}
