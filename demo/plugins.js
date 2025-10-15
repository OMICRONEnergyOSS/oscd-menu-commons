import OscdMenuOpen from '@omicronenergy/oscd-menu-open';
import OscdMenuSave from '@omicronenergy/oscd-menu-save';
import OscdBackgroundEditV1 from '@omicronenergy/oscd-background-editv1';

customElements.define('oscd-menu-open', OscdMenuOpen);
customElements.define('oscd-menu-save', OscdMenuSave);
customElements.define('oscd-background-editv1', OscdBackgroundEditV1);

import OscdMenuNew from '../dist/oscd-menu-new.js';
import OscdMenuFileRename from '../dist/oscd-menu-file-rename.js';
import OscdMenuFileClose from '../dist/oscd-menu-file-close.js';
import OscdMenuUndo from '../dist/oscd-menu-undo.js';
import OscdMenuRedo from '../dist/oscd-menu-redo.js';

customElements.define('oscd-menu-new', OscdMenuNew);
customElements.define('oscd-menu-file-rename', OscdMenuFileRename);
customElements.define('oscd-menu-file-close', OscdMenuFileClose);
customElements.define('oscd-menu-undo', OscdMenuUndo);
customElements.define('oscd-menu-redo', OscdMenuRedo);

export const plugins = {
  menu: [
    {
      name: 'Open...',
      translations: { de: 'öffnen...' },
      icon: 'folder_open',
      tagName: 'oscd-menu-open',
    },
    {
      name: 'New...',
      translations: { de: 'Neu...' },
      icon: 'create_new_folder',
      requireDoc: true,
      tagName: 'oscd-menu-new',
    },
    {
      name: 'Save...',
      translations: { de: 'Speichern...' },
      icon: 'save',
      requireDoc: true,
      tagName: 'oscd-menu-save',
    },
    {
      name: 'Rename...',
      translations: { de: 'Datei umbenenen' },
      icon: 'edit',
      requireDoc: true,
      tagName: 'oscd-menu-file-rename',
    },
    {
      name: 'Close',
      translations: { de: 'Schließen' },
      icon: 'close',
      requireDoc: true,
      tagName: 'oscd-menu-file-close',
    },
    {
      name: 'Undo',
      translations: { de: 'Undo' },
      icon: 'undo',
      requireDoc: true,
      tagName: 'oscd-menu-undo',
    },
    {
      name: 'Redo',
      translations: { de: 'Redo' },
      icon: 'redo',
      requireDoc: true,
      tagName: 'oscd-menu-redo',
    },
  ],
  editor: [
    {
      name: 'SLD Designer',
      translations: {
        de: 'SLD Designer',
      },
      icon: 'add_box',
      requireDoc: true,
      src: 'https://omicronenergyoss.github.io/oscd-editor-sld/oscd-editor-sld.js',
    },
  ],
};
