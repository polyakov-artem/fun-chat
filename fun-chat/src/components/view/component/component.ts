import { ComponentProps, DocTag } from '../../../types/types';

type NodeType<Tag extends DocTag> = HTMLElementTagNameMap[Tag] & {
  component: Component<Tag>;
};

export class Component<Tag extends DocTag> {
  childComponents: Component<DocTag>[] = [];

  node: NodeType<Tag>;

  constructor(props: ComponentProps<Tag>) {
    this.node = document.createElement(props.tag) as NodeType<Tag>;

    props.classNames?.length && this.node.classList.add(...props.classNames);
    props.text && this.setTextContent(props.text);

    if (props.attr) {
      Object.entries(props.attr).forEach(([key, value]) => {
        this.setAttribute(key, value);
      });
    }

    this.node.component = this;
  }

  appendComponents(...components: Component<DocTag>[]): void {
    components.forEach((component) => {
      this.childComponents.push(component);
      this.node.append(component.node);
    });
  }

  prependComponents(...components: Component<DocTag>[]): void {
    components.forEach((component) => {
      this.childComponents.push(component);
      this.node.prepend(component.node);
    });
  }

  setTextContent(content: string): void {
    this.node.textContent = content;
  }

  getTextContent(): string | null {
    return this.node.textContent;
  }

  disable(): void {
    this.setAttribute('disabled', 'true');
  }

  enable(): void {
    this.removeAttribute('disabled');
  }

  setAttribute(attribute: string, value: string): void {
    this.node.setAttribute(attribute, value);
  }

  getAttribute(attribute: string): string | null {
    return this.node.getAttribute(attribute);
  }

  removeAttribute(attribute: string): void {
    this.node.removeAttribute(attribute);
  }

  toggleClass(className: string): void {
    this.node.classList.toggle(className);
  }

  addClass(className: string): void {
    this.node.classList.add(className);
  }

  removeClass(className: string): void {
    this.node.classList.remove(className);
  }

  addEventListener(
    event: string,
    listener: EventListener,
    options?: boolean | AddEventListenerOptions,
  ): void {
    this.node.addEventListener(event, listener, options);
  }

  removeComponents(): void {
    this.childComponents.forEach((child) => {
      child.remove();
    });
    this.childComponents.length = 0;
  }

  remove(): void {
    this.removeComponents();
    this.node.remove();
  }
}
