import { sclFileExtensions, sclMimeType } from './scl-file-types.js';

const sclFilePickerOptions: SaveFilePickerOptions = {
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
function supportsFileSystemAccess(): boolean {
  return typeof window.showSaveFilePicker === 'function';
}

export default class SaveProjectPlugin extends HTMLElement {
  docs!: Record<string, XMLDocument>;
  doc!: XMLDocument;
  docName!: string;

  async run(): Promise<void> {
    if (!this.doc) {
      return;
    }

    const documentAsString = this.serializeDoc();

    if (supportsFileSystemAccess()) {
      await this.saveAs(documentAsString);
    } else {
      this.downloadFile(documentAsString);
    }
  }

  /** Serializes `this.doc`, restoring the XML declaration/prolog if it's been stripped. */
  private serializeDoc(): string {
    const documentAsString = new XMLSerializer().serializeToString(this.doc);

    // TODO: This can be removed once the improved OpenSCD core edit API is present
    return documentAsString.startsWith('<?xml')
      ? documentAsString
      : '<?xml version="1.0" encoding="UTF-8"?>' + '\n' + documentAsString;
  }

  /** Opens the native Save As dialog via the File System Access API. */
  private async saveAs(documentAsString: string): Promise<void> {
    let handle: FileSystemFileHandle;
    try {
      handle = await window.showSaveFilePicker({
        ...sclFilePickerOptions,
        suggestedName: this.docName,
      });
    } catch (error) {
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
  private downloadFile(documentAsString: string): void {
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
