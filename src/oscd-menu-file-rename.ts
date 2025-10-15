import { css, html, LitElement } from 'lit';
import { property, query } from 'lit/decorators.js';
import { ScopedElementsMixin } from '@open-wc/scoped-elements/lit-element.js';
import { localized, msg } from '@lit/localize';

import { OscdDialog } from '@omicronenergy/oscd-ui/dialog/OscdDialog.js';
import { OscdFilledSelect } from '@omicronenergy/oscd-ui/select/OscdFilledSelect.js';
import { OscdFilledTextField } from '@omicronenergy/oscd-ui/textfield/OscdFilledTextField.js';
import { OscdIcon } from '@omicronenergy/oscd-ui/icon/OscdIcon.js';
import { OscdSelectOption } from '@omicronenergy/oscd-ui/select/OscdSelectOption.js';
import { OscdTextButton } from '@omicronenergy/oscd-ui/button/OscdTextButton.js';
import { OscdFilledButton } from '@omicronenergy/oscd-ui/button/OscdFilledButton.js';

declare global {
  interface HTMLElementTagNameMap {
    'oscd-menu-file-rename': OscdMenuFileRename;
  }
}

/** The file endings of editable files */
const editable = ['cid', 'icd', 'iid', 'scd', 'sed', 'ssd'];

@localized()
export default class OscdMenuFileRename extends ScopedElementsMixin(
  LitElement,
) {
  static scopedElements = {
    'oscd-dialog': OscdDialog,
    'oscd-filled-select': OscdFilledSelect,
    'oscd-select-option': OscdSelectOption,
    'oscd-filled-text-field': OscdFilledTextField,
    'oscd-icon': OscdIcon,
    'oscd-text-button': OscdTextButton,
    'oscd-filled-button': OscdFilledButton,
  };

  /* Properties */

  @property({ type: String })
  docName: string | undefined;

  @property({ attribute: false })
  docVersion: unknown;

  @property({ attribute: false })
  docs: Record<string, XMLDocument> = {};

  /* Queries */

  @query('#editFileDialog')
  dialog!: OscdDialog;

  @query('#fileName')
  fileNameField!: HTMLInputElement;

  @query('#fileExtension')
  fileExtensionUI!: HTMLInputElement;

  run() {
    this.dialog.show();
    setTimeout(() => this.fileNameField.select(), 100);
  }

  render() {
    return html`
      <oscd-dialog id="editFileDialog">
        <div slot="headline">Rename File</div>
        <form slot="content" id="edit-file-form" method="dialog">
          <oscd-filled-text-field
            id="fileName"
            label="${msg('Filename')}"
            value=${this.docName?.replace(/\.[^.]+$/, '') ?? ''}
            @input=${(event: Event) => {
              const input = event.target as HTMLInputElement;
              const { value } = input;
              const name = `${value}.${this.fileExtensionUI.value}`;
              if (name in this.docs && name !== this.docName) {
                input.setCustomValidity('File already exists!');
              } else {
                input.setCustomValidity('');
              }
              input.reportValidity();
            }}
          ></oscd-filled-text-field>
          <oscd-filled-select
            label="${msg('Extension')}"
            fixedMenuPosition
            id="fileExtension"
            @selected=${() => this.fileNameField.reportValidity()}
          >
            ${editable.map(
              ext =>
                html`<oscd-select-option
                  ?selected=${this.docName?.endsWith(`.${ext}`)}
                  value="${ext}"
                  >${ext}</oscd-select-option
                >`,
            )}
          </oscd-filled-select>
        </form>
        <div slot="actions">
          <oscd-filled-button
            @click=${() => {
              const valid = this.fileNameField.checkValidity();
              if (!valid) {
                this.fileNameField.reportValidity();
                return;
              }
              const newDocName = `${this.fileNameField.value}.${this.fileExtensionUI.value}`;
              if (newDocName !== this.docName) {
                this.dispatchEvent(
                  new CustomEvent('oscd-rename', {
                    detail: {
                      oldName: this.docName!,
                      newName: newDocName,
                    },
                    bubbles: true,
                    composed: true,
                  }),
                );
              }
              this.dialog.close();
            }}
            trailing-icon
          >
            ${msg('Rename')}
          </oscd-filled-button>
          <oscd-text-button form="edit-file-form" value="close">
            ${msg('Cancel')}
          </oscd-text-button>
        </div>
      </oscd-dialog>
    `;
  }

  static styles = css`
    .fileext {
      opacity: 0.81;
    }

    .filename {
      caret-color: var(--oscd-secondary);
    }

    .filename:focus {
      outline: none;
    }

    .off-screen-plugin-container {
      position: absolute;
      top: 0;
      left: 0;
      width: 0;
      height: 0;
      overflow: hidden;
      margin: 0;
      padding: 0;
    }

    abbr {
      text-decoration: none;
    }

    .edit-dialog-remove-button {
      --md-text-button-icon-color: var(--oscd-error);
      --md-text-button-label-text-color: var(--oscd-error);
      --md-text-button-focus-label-text-color: var(--oscd-error);
      --md-text-button-focus-icon-color: var(--oscd-error);
      --md-text-button-hover-label-text-color: var(--oscd-error);
      --md-text-button-hover-state-layer-color: var(--oscd-error);
      --md-text-button-hover-icon-color: var(--oscd-error);
      --md-text-button-pressed-label-text-color: var(--oscd-error);
      --md-text-button-pressed-state-layer-color: var(--oscd-error);
      --md-text-button-pressed-icon-color: var(--oscd-error);
    }
  `;
}
