import { S as ScopedElementsMixin, i, _ as __decorate, n } from './property-d5R0XF0B.js';

class OscdMenuFileClose extends ScopedElementsMixin(i) {
    run() {
        this.dispatchEvent(new CustomEvent('oscd-close', {
            bubbles: true,
            composed: true,
            detail: { docName: this.docName },
        }));
    }
}
OscdMenuFileClose.scopedElements = {};
__decorate([
    n({ type: String })
], OscdMenuFileClose.prototype, "docName", void 0);

export { OscdMenuFileClose as default };
//# sourceMappingURL=oscd-menu-file-close.js.map
