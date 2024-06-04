import { classes } from '../../../common/js/constants';
import { ChildComponentProps } from '../../../types/types';
import { Paragraph } from '../paragraph/paragraph';
import { Input } from '../input/input';
import { Div } from '../div/div';

export class InputField extends Div {
  input!: Input;

  validationText!: Paragraph;

  constructor(props: ChildComponentProps = {}) {
    props.classNames ??= [];
    props.classNames.push(classes.inputField);
    super(props);
    this.configure();
  }

  configure(): void {
    this.input = new Input({ classNames: [classes.inputFieldControl] });
    this.validationText = new Paragraph({ classNames: [classes.inputFieldMessage] });
    this.appendComponents(this.input, this.validationText);
  }
}
