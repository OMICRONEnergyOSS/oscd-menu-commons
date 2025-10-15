import { ScopedElementsMixin } from '@open-wc/scoped-elements/lit-element.js';
import { html, LitElement } from 'lit';
import { OscdIcon } from '@omicronenergy/oscd-ui/icon/OscdIcon.js';
import { OscdIconButton } from '@omicronenergy/oscd-ui/iconbutton/OscdIconButton.js';
import { property, state } from 'lit/decorators.js';
import { Transactor } from '@omicronenergy/oscd-api';
import { EditV2 } from '@openscd/oscd-api';

export default class OscdMenuNewFile extends ScopedElementsMixin(LitElement) {
  static scopedElements = {
    'oscd-icon': OscdIcon,
    'oscd-icon-button': OscdIconButton,
  };

  @property({ type: Object })
  editor!: Transactor<EditV2>;

  @property({ type: Object })
  docVersion!: unknown;

  @state()
  get canUndo(): boolean {
    return this.editor.past.length >= 1;
  }

  /* When used as a menu plugin, this method is called when the user clicks the menu item. */
  run() {
    this.editor.undo();
  }

  /* When used as an Action plugin, this method is called to render the action button. */
  override render() {
    return html` <oscd-icon-button
      .disabled=${!this.canUndo}
      @click=${() => this.run()}
      ><oscd-icon>undo</oscd-icon></oscd-icon-button
    >`;
  }
}
