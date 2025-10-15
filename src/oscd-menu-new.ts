import { newOpenEvent } from '@omicronenergy/oscd-api/utils.js';
import { ScopedElementsMixin } from '@open-wc/scoped-elements/lit-element.js';
import { css, html, LitElement } from 'lit';
import { query, state } from 'lit/decorators.js';
import { OscdDialog } from '@omicronenergy/oscd-ui/dialog/OscdDialog.js';
import { OscdRadio } from '@omicronenergy/oscd-ui/radio/OscdRadio.js';
import { OscdIcon } from '@omicronenergy/oscd-ui/icon/OscdIcon.js';
import { OscdFilledButton } from '@omicronenergy/oscd-ui/button/OscdFilledButton.js';
import { OscdTextButton } from '@omicronenergy/oscd-ui/button/OscdTextButton.js';
import { OscdOutlinedTextField } from '@omicronenergy/oscd-ui/textfield/OscdOutlinedTextField.js';

const supportedAttributes = {
  '2003': {
    version: '',
    revision: '',
    release: '',
    label: 'Edition 1 (Schema 1.7)',
  },
  '2007B': {
    version: '2007',
    revision: 'B',
    release: '',
    label: 'Edition 2 (Schema 3.1)',
  },
  '2007B4': {
    version: '2007',
    revision: 'B',
    release: '4',
    label: 'Edition 2.1 (2007B4)',
  },
};

type Version = keyof typeof supportedAttributes;
/** Returns a new empty SCD document. */

function newEmptySCD(id: string, versionId: Version) {
  const { version, revision, release } = supportedAttributes[versionId];
  const markup = `<?xml version="1.0" encoding="UTF-8"?>
    <SCL xmlns="http://www.iec.ch/61850/2003/SCL" ${version ? `version="${version}"` : ''} ${revision ? `revision="${revision}"` : ''} ${release ? `release="${release}"` : ''}>
      <Header id="${id}"/>
    </SCL>`;
  return new DOMParser().parseFromString(markup, 'application/xml');
}

export default class OscdMenuNewFile extends ScopedElementsMixin(LitElement) {
  static scopedElements = {
    'oscd-dialog': OscdDialog,
    'oscd-icon': OscdIcon,
    'oscd-radio': OscdRadio,
    'oscd-filled-button': OscdFilledButton,
    'oscd-text-button': OscdTextButton,
    'oscd-outlined-textfield': OscdOutlinedTextField,
  };

  @state()
  isFormValid?: boolean;

  @query('oscd-dialog')
  dialog!: HTMLElement & { show: () => void; close: () => void };

  @query('oscd-outlined-textfield')
  newProjectName!: HTMLInputElement;

  @query('oscd-radio[tabindex="0"]')
  selectedVersion?: OscdRadio;

  createNewProject() {
    let name;
    const docName = (
      (name = this.newProjectName.value) === null || name === void 0
        ? void 0
        : name.match(/\.[fs][sc]d$/i)
    )
      ? this.newProjectName.value
      : `${this.newProjectName.value}.scd`;
    const version = (
      this.dialog.querySelector('oscd-radio[tabindex="0"]') as OscdRadio
    ).value as Version;
    this.dialog.close();
    this.dispatchEvent(
      newOpenEvent(newEmptySCD(docName.slice(0, -4), version), docName),
    );
  }

  run() {
    this.dialog.show();
  }

  override render() {
    return html`<oscd-dialog
      aria-label="New Project"
      @cancel=${(event: Event) => event.preventDefault()}
      @closed=${(event: CustomEvent) => {
        const { returnValue } = event.target as OscdDialog;
        if (returnValue === 'create') {
          this.createNewProject();
        }
      }}
    >
      <span slot="headline">
        <oscd-icon slot="icon">create_new_folder</oscd-icon>
        <span>New Project</span>
      </span>

      <form
        id="form"
        slot="content"
        method="dialog"
        @input=${() =>
          (this.isFormValid =
            this.newProjectName.checkValidity() && !!this.selectedVersion)}
      >
        <oscd-outlined-textfield
          label="name"
          value="project.scd"
          required
          dialogInitialFocus
          @input=${(event: Event) => {
            const value =
              (event.target as HTMLInputElement)?.value.trim() || '';

            if (!value) {
              this.newProjectName.setCustomValidity('File name required');
            } else if (!value.match(/^[^\\/?%*:|"<>.]+(\.[fs][sc]d)?$/i)) {
              this.newProjectName.setCustomValidity(
                'Invalid file name (cannot contain \\ / ? % * : | " < or >)',
              );
            } else {
              this.newProjectName.setCustomValidity('');
            }
            this.newProjectName.reportValidity();
          }}
        ></oscd-outlined-textfield>
        <div role="radiogroup" aria-labelledby="group-title">
          <h3 id="group-title">Specification Version</h3>
          ${Object.entries(supportedAttributes).map(
            ([spec, { label }]) =>
              html` <label>
                <oscd-radio
                  name="specs"
                  value=${spec}
                  aria-label=${label}
                  touch-target="wrapper"
                ></oscd-radio>
                <span aria-hidden="true">${label}</span>
              </label>`,
          )}
        </div>
      </form>
      <div slot="actions">
        <div style="flex: 1"></div>
        <oscd-text-button form="form" value="cancel">Cancel</oscd-text-button>
        <oscd-filled-button
          form="form"
          value="create"
          ?disabled=${!this.isFormValid}
          >Create</oscd-filled-button
        >
      </div>
    </oscd-dialog>`;
  }

  static styles = css`
    label {
      display: flex;
      align-items: center;
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
  `;
}
