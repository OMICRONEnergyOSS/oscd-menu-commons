import { ScopedElementsMixin } from '@open-wc/scoped-elements/lit-element.js';
import { LitElement } from 'lit';
import { property } from 'lit/decorators.js';

export default class OscdMenuFileClose extends ScopedElementsMixin(LitElement) {
  static scopedElements = {};

  @property({ type: String })
  docName!: string;

  run() {
    this.dispatchEvent(
      new CustomEvent('oscd-close', {
        bubbles: true,
        composed: true,
        detail: { docName: this.docName },
      }),
    );
  }
}
