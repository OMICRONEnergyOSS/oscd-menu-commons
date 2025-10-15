import { expect, fixture, html } from '@open-wc/testing';
import OscdMenuNew from './oscd-menu-new.js';
import { Plugin } from '@omicronenergy/oscd-api';

customElements.define('oscd-menu-new', OscdMenuNew);

const sclXmlDocString = `<?xml version="1.0" encoding="UTF-8"?><SCL version="2007" revision="B" xmlns="http://www.iec.ch/61850/2003/SCL" xmlns:ens1="http://example.org/somePreexistingExtensionNamespace">
  <Substation ens1:foo="a" name="A1" desc="test substation"></Substation>
</SCL>`;

describe('oscd-menu-new', () => {
  let plugin: HTMLElement & Plugin & { run: () => Promise<void> };

  beforeEach(async () => {
    const sclDoc = new DOMParser().parseFromString(
      sclXmlDocString,
      'application/xml',
    );
    plugin = await fixture(html`<oscd-menu-new></oscd-menu-new>`);
    plugin.docs = {
      'test.scd': sclDoc,
    };
    plugin.doc = sclDoc;
    plugin.docName = 'test.scd';
  });

  afterEach(() => {
    plugin.remove();
  });

  it('tests that the plugin works as expected', async () => {
    await plugin.run();
    // Add your assertions here
    expect(plugin.docName).to.equal('test.scd');
  });
});
