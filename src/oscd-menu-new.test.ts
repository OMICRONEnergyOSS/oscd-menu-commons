import { fixture, html } from '@open-wc/testing';
import { setViewport } from '@web/test-runner-commands';

// import { visualDiff } from '@web/test-runner-visual-regression';

const factor = window.process && process.env.CI ? 4 : 2;
function timeout(ms: number) {
  return new Promise(res => {
    setTimeout(res, ms * factor);
  });
}
mocha.timeout(2000 * factor);
import OscdTemplateMenu from './oscd-menu-new.js';
import { Plugin } from '@omicronenergy/oscd-api';
import { LitElement } from 'lit';

customElements.define('oscd-menu-new', OscdTemplateMenu);

const sclXmlDocString = `<?xml version="1.0" encoding="UTF-8"?><SCL version="2007" revision="B" xmlns="http://www.iec.ch/61850/2003/SCL" xmlns:ens1="http://example.org/somePreexistingExtensionNamespace">
  <Substation ens1:foo="a" name="A1" desc="test substation"></Substation>
</SCL>`;

describe('oscd-menu-new', () => {
  let plugin: LitElement & Plugin & { run: () => Promise<void> };

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
    await setViewport({ width: 1200, height: 800 });

    await plugin.updateComplete;
    await timeout(400);
    // await visualDiff(document.body, `oscd-menu-new/#1 Dummy Test`);
  });
});
