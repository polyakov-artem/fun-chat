import { classes } from '../../../common/js/constants';
import { ChildComponentProps, RegisteredUser } from '../../../types/types';
import { List } from '../list/list';
import { UsersItem } from '../users-item/users-item';

export class UsersList extends List {
  constructor(props: ChildComponentProps = {}) {
    props.classNames ??= [];
    props.classNames.push(classes.usersList);
    super(props);
  }

  configure(users: RegisteredUser[] | null) {
    this.removeComponents();
    if (users === null) return;

    users.forEach((user) => {
      const item = new UsersItem({ text: user.login, isLogined: user.isLogined });
      this.appendComponents(item);
    });
  }
}
