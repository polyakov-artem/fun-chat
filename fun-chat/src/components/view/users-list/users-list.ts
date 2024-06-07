import { classes } from '../../../common/js/constants';
import { ChildComponentProps, UpdateUsersListOptions } from '../../../types/types';
import { List } from '../list/list';
import { UsersItem } from '../users-item/users-item';

export class UsersList extends List {
  constructor(props: ChildComponentProps = {}) {
    props.classNames ??= [];
    props.classNames.push(classes.usersList);
    super(props);
  }

  updateUsersList(options: UpdateUsersListOptions) {
    this.removeComponents();

    if (options.users === null) return;

    options.users.forEach((user) => {
      const isHidden = !user.login.includes(options.filterText);
      const isSelected = user.login === options.selectedUser?.login;

      const item = new UsersItem({
        isHidden,
        isSelected,
        text: user.login,
        isLogined: user.isLogined,
      });

      this.appendComponents(item);
    });
  }
}
