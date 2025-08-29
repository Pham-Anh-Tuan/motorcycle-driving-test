import React, { useRef } from 'react';
import { NodeViewWrapper } from '@tiptap/react';
import type { NodeViewProps } from '@tiptap/react';

const ImageComponent: React.FC<NodeViewProps> = ({ node, updateAttributes, selected }) => {
    const { src, width, height, align } = node.attrs;
    const imageRef = useRef<HTMLImageElement>(null);

    const startResize = (e: React.MouseEvent) => {
        e.preventDefault();

        const startX = e.clientX;
        const startWidth = imageRef.current?.offsetWidth ?? 0;

        const onMouseMove = (moveEvent: MouseEvent) => {
            const newWidth = startWidth + moveEvent.clientX - startX;
            if (newWidth > 50) {
                updateAttributes({ width: `${newWidth}px` });
            }
        };

        const onMouseUp = () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);
    };

    // CSS xử lý căn lề động dựa trên align
    let alignmentClass = '';
    if (align === 'center') {
        alignmentClass = 'mx-auto';
    } else if (align === 'left') {
        alignmentClass = 'mr-auto';
    } else if (align === 'right') {
        alignmentClass = 'ml-auto';
    }

    return (
        <NodeViewWrapper className={`block group ${alignmentClass}`} data-align={align}>
            <div className="inline-block relative">
                <img
                    ref={imageRef}
                    src={src}
                    width={width}
                    height={height}
                    className=" shadow block"
                />
                {selected && (
                    <span
                        onMouseDown={startResize}
                        className="absolute bottom-0 right-0 w-3 h-3 bg-white cursor-se-resize border-2 border-gray-500
            rounded-full translate-x-1/2 translate-y-1/2"
                    />
                )}
            </div>
        </NodeViewWrapper>
    );

};

export default ImageComponent;