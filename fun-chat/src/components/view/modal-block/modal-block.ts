import { classSelectors, classes } from '../../../common/js/constants';
import { DocTag, ModalBlockProps } from '../../../types/types';
import { ButtonPrimary } from '../button-primary/button-primary';
import { Component } from '../component/component';
import { Div } from '../div/div';
import { HeaderH3 } from '../header-h3/header-h3';
import { Paragraph } from '../paragraph/paragraph';

export class ModalBlock extends Div {
  contentWrap!: Component<keyof HTMLElementTagNameMap>;

  backdrop!: Div;

  closeBtn?: ButtonPrimary;

  constructor(props: ModalBlockProps = {}) {
    props.classNames ??= [];
    props.classNames.push(classes.modalBlock);

    super(props);
    this.configure(props);
  }

  configure(props: ModalBlockProps): void {
    const { closeable, title, text } = props?.message || {};

    this.backdrop = new Div({ classNames: [classes.backdrop] });
    const modalWindow = new Div({ classNames: [classes.modalWindow, classes.window] });

    if (title) {
      const titleElement = new HeaderH3({
        text: title,
        classNames: [classes.modalWindowTitle, classes.h1],
      });

      modalWindow.appendComponents(titleElement);
    }

    if (text) {
      const textElement = new Paragraph({
        text,
        classNames: [classes.modalWindowText, classes.h5],
      });
      modalWindow.appendComponents(textElement);
    }

    this.contentWrap = new Div({ classNames: [classes.modalWindowContentWrap] });
    modalWindow.appendComponents(this.contentWrap);

    if (closeable) {
      this.closeBtn = new ButtonPrimary({ text: 'Close' });
      modalWindow.appendComponents(this.closeBtn);
      this.closeBtn.addEventListener('click', (): void => {
        this.close();
      });
    }

    this.appendComponents(modalWindow);
  }

  addContent(...component: Component<DocTag>[]): void {
    this.contentWrap.appendComponents(...component);
  }

  open(): void {
    document.body.append(this.node);
    this.lockScroll();
  }

  close(): void {
    this.node.remove();
    if (!document.body.querySelector(classSelectors.modalBlock)) {
      this.unlockScroll;
    }
  }

  lockScroll(): void {
    const scrollWidth = window.innerWidth - document.body.clientWidth;
    document.body.style.height = '100%';
    document.body.style.overflow = 'hidden%';

    if (scrollWidth) {
      document.body.style.paddingRight = `${scrollWidth}px`;
    }
  }

  unlockScroll(): void {
    document.body.style.paddingRight = '';
    document.body.style.height = '';
    document.body.style.overflow = '';
  }
}
