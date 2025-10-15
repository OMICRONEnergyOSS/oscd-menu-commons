import { expect, fixture, html } from '@open-wc/testing';
import OscdMenuFileClose from './oscd-menu-file-close.js';
import sinon from 'sinon';

customElements.define('oscd-menu-file-close', OscdMenuFileClose);

describe('oscd-menu-file-rename', () => {
  let oscdMenuFileClose: OscdMenuFileClose;
  let oscdCloseEventSpy: sinon.SinonSpy;

  beforeEach(async () => {
    oscdMenuFileClose = await fixture<OscdMenuFileClose>(
      html`<oscd-menu-file-close></oscd-menu-file-close>`,
    );

    oscdCloseEventSpy = sinon.spy();
    oscdMenuFileClose.addEventListener('oscd-close', oscdCloseEventSpy);
  });

  it('allows the user to close the current doc', () => {
    oscdMenuFileClose.run();

    expect(oscdCloseEventSpy.callCount).to.equal(1);
    expect(oscdCloseEventSpy.lastCall.args[0].detail).to.have.property(
      'docName',
      oscdMenuFileClose.docName,
    );
  });
});
