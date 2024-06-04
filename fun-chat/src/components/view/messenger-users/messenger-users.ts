import { classes } from '../../../common/js/constants';
import { ChildComponentProps } from '../../../types/types';
import { Div } from '../div/div';
import { Input } from '../input/input';
import { UsersList } from '../users-list/users-list';

export class MessengerUsers extends Div {
  searchField!: Input;

  usersList!: UsersList;

  constructor(props: ChildComponentProps = {}) {
    props.classNames ??= [];
    props.classNames.push(classes.messengerUsers);
    super(props);
    this.configure();
  }

  configure() {
    this.searchField = new Input();
    const usersListWrap = new Div({ classNames: [classes.usersListWrap] });
    this.usersList = new UsersList();

    usersListWrap.appendComponents(this.usersList);
    this.appendComponents(this.searchField, usersListWrap);
  }
}
