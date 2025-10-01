import OscdMenuOpen from '@omicronenergy/oscd-menu-open';
import OscdMenuSave from '@omicronenergy/oscd-menu-save';
import OscdBackgroundEditV1 from '@omicronenergy/oscd-background-editv1';

customElements.define('oscd-menu-open', OscdMenuOpen);
customElements.define('oscd-menu-save', OscdMenuSave);
customElements.define('oscd-background-editv1', OscdBackgroundEditV1);

import OscdMenuNew from '../oscd-menu-new.js';
import OscdMenuUndo from '../oscd-menu-undo.js';
import OscdMenuRedo from '../oscd-menu-redo.js';

customElements.define('oscd-menu-new', OscdMenuNew);
customElements.define('oscd-menu-undo', OscdMenuUndo);
customElements.define('oscd-menu-redo', OscdMenuRedo);

export const plugins = {
  menu: [
    {
      name: 'New...',
      translations: { de: 'Neu...' },
      icon: 'create_new_folder',
      requireDoc: true,
      tagName: 'oscd-menu-new',
    },
    {
      name: 'Open...',
      translations: { de: 'öffnen...' },
      icon: 'folder_open',
      tagName: 'oscd-menu-open',
    },
    {
      name: 'Save...',
      translations: { de: 'Speichern...' },
      icon: 'save',
      requireDoc: true,
      tagName: 'oscd-menu-save',
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
