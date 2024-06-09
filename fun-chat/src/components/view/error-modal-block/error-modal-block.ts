import { errorsNames } from '../../../common/js/constants';
import { ModalBlockProps } from '../../../types/types';
import { ModalBlock } from '../modal-block/modal-block';

export class ErrorModalBlock extends ModalBlock {
  constructor(props: ModalBlockProps = {}) {
    props.message ??= {};
    props.message.title ??= errorsNames.commonError;
    props.message.closeable = true;
    super(props);
  }
}
