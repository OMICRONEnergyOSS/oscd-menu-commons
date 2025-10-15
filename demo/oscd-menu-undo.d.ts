import { LitElement } from 'lit';
import { OscdIcon } from '@omicronenergy/oscd-ui/icon/OscdIcon.js';
import { OscdIconButton } from '@omicronenergy/oscd-ui/iconbutton/OscdIconButton.js';
import { Transactor } from '@omicronenergy/oscd-api';
import { EditV2 } from '@openscd/oscd-api';
declare const OscdMenuNewFile_base: typeof LitElement & import("@open-wc/scoped-elements/lit-element.js").ScopedElementsHostConstructor;
export default class OscdMenuNewFile extends OscdMenuNewFile_base {
    static scopedElements: {
        'oscd-icon': typeof OscdIcon;
        'oscd-icon-button': typeof OscdIconButton;
    };
    editor: Transactor<EditV2>;
    docVersion: unknown;
    get canUndo(): boolean;
    run(): void;
    render(): import("lit-html").TemplateResult<1>;
}
export {};
