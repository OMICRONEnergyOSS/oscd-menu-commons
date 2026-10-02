import { newOpenEvent } from '@omicronenergy/oscd-api/utils.js';

import { sclFileExtensions } from './scl-file-types.js';

class OscdMenuOpen extends HTMLElement {
  private input: HTMLInputElement;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });

    this.input = document.createElement('input');
    this.input.type = 'file';
    this.input.accept = sclFileExtensions.join(',');

    this.input.addEventListener('click', (event: MouseEvent) => {
      (event.target as HTMLInputElement).value = '';
    });

    this.input.addEventListener('change', this.openDoc.bind(this));

    shadow.appendChild(this.input);
  }

  run() {
    this.input.click();
  }

  async openDoc(event: Event): Promise<void> {
    const file = (event.target as HTMLInputElement)?.files?.item(0);
    if (!file) {
      return;
    }

    const text = await file.text();
    const docName = file.name;
    const doc = new DOMParser().parseFromString(text, 'application/xml');

    this.dispatchEvent(newOpenEvent(doc, docName));
    this.input.onchange = null;
  }
}

export default OscdMenuOpen;
