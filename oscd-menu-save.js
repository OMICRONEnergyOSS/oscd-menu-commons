import { s as sclFileExtensions, a as sclMimeType } from './scl-file-types-D08ECtst.js';

const sclFilePickerOptions = {
    types: [
        {
            description: 'SCL file',
            accept: {
                [sclMimeType]: sclFileExtensions,
            },
        },
    ],
};
/** Whether the browser supports the File System Access API's save picker. */
function supportsFileSystemAccess() {
    return typeof window.showSaveFilePicker === 'function';
}
class SaveProjectPlugin extends HTMLElement {
    async run() {
        if (!this.doc) {
            return;
        }
        const documentAsString = this.serializeDoc();
        if (supportsFileSystemAccess()) {
            await this.saveAs(documentAsString);
        }
        else {
            this.downloadFile(documentAsString);
        }
    }
    /** Serializes `this.doc`, restoring the XML declaration/prolog if it's been stripped. */
    serializeDoc() {
        const documentAsString = new XMLSerializer().serializeToString(this.doc);
        // TODO: This can be removed once the improved OpenSCD core edit API is present
        return documentAsString.startsWith('<?xml')
            ? documentAsString
            : '<?xml version="1.0" encoding="UTF-8"?>' + '\n' + documentAsString;
    }
    /** Opens the native Save As dialog via the File System Access API. */
    async saveAs(documentAsString) {
        let handle;
        try {
            handle = await window.showSaveFilePicker({
                ...sclFilePickerOptions,
                suggestedName: this.docName,
            });
        }
        catch (error) {
            if (error instanceof DOMException && error.name === 'AbortError') {
                // The user cancelled the save dialog.
                return;
            }
            throw error;
        }
        const writable = await handle.createWritable();
        await writable.write(documentAsString);
        await writable.close();
    }
    /** Falls back to triggering a browser download when Save As isn't supported. */
    downloadFile(documentAsString) {
        const blob = new Blob([documentAsString], {
            type: 'application/xml',
        });
        const a = document.createElement('a');
        a.download = this.docName;
        a.href = URL.createObjectURL(blob);
        a.dataset.downloadurl = ['application/xml', a.download, a.href].join(':');
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(function () {
            URL.revokeObjectURL(a.href);
        }, 5000);
    }
}

export { SaveProjectPlugin as default };
//# sourceMappingURL=oscd-menu-save.js.map
