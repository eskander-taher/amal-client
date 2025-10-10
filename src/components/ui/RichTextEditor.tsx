'use client';

import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import { TextAlign } from '@tiptap/extension-text-align';
import { Underline } from '@tiptap/extension-underline';
import { Link } from '@tiptap/extension-link';
import { Image } from '@tiptap/extension-image';
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link as LinkIcon,
  Image as ImageIcon,
  Palette,
} from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder = 'أدخل النص هنا...',
  className = '',
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      Color,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-600 underline hover:text-blue-800',
        },
      }),
      Image.configure({
        inline: true,
        allowBase64: true,
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm max-w-none focus:outline-none min-h-[120px] px-3 py-2 tiptap-editor',
      },
    },
    immediatelyRender: false, // Fix SSR hydration issue
  });

  if (!editor) {
    return (
		<div className={`border border-gray-300 rounded-md ${className}`}>
			<div className="border-b border-[#f5f5f7] p-2 bg-gray-50 rounded-t-md">
				<div className="h-8 bg-[#f5f5f7] rounded animate-pulse"></div>
			</div>
			<div className="min-h-[120px] p-3 flex items-center justify-center">
				<div className="text-gray-500">جاري تحميل المحرر...</div>
			</div>
		</div>
	);
  }

  const addLink = () => {
    const url = window.prompt('أدخل رابط URL:');
    if (url) {
      editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    }
  };

  const addImage = () => {
    const url = window.prompt('أدخل رابط الصورة:');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const setColor = (color: string) => {
    editor.chain().focus().setColor(color).run();
  };

  return (
		<div
			className={`border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 ${className}`}
		>
			{/* Toolbar */}
			<div className="border-b border-[#f5f5f7] p-2 flex flex-wrap items-center gap-1 bg-gray-50 rounded-t-md">
				{/* Text Formatting */}
				<div className="flex items-center gap-1 border-r border-gray-300 pr-2 mr-2">
					<button
						type="button"
						onClick={() => editor.chain().focus().toggleBold().run()}
						className={`p-1.5 rounded hover:bg-[#f5f5f7] transition-colors ${
							editor.isActive("bold") ? "bg-blue-200 text-blue-800" : ""
						}`}
						title="عريض"
					>
						<Bold className="w-4 h-4" />
					</button>
					<button
						type="button"
						onClick={() => editor.chain().focus().toggleItalic().run()}
						className={`p-1.5 rounded hover:bg-[#f5f5f7] ${
							editor.isActive("italic") ? "bg-gray-300" : ""
						}`}
						title="مائل"
					>
						<Italic className="w-4 h-4" />
					</button>
					<button
						type="button"
						onClick={() => editor.chain().focus().toggleUnderline().run()}
						className={`p-1.5 rounded hover:bg-[#f5f5f7] ${
							editor.isActive("underline") ? "bg-gray-300" : ""
						}`}
						title="تحته خط"
					>
						<UnderlineIcon className="w-4 h-4" />
					</button>
					<button
						type="button"
						onClick={() => editor.chain().focus().toggleStrike().run()}
						className={`p-1.5 rounded hover:bg-[#f5f5f7] ${
							editor.isActive("strike") ? "bg-gray-300" : ""
						}`}
						title="يتوسطه خط"
					>
						<Strikethrough className="w-4 h-4" />
					</button>
				</div>

				{/* Lists */}
				<div className="flex items-center gap-1 border-r border-gray-300 pr-2 mr-2">
					<button
						type="button"
						onClick={() => {
							console.log(
								"Bullet list clicked, current state:",
								editor.isActive("bulletList")
							);
							editor.chain().focus().toggleBulletList().run();
						}}
						className={`p-1.5 rounded hover:bg-[#f5f5f7] transition-colors ${
							editor.isActive("bulletList") ? "bg-blue-200 text-blue-800" : ""
						}`}
						title="قائمة نقطية"
					>
						<List className="w-4 h-4" />
					</button>
					<button
						type="button"
						onClick={() => editor.chain().focus().toggleOrderedList().run()}
						className={`p-1.5 rounded hover:bg-[#f5f5f7] transition-colors ${
							editor.isActive("orderedList") ? "bg-blue-200 text-blue-800" : ""
						}`}
						title="قائمة مرقمة"
					>
						<ListOrdered className="w-4 h-4" />
					</button>
					<button
						type="button"
						onClick={() => editor.chain().focus().toggleBlockquote().run()}
						className={`p-1.5 rounded hover:bg-[#f5f5f7] ${
							editor.isActive("blockquote") ? "bg-gray-300" : ""
						}`}
						title="اقتباس"
					>
						<Quote className="w-4 h-4" />
					</button>
				</div>

				{/* Alignment */}
				<div className="flex items-center gap-1 border-r border-gray-300 pr-2 mr-2">
					<button
						type="button"
						onClick={() => editor.chain().focus().setTextAlign("left").run()}
						className={`p-1.5 rounded hover:bg-[#f5f5f7] ${
							editor.isActive({ textAlign: "left" }) ? "bg-gray-300" : ""
						}`}
						title="محاذاة يسار"
					>
						<AlignLeft className="w-4 h-4" />
					</button>
					<button
						type="button"
						onClick={() => editor.chain().focus().setTextAlign("center").run()}
						className={`p-1.5 rounded hover:bg-[#f5f5f7] ${
							editor.isActive({ textAlign: "center" }) ? "bg-gray-300" : ""
						}`}
						title="محاذاة وسط"
					>
						<AlignCenter className="w-4 h-4" />
					</button>
					<button
						type="button"
						onClick={() => editor.chain().focus().setTextAlign("right").run()}
						className={`p-1.5 rounded hover:bg-[#f5f5f7] ${
							editor.isActive({ textAlign: "right" }) ? "bg-gray-300" : ""
						}`}
						title="محاذاة يمين"
					>
						<AlignRight className="w-4 h-4" />
					</button>
				</div>

				{/* Links and Images */}
				<div className="flex items-center gap-1 border-r border-gray-300 pr-2 mr-2">
					<button
						type="button"
						onClick={addLink}
						className={`p-1.5 rounded hover:bg-[#f5f5f7] ${
							editor.isActive("link") ? "bg-gray-300" : ""
						}`}
						title="إضافة رابط"
					>
						<LinkIcon className="w-4 h-4" />
					</button>
					<button
						type="button"
						onClick={addImage}
						className="p-1.5 rounded hover:bg-[#f5f5f7]"
						title="إضافة صورة"
					>
						<ImageIcon className="w-4 h-4" />
					</button>
				</div>

				{/* Colors */}
				<div className="flex items-center gap-1 border-r border-gray-300 pr-2 mr-2">
					<div className="relative group">
						<button
							type="button"
							className="p-1.5 rounded hover:bg-[#f5f5f7] flex items-center"
							title="لون النص"
						>
							<Palette className="w-4 h-4" />
						</button>
						<div className="absolute top-full left-0 mt-1 p-2 bg-white border border-[#f5f5f7] rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
							<div className="grid grid-cols-6 gap-1">
								{[
									"#000000",
									"#374151",
									"#6B7280",
									"#EF4444",
									"#F59E0B",
									"#10B981",
									"#3B82F6",
									"#8B5CF6",
									"#EC4899",
									"#F97316",
									"#84CC16",
									"#06B6D4",
								].map((color) => (
									<button
										key={color}
										type="button"
										className="w-6 h-6 rounded border border-gray-300 hover:scale-110 transition-transform"
										style={{ backgroundColor: color }}
										onClick={() => setColor(color)}
									/>
								))}
							</div>
						</div>
					</div>
				</div>

				{/* Undo/Redo */}
				<div className="flex items-center gap-1">
					<button
						type="button"
						onClick={() => editor.chain().focus().undo().run()}
						disabled={!editor.can().undo()}
						className="p-1.5 rounded hover:bg-[#f5f5f7] disabled:opacity-50 disabled:cursor-not-allowed"
						title="تراجع"
					>
						<Undo className="w-4 h-4" />
					</button>
					<button
						type="button"
						onClick={() => editor.chain().focus().redo().run()}
						disabled={!editor.can().redo()}
						className="p-1.5 rounded hover:bg-[#f5f5f7] disabled:opacity-50 disabled:cursor-not-allowed"
						title="إعادة"
					>
						<Redo className="w-4 h-4" />
					</button>
				</div>
			</div>

			{/* Editor Content */}
			<div className="min-h-[120px] max-h-[400px] overflow-y-auto">
				<EditorContent editor={editor} placeholder={placeholder} />
			</div>
		</div>
  );
}
