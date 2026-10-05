import { S as ScopedElementsMixin, i, b, _ as __decorate, n } from './property-CoNymZGd.js';
import { j as OscdIcon, r } from './form-submitter-BZoLMdvC.js';
import { O as OscdIconButton } from './OscdIconButton-DEFZaMOB.js';

class OscdMenuNewFile extends ScopedElementsMixin(i) {
    get canUndo() {
        return this.editor.past.length >= 1;
    }
    /* When used as a menu plugin, this method is called when the user clicks the menu item. */
    run() {
        this.editor.undo();
    }
    /* When used as an Action plugin, this method is called to render the action button. */
    render() {
        return b ` <oscd-icon-button
      .disabled=${!this.canUndo}
      @click=${() => this.run()}
      ><oscd-icon>undo</oscd-icon></oscd-icon-button
    >`;
    }
}
OscdMenuNewFile.scopedElements = {
    'oscd-icon': OscdIcon,
    'oscd-icon-button': OscdIconButton,
};
__decorate([
    n({ type: Object })
], OscdMenuNewFile.prototype, "editor", void 0);
__decorate([
    n({ type: Object })
], OscdMenuNewFile.prototype, "docVersion", void 0);
__decorate([
    r()
], OscdMenuNewFile.prototype, "canUndo", null);

export { OscdMenuNewFile as default };
//# sourceMappingURL=oscd-menu-undo.js.map
