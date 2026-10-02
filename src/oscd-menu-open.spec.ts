import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import { SinonSpy, spy } from 'sinon';

import OscdMenuOpen from './oscd-menu-open.js';

customElements.define('oscd-menu-open', OscdMenuOpen);

describe('oscd-menu-open', () => {
  let plugin: OscdMenuOpen;

  let openEvent: SinonSpy;

  beforeEach(async () => {
    openEvent = spy();

    plugin = await fixture(html`<oscd-menu-open></oscd-menu-open>`);
    plugin.addEventListener('oscd-open', openEvent);
    document.body.append(plugin);

    plugin.click();
  });

  afterEach(() => plugin.remove());

  it('It fires the open event, when the input changes value', async () => {
    const fileInputElement = plugin.shadowRoot!.querySelector('input')!;
    // Create a mock file
    const file = new File(['<scd></scl>'], 'sample.xml', {
      type: 'application/xml',
    });

    // Use DataTransfer to simulate file selection
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);

    // Assign the files to the input (bypassing readonly)
    Object.defineProperty(fileInputElement, 'files', {
      value: dataTransfer.files,
      writable: false,
    });

    const eventPromise = oneEvent(plugin, 'oscd-open');
    fileInputElement.dispatchEvent(new Event('change', { bubbles: true }));

    // Wait for the event to be handled before checking assertions
    await eventPromise;

    expect(openEvent.callCount).to.equal(1);
    expect(openEvent.firstCall.args[0].detail.docName).to.equal('sample.xml');
  });
});
