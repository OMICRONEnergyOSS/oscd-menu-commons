import { LitElement } from 'lit';
import { OscdDialog } from '@omicronenergy/oscd-ui/dialog/OscdDialog.js';
import { OscdRadio } from '@omicronenergy/oscd-ui/radio/OscdRadio.js';
import { OscdIcon } from '@omicronenergy/oscd-ui/icon/OscdIcon.js';
import { OscdFilledButton } from '@omicronenergy/oscd-ui/button/OscdFilledButton.js';
import { OscdTextButton } from '@omicronenergy/oscd-ui/button/OscdTextButton.js';
import { OscdOutlinedTextField } from '@omicronenergy/oscd-ui/textfield/OscdOutlinedTextField.js';
declare const OscdMenuNewFile_base: typeof LitElement & import("@open-wc/scoped-elements/lit-element.js").ScopedElementsHostConstructor;
export default class OscdMenuNewFile extends OscdMenuNewFile_base {
    static scopedElements: {
        'oscd-dialog': typeof OscdDialog;
        'oscd-icon': typeof OscdIcon;
        'oscd-radio': typeof OscdRadio;
        'oscd-filled-button': typeof OscdFilledButton;
        'oscd-text-button': typeof OscdTextButton;
        'oscd-outlined-textfield': typeof OscdOutlinedTextField;
    };
    isFormValid?: boolean;
    dialog: HTMLElement & {
        show: () => void;
        close: () => void;
    };
    newProjectName: HTMLInputElement;
    selectedVersion?: OscdRadio;
    createNewProject(): void;
    run(): void;
    render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult;
}
export {};
