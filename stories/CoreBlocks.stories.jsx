import { storiesOf } from '@storybook/react'
import { getBlockType } from '@wordpress/blocks'
import BlockExample from './components/block-example'
//import BlockEditor from '../components/block-editor'
import {
  __experimentalGetCoreBlocks,
  registerCoreBlocks
} from '@wordpress/block-library';

registerCoreBlocks();

const coreBlocks = __experimentalGetCoreBlocks();

coreBlocks.forEach((block) => {
  if (block === null) {
    return;
  }

  const blockType = getBlockType(block.name);

  if (typeof blockType.example !== 'undefined') {
      const stories = storiesOf(`Core/${block.metadata.title}`);
      if (typeof blockType.styles !== 'undefined' && blockType.styles.length > 0) {
        stories.addParameters({ backgrounds: { values: [{ name: 'red', value: '#f00' }] } })
        blockType.styles.forEach((style) => {
          stories.add(style.label, () => <BlockExample block={blockType} />)
        })
      } else {
        stories.add('Default', () => <BlockExample block={blockType} />)
      }
  }
});
