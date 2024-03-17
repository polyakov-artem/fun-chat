import { classes } from '../../../common/js/constants';
import { LoginLabel } from '../../../types/types';
import { createDomElement } from '../../utils/utils';

export const loginLabel: LoginLabel = ({ text = '', inputId = '' }) =>
  createDomElement({
    tag: 'label',
    classNames: [classes.h4, classes.loginBlockLabel],
    text: text,
    attr: { for: inputId },
  });
