import { classes } from '../../../common/js/constants';
import { ChildComponentProps } from '../../../types/types';
import { Paragraph } from '../paragraph/paragraph';
import { Input } from '../input/input';
import { Div } from '../div/div';

export class InputField extends Div {
  input!: Input;

  validationText!: Paragraph;

  isValid: boolean = false;

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

  addValidator(validator: (value: string, minLength?: number) => string, minLength: number): void {
    this.input.addEventListener('input', () => {
      const errorMessage = validator(this.input.node.value, minLength);

      if (errorMessage.length > 0) {
        this.isValid = false;
        this.addClass(classes.inputFieldInvalid);
      } else {
        this.isValid = true;
        this.removeClass(classes.inputFieldInvalid);
      }

      this.validationText.setTextContent(errorMessage);
    });
  }
}
