import { ModalBlock } from '../modal-block/modal-block';
import { ModalBlockProps } from '../../../types/types';
import { classes, errorsNames } from '../../../common/js/constants';
import { Paragraph } from '../paragraph/paragraph';
import { Span } from '../span/span';
import { Div } from '../div/div';

export class ReconnectionModalBlock extends ModalBlock {
  constructor(props: ModalBlockProps = {}) {
    props.message ??= {};
    props.message.title = errorsNames.connectionError;
    props.message.closeable = false;
    super(props);
    this.configureBlock();
  }

  configureBlock(): void {
    const wrap = new Div({ classNames: [classes.loaderBlock] });
    const text = new Paragraph({ text: errorsNames.connectionError });
    const loader = new Span({ classNames: [classes.loader] });
    wrap.appendComponents(text, loader);
    this.addContent(wrap);
  }
}
