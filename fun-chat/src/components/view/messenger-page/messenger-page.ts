import { Page } from '../page/page';
import { attributes, classSelectors, classes } from '../../../common/js/constants';
import { Messenger } from '../messenger/messenger';
import { ChildComponentProps } from '../../../types/types';
import { Div } from '../div/div';
import { messengerController } from '../../controller/messenger-controller/messenger-controller';

export class MessengerPage extends Page {
  messenger!: Messenger;

  constructor(props: ChildComponentProps = {}) {
    props.classNames ??= [];
    props.classNames.push(classes.messengerPage);
    super(props);
    this.configure();
    this.addListeners();
  }

  configure() {
    const pageInner = new Div({
      classNames: [classes.pageInner, classes.pageInnerPlaceCenter, classes.container],
    });

    this.messenger = new Messenger();
    pageInner.appendComponents(this.messenger);
    this.appendComponents(pageInner);
  }

  addListeners() {
    this.addEventListener('click', (e: Event) => {
      if (!e?.target) {
        messengerController.setSelectedUser(null);
        return;
      }

      const usersItem: HTMLElement | null = (e.target as HTMLElement)!.closest(
        classSelectors.usersItem,
      );

      if (usersItem !== null) {
        messengerController.setSelectedUser(usersItem.getAttribute(attributes.usersItem.login));
        return;
      }

      const chatAreaClasses: string[] = [
        classes.messengerHistoryContent,
        classes.messengerTextForm,
      ];

      let currentElement: HTMLElement = e.target as HTMLElement;

      while (currentElement !== this.node) {
        if (chatAreaClasses.some((className) => currentElement.classList.contains(className))) {
          return;
        }

        currentElement = currentElement.parentElement as HTMLElement;
      }

      messengerController.setSelectedUser(null);
    });
  }
}

export const messengerPage = new MessengerPage();
