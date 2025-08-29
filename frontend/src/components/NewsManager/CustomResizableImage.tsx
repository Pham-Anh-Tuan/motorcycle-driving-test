import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import ImageComponent from './ImageComponent'

export const CustomResizableImage = Node.create({
  name: 'resizableImage',
  group: 'block',
  selectable: true,
  draggable: true,
  atom: true,

  addAttributes() {
    return {
      src: { default: null },
      width: {
        default: 'auto',
        parseHTML: el => el.getAttribute('width'),
        renderHTML: attributes => ({ width: attributes.width }),
      },
      height: {
        default: 'auto',
        parseHTML: el => el.getAttribute('height'),
        renderHTML: attributes => ({ height: attributes.height }),
      },
      align: {
        default: null,
        parseHTML: el => el.getAttribute('data-align'),
        renderHTML: attributes => {
          if (!attributes.align) return {};
          return {
            'data-align': attributes.align,
            style: `display: block; margin: ${
              attributes.align === 'center'
                ? '0 auto'
                : attributes.align === 'right'
                ? '0 0 0 auto'
                : '0'
            };`,
          };
        },
      },
    };
  },

  parseHTML() {
    return [{ tag: 'img' }]
  },

  renderHTML({ HTMLAttributes }) {
    return ['img', mergeAttributes(HTMLAttributes)]
  },

  addNodeView() {
    return ReactNodeViewRenderer(ImageComponent)
  },
})