import { Page } from '../page/page';
import { classes } from '../../../common/js/constants';
import { InfoBlock } from '../info-block/info-block';
import { ChildComponentProps } from '../../../types/types';
import { Div } from '../div/div';

export class InfoPage extends Page {
  constructor(props: ChildComponentProps = {}) {
    props.classNames ??= [];
    props.classNames.push(classes.infoPage);
    super(props);
    this.configure();
  }

  configure() {
    const pageInner = new Div({
      classNames: [classes.pageInner, classes.pageInnerPlaceCenter, classes.container],
    });
    const infoBlock = new InfoBlock();
    pageInner.appendComponents(infoBlock);
    this.appendComponents(pageInner);
  }
}

export const infoPage = new InfoPage();
