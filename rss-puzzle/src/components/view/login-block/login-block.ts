import { classSelectors, classes } from '../../../common/js/constants';
import { createDomElement } from '../../utils/utils';
import { loginField } from '../login-field/login-field';
import { loginLabel } from '../login-label/login-label';
import { primaryBtn } from '../primary-btn/primary-btn';
import { App } from '../../app/app';

export class LoginBlock {
  node!: HTMLElement;
  nameField!: HTMLElement;
  nameInput!: HTMLInputElement;
  surnameField!: HTMLElement;
  surnameInput!: HTMLInputElement;
  loginBtn!: HTMLElement;
  getNode() {
    if (!this.node) {
      this.node = this.createNode();
      this.nameField = this.node.querySelector(classSelectors.loginBlockNameField)!;
      this.nameInput = this.nameField.querySelector(classSelectors.inputControl)!;
      this.surnameField = this.node.querySelector(classSelectors.loginBlockSurnameField)!;
      this.surnameInput = this.surnameField.querySelector(classSelectors.inputControl)!;
      this.loginBtn = this.node.querySelector(classSelectors.loginBtn)!;
      this.addListeners();
    }

    return this.node;
  }

  createNode(): HTMLElement {
    const node: HTMLElement = createDomElement({ classNames: [classes.loginBlock] });
    const formElement: HTMLElement = createDomElement({
      tag: 'form',
      classNames: [classes.loginBlockForm],
      attr: { action: '' },
    });
    const nameLabel: HTMLElement = loginLabel({ text: 'First Name', inputId: 'name' });
    const surnameLabel: HTMLElement = loginLabel({ text: 'Surname', inputId: 'surname' });
    const nameField: HTMLElement = loginField({ name: 'name' });
    const surnameField: HTMLElement = loginField({ name: 'surname' });
    const loginBtn: HTMLElement = primaryBtn({
      text: 'Login',
      classNames: [classes.loginBlockLoginBtn, classes.loginBtn],
      disabled: true,
    });
    node.append(formElement);
    formElement.append(nameLabel, nameField, surnameLabel, surnameField, loginBtn);

    return node;
  }

  addListeners(): void {
    this.nameInput.addEventListener('input', (): void => {
      const errors = this.validateFields();
      this.updateFieldState(this.nameField, errors.nameError);
      this.updateBtnState(errors);
    });

    this.surnameInput.addEventListener('input', (): void => {
      const errors = this.validateFields();
      this.updateFieldState(this.surnameField, errors.surnameError);
      this.updateBtnState(errors);
    });
  }

  clear() {
    const fields = this.node.querySelectorAll<HTMLElement>(classSelectors.field);
    fields.forEach((element: HTMLElement): void => {
      element.classList.remove(classSelectors.invalidField);
    });

    this.node
      .querySelectorAll<HTMLElement>(classSelectors.fieldValidation)
      .forEach((element: HTMLElement): void => {
        element.textContent = '';
      });

    this.node
      .querySelectorAll<HTMLInputElement>(classSelectors.inputControl)
      .forEach((element: HTMLInputElement): void => {
        element.value = '';
      });

    this.loginBtn.setAttribute('disabled', 'true');
  }

  validateFields(): { nameError: string; surnameError: string } {
    return {
      nameError: App.appController.authController.validateName(this.nameInput.value),
      surnameError: App.appController.authController.validateSurname(this.surnameInput.value),
    };
  }

  updateBtnState({ nameError, surnameError }: { nameError: string; surnameError: string }): void {
    if (nameError || surnameError) {
      this.loginBtn.setAttribute('disabled', 'true');
    } else {
      this.loginBtn.removeAttribute('disabled');
    }
  }

  updateFieldState(field: HTMLElement, message: string): void {
    if (message) {
      field.classList.add(classes.fieldInvalid);
      field.querySelector(classSelectors.fieldValidation)!.textContent = message;
    } else {
      field.classList.remove(classes.fieldInvalid);
      field.querySelector(classSelectors.fieldValidation)!.textContent = '';
    }
  }
}
