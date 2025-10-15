import { S as ScopedElementsMixin, i, x, _ as __decorate, n } from './property-d5R0XF0B.js';
import { O as OscdIcon, r } from './form-submitter-BnXEOv4K.js';
import { O as OscdIconButton } from './OscdIconButton-BJGPPTFx.js';

class OscdMenuNewFile extends ScopedElementsMixin(i) {
    get canRedo() {
        return this.editor.future.length >= 1;
    }
    /* When used as a menu plugin, this method is called when the user clicks the menu item. */
    run() {
        this.editor.redo();
    }
    /* When used as an Action plugin, this method is called to render the action button. */
    render() {
        return x ` <oscd-icon-button
      .disabled=${!this.canRedo}
      @click=${() => this.run()}
      ><oscd-icon>redo</oscd-icon></oscd-icon-button
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
    r()
], OscdMenuNewFile.prototype, "canRedo", null);

export { OscdMenuNewFile as default };
//# sourceMappingURL=oscd-menu-redo.js.map
