import { classes } from '../../../common/js/constants';
import { ChildComponentProps, Message, UpdateUsersListOptions } from '../../../types/types';
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

    const { users, allUsersHistory, filterText, selectedUser } = options;

    if (!allUsersHistory || !users) return;

    users.forEach((user) => {
      const isHidden = !user.login.includes(filterText);
      const isSelected = user.login === selectedUser?.login;
      const userHistory = allUsersHistory.find((item) => item.login === user.login);

      let numOfUnread = 0;

      if (userHistory) {
        numOfUnread = userHistory.messages.reduce((total: number, message: Message) => {
          if (message.from === user.login || message.status.isReaded) return total;
          return total + 1;
        }, 0);
      }

      const item = new UsersItem({
        isHidden,
        isSelected,
        numOfUnread,
        text: user.login,
        isLogined: user.isLogined,
      });

      this.appendComponents(item);
    });
  }
}
