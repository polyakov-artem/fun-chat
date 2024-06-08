import { classes } from '../../../common/js/constants';
import { AllUsersHistory, ChildComponentProps, RegisteredUser } from '../../../types/types';
import { appModel } from '../../model/app-model/app-model';
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
    this.addEventListeners();
    this.addModelListeners();
  }

  configure() {
    this.searchField = new Input();
    const usersListWrap = new Div({ classNames: [classes.usersListWrap] });
    this.usersList = new UsersList();

    usersListWrap.appendComponents(this.usersList);
    this.appendComponents(this.searchField, usersListWrap);
  }

  addEventListeners() {
    this.searchField.addEventListener('input', () => {
      this.updateUsersList();
    });
  }

  addModelListeners() {
    appModel.selectedUser.subscribe(() => {
      this.updateUsersList();
    });

    appModel.allUsersHistory.subscribe(() => {
      this.updateUsersList();
    });
  }

  updateUsersList(): void {
    const users: RegisteredUser[] | null = appModel.allUsers.getValue();
    const allUsersHistory: AllUsersHistory | null = appModel.allUsersHistory.getValue();
    const filterText: string = this.searchField.node.value;
    const selectedUser: RegisteredUser | null = appModel.selectedUser.getValue();

    this.usersList.updateUsersList({ users, allUsersHistory, filterText, selectedUser });
  }
}
