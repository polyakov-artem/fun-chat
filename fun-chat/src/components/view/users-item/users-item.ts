import { attributes, classes } from '../../../common/js/constants';
import { LiItem } from '../li-item/li-item';
import { UsersItemProps } from '../../../types/types';

export class UsersItem extends LiItem {
  constructor(props: UsersItemProps = {}) {
    props.classNames ??= [];
    props.classNames.push(classes.usersItem);
    super(props);
    this.configure(props);
  }

  configure(props: UsersItemProps) {
    props.isLogined && this.addClass(classes.usersItemActive);
    props.isSelected && this.addClass(classes.usersItemSelected);
    props.isHidden && this.addClass(classes.usersItemHidden);

    this.setAttribute(attributes.usersItem.login, props.text || '');
  }
}
