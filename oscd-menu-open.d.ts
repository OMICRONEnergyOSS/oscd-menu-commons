declare class OscdMenuOpen extends HTMLElement {
    private input;
    constructor();
    run(): void;
    openDoc(event: Event): Promise<void>;
}
export default OscdMenuOpen;
