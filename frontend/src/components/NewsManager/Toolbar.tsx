import React from "react";
import { Editor } from "@tiptap/react";
import {
    Bold,
    Italic,
    Underline,
    Heading1,
    Heading2,
    Heading3,
    ListOrdered,
    List,
    AlignLeft,
    AlignCenter,
    AlignRight,
    Image as ImageIcon
} from "lucide-react";

interface ToolbarProps {
    editor: Editor | null;
}

const Toolbar: React.FC<ToolbarProps> = ({ editor }) => {
    if (!editor) return null;

    return (
        <div className="flex flex-wrap gap-2 mb-4 border rounded-md py-2 text-gray-600 bg-gray-50">
            <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className="btn-icon">
                <Bold size={18} />
            </button>
            <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className="btn-icon">
                <Italic size={18} />
            </button>
            <button type="button" onClick={() => editor.chain().focus().toggleUnderline().run()} className="btn-icon">
                <Underline size={18} />
            </button>

            <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className="btn-icon">
                <Heading1 size={18} />
            </button>
            <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className="btn-icon">
                <Heading2 size={18} />
            </button>
            <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className="btn-icon">
                <Heading3 size={18} />
            </button>

            <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className="btn-icon">
                <List size={18} />
            </button>
            <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className="btn-icon">
                <ListOrdered size={18} />
            </button>

            <button
                type="button"
                onClick={() => {
                    editor.chain().focus().setTextAlign("left").run();

                    const isImageActive = editor.isActive("resizableImage");
                    if (isImageActive) {
                        editor.chain().focus().updateAttributes("resizableImage", { align: "left" }).run();
                    }
                }}
                className="btn-icon"
            >
                <AlignLeft size={18} />
            </button>

            <button
                type="button"
                onClick={() => {
                    editor.chain().focus().setTextAlign("center").run();

                    const isImageActive = editor.isActive("resizableImage");
                    if (isImageActive) {
                        editor.chain().focus().updateAttributes("resizableImage", { align: "center" }).run();
                    }
                }}
                className="btn-icon"
            >
                <AlignCenter size={18} />
            </button>

            <button
                type="button"
                onClick={() => {
                    editor.chain().focus().setTextAlign("right").run();

                    const isImageActive = editor.isActive("resizableImage");
                    if (isImageActive) {
                        editor.chain().focus().updateAttributes("resizableImage", { align: "right" }).run();
                    }
                }}
                className="btn-icon"
            >
                <AlignRight size={18} />
            </button>

            <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file || !editor) return;

                    const reader = new FileReader();
                    reader.onload = () => {
                        const base64 = reader.result as string;
                        // editor.chain().focus().setImage({ src: base64 }).run();
                        editor.chain().focus().insertContent({
                            type: 'resizableImage',
                            attrs: {
                                src: base64,
                                width: '300px',
                                height: 'auto',
                            },
                        }).run();
                    };
                    reader.readAsDataURL(file);
                }}
                className="hidden"
                id="upload-image"
            />
            <label htmlFor="upload-image" className="btn-icon cursor-pointer">
                <ImageIcon size={18} />
            </label>

        </div>
    );
};

export default Toolbar;

// TailwindCSS style suggestion for button
// Add this to your global styles or wrap buttons with className="btn-icon"
// .btn-icon {
//   @apply p-2 rounded-md hover:bg-gray-200 transition;
// }