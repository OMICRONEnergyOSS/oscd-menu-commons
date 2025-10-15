/* eslint-disable @typescript-eslint/no-unused-expressions */
import { expect, fixture, html } from '@open-wc/testing';
import OscdMenuFileRename from './oscd-menu-file-rename.js';
import { waitForDialogState } from '@omicronenergy/oscd-test-utils';
import { OscdFilledSelect } from '@omicronenergy/oscd-ui/select/OscdFilledSelect.js';
import { OscdFilledTextField } from '@omicronenergy/oscd-ui/textfield/OscdFilledTextField.js';
import sinon from 'sinon';
import { OscdFilledButton } from '@omicronenergy/oscd-ui/button/OscdFilledButton.js';
import { OscdTextButton } from '@omicronenergy/oscd-ui/button/OscdTextButton.js';

const sclDocString = `<?xml version="1.0" encoding="UTF-8"?>
  <SCL version="2007" revision="B" xmlns="http://www.iec.ch/61850/2003/SCL" xmlns:ens1="http://example.org/somePreexistingExtensionNamespace">
  <Substation ens1:foo="a" name="A1" desc="test substation"></Substation>
</SCL>`;

export function newTestDoc() {
  return new DOMParser().parseFromString(sclDocString, 'application/xml');
}

export function createTestDocs(amount: number) {
  return Array(amount)
    .fill(0)
    .reduce(
      (acc, _, index) => {
        const docName = `test${index}.cid`;
        acc[docName] = newTestDoc();
        return acc;
      },
      {} as Record<string, XMLDocument>,
    );
}

function findRenameButton(oscdMenuFileRename: OscdMenuFileRename) {
  const { dialog } = oscdMenuFileRename;
  const button = dialog.querySelector('oscd-filled-button');
  expect(button).to.exist;
  return button! as OscdFilledButton;
}

function findCancelButton(plugin: OscdMenuFileRename) {
  const { dialog } = plugin;
  const button = dialog.querySelector('oscd-text-button');
  expect(button).to.exist;
  return button! as OscdTextButton;
}

customElements.define('oscd-menu-file-rename', OscdMenuFileRename);

describe('oscd-menu-file-rename', () => {
  let oscdMenuFileRename: OscdMenuFileRename;
  let docs: Record<string, XMLDocument>;
  let oscdRenameEventSpy: sinon.SinonSpy;

  beforeEach(async () => {
    docs = createTestDocs(5);
    oscdMenuFileRename = <OscdMenuFileRename>(
      await fixture(
        html`<oscd-menu-file-rename
          .docs=${docs}
          docName=${Object.keys(docs)[0]}
        ></oscd-menu-file-rename>`,
      )
    );

    oscdRenameEventSpy = sinon.spy();
    oscdMenuFileRename.addEventListener('oscd-rename', oscdRenameEventSpy);

    await oscdMenuFileRename.updateComplete;
    oscdMenuFileRename.run();
    await waitForDialogState(oscdMenuFileRename.dialog, 'open');
  });

  it('allows the user to change the current doc name', async () => {
    const { dialog } = oscdMenuFileRename;
    const textfield = dialog.querySelector<OscdFilledTextField>(
      'oscd-filled-text-field',
    )!;
    textfield.value = 'newName';
    const select = dialog.querySelector(
      'oscd-filled-select',
    )! as OscdFilledSelect;
    select.value = 'cid';
    await textfield.updateComplete;
    await select.updateComplete;
    findRenameButton(oscdMenuFileRename)?.click();
    await oscdMenuFileRename.updateComplete;

    await waitForDialogState(dialog, 'closed');
    expect(oscdRenameEventSpy.callCount).to.equal(1);
    const [event] = oscdRenameEventSpy.args[0];
    expect(event).to.have.property('type', 'oscd-rename');
    expect(event)
      .to.have.property('detail')
      .that.has.property('oldName', 'test0.cid');
    expect(event)
      .to.have.property('detail')
      .that.has.property('newName', 'newName.cid');
  });

  it('prevents the user from renaming the current doc to an already opened doc name', async () => {
    const anotherDocNameWithoutExtension = Object.keys(oscdMenuFileRename.docs)
      ?.find(docName => docName !== oscdMenuFileRename.docName)
      ?.split('.')[0];
    const existingDocNameWithExtension = oscdMenuFileRename.docName ?? '';

    const { dialog } = oscdMenuFileRename;

    const textfield = dialog.querySelector<OscdFilledTextField>('#fileName')!;
    textfield.value = anotherDocNameWithoutExtension!;
    textfield.dispatchEvent(
      new Event('input', { bubbles: true, composed: true }),
    );
    await textfield.updateComplete;
    const renameButton = findRenameButton(oscdMenuFileRename);
    renameButton.click();
    await oscdMenuFileRename.updateComplete;
    expect(dialog.open).to.be.true;

    const [filename] = existingDocNameWithExtension.split('.');
    textfield.value = filename;
    textfield.dispatchEvent(
      new Event('input', { bubbles: true, composed: true }),
    );
    await oscdMenuFileRename.updateComplete;
    renameButton!.click();
    await waitForDialogState(dialog, 'closed');
    await oscdMenuFileRename.updateComplete;
    expect(dialog.open).not.to.be.true;

    expect(oscdRenameEventSpy.callCount).to.equal(0);
  });

  it('fires no change events (regardless of changes made) when cancel button clicked', async () => {
    const { dialog } = oscdMenuFileRename;

    const textfield = dialog.querySelector<OscdFilledTextField>('#fileName')!;
    textfield.value = 'another-name';
    textfield.dispatchEvent(
      new Event('input', { bubbles: true, composed: true }),
    );
    await textfield.updateComplete;
    const cancelButton = findCancelButton(oscdMenuFileRename);
    cancelButton.click();

    await waitForDialogState(dialog, 'closed');

    expect(oscdRenameEventSpy.callCount).to.equal(0);
  });
});
