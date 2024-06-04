import { classes } from '../../../common/js/constants';
import { Span } from '../span/span';
import { Img } from '../img/img';
import logoSrc from '../../../assets/images/rs-logo.webp';
import { Link } from '../link/link';
import { Div } from '../div/div';

export class MessengerFooter extends Div {
  constructor() {
    super({ classNames: [classes.messengerFooter] });
    this.configure();
  }

  configure() {
    const img = new Img({
      classNames: [classes.logo],
      attr: { alt: 'Logo', src: logoSrc },
    });

    const logoWrap = new Span({ classNames: [classes.messengerFooterLogo] });
    const link = new Link({
      text: 'Polyakov Artem',
      attr: { href: 'https://github.com/polyakov-artem' },
    });

    const schoolName = new Span({ text: 'RS School' });
    const year = new Span({ text: '2024' });

    logoWrap.appendComponents(img, schoolName);
    this.appendComponents(logoWrap, year, link);
  }
}
