import { classes } from '../../../common/js/constants';
import { LoginField } from '../../../types/types';
import { createDomElement } from '../../utils/utils';

export const loginField: LoginField = ({ name = '' }) => {
  const field = createDomElement({
    classNames: [classes.field, classes.loginField, `login-block__${name}-field`],
  });
  const inputContainer = createDomElement({ classNames: [classes.input] });
  const input = createDomElement({
    tag: 'input',
    classNames: [classes.inputControl],
    attr: {
      type: 'text',
      id: name,
      name: name,
      required: 'true',
    },
  });

  const validation = createDomElement({ tag: 'p', classNames: [classes.fieldValidation] });

  field.append(inputContainer, validation);
  inputContainer.append(input);
  return field;
};
