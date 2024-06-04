import { ABOUT_APP_TEXT, classes } from '../../../common/js/constants';
import { HeaderH1 } from '../header-h1/header-h1';
import { Paragraph } from '../paragraph/paragraph';
import { Link } from '../link/link';
import { ButtonPrimary } from '../button-primary/button-primary';
import { Div } from '../div/div';
import { ChildComponentProps } from '../../../types/types';

export class InfoBlock extends Div {
  returnBtn!: ButtonPrimary;

  constructor(props: ChildComponentProps = {}) {
    props.classNames ??= [];
    props.classNames.push(classes.infoBlock, classes.window);
    super(props);
    this.configure();
  }

  configure() {
    const title = new HeaderH1({ text: 'Fun Chat', classNames: [classes.h1] });
    const textContent = new Paragraph({ text: ABOUT_APP_TEXT });
    this.returnBtn = new ButtonPrimary({
      text: 'Return',
    });
    const link = new Link({
      text: 'Author: Polyakov Artem',
      attr: { href: 'https://github.com/polyakov-artem' },
    });

    this.appendComponents(title, textContent, link, this.returnBtn);
  }
}
