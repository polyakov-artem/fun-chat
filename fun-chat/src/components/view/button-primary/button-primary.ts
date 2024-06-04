import { classes } from '../../../common/js/constants';
import { ButtonComponentProps } from '../../../types/types';
import { Button } from '../button/button';

export class ButtonPrimary extends Button {
  constructor(props: ButtonComponentProps = {}) {
    props.classNames ??= [];
    props.classNames.push(classes.btnPrimary);
    props.isSmall && props.classNames.push(classes.btnPrimarySmall);
    props.isExtraSmall && props.classNames.push(classes.btnPrimaryExtraSmall);
    super(props);
  }
}
