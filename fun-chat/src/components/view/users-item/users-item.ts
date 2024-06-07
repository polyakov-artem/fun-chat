import { attributes, classes } from '../../../common/js/constants';
import { LiItem } from '../li-item/li-item';
import { UsersItemProps } from '../../../types/types';
import { Badge } from '../badge/badge';

export class UsersItem extends LiItem {
  constructor(props: UsersItemProps) {
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

    if (props.numOfUnread) {
      const badge = new Badge({ text: `${props.numOfUnread}` });
      this.appendComponents(badge);
    }
  }
}
