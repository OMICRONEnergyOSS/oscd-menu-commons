export default class SaveProjectPlugin extends HTMLElement {
    docs: Record<string, XMLDocument>;
    doc: XMLDocument;
    docName: string;
    run(): Promise<void>;
    /** Serializes `this.doc`, restoring the XML declaration/prolog if it's been stripped. */
    private serializeDoc;
    /** Opens the native Save As dialog via the File System Access API. */
    private saveAs;
    /** Falls back to triggering a browser download when Save As isn't supported. */
    private downloadFile;
}
