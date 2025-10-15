import { LitElement } from 'lit';
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
declare const OscdMenuFileRename_base: typeof LitElement & import("@open-wc/scoped-elements/lit-element.js").ScopedElementsHostConstructor;
export default class OscdMenuFileRename extends OscdMenuFileRename_base {
    static scopedElements: {
        'oscd-dialog': typeof OscdDialog;
        'oscd-filled-select': typeof OscdFilledSelect;
        'oscd-select-option': typeof OscdSelectOption;
        'oscd-filled-text-field': typeof OscdFilledTextField;
        'oscd-icon': typeof OscdIcon;
        'oscd-text-button': typeof OscdTextButton;
        'oscd-filled-button': typeof OscdFilledButton;
    };
    docName: string | undefined;
    docVersion: unknown;
    docs: Record<string, XMLDocument>;
    dialog: OscdDialog;
    fileNameField: HTMLInputElement;
    fileExtensionUI: HTMLInputElement;
    run(): void;
    render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult;
}
export {};
