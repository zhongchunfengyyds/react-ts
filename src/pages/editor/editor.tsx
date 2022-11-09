import '@wangeditor/editor/dist/css/style.css' // 引入 css
// import './editor.scss'
import React, {useState, useEffect} from 'react'
import {Editor, Toolbar} from '@wangeditor/editor-for-react'
import {IDomEditor, IEditorConfig, IToolbarConfig} from '@wangeditor/editor'

function MyEditor() {
    const [editor, setEditor] = useState<IDomEditor | null>(null) // TS 语法
    console.log('editor', editor)

    editor?.getHtml
    const [html, setHtml] = useState(
        `<p> <img src="https://cn.vitejs.dev/logo.svg" alt="1" data-href="2" /></p><p> <img src="https://cn.vitejs.dev/logo.svg" alt="1" data-href="2" /></p><p> <img src="https://cn.vitejs.dev/logo.svg" alt="1" data-href="2" /></p>`,
    )
    // 工具栏配置
    const toolbarConfig: Partial<IToolbarConfig> = {} // TS 语法
    console.log('toolbarConfig', toolbarConfig)

    // 编辑器配置
    const editorConfig: Partial<IEditorConfig> = {
        // TS 语法
        placeholder: '请输入内容...',
    }
    // 及时销毁 editor ，重要！
    useEffect(() => {
        return () => {
            if (editor == null) return
            editor.destroy()
            setEditor(null)
        }
    }, [editor])
    const htmlChange = (editor: IDomEditor) => {
        console.log('htmlChange', editor)
        setHtml(editor.getHtml())
        let imgs = document.querySelectorAll('.my-editor img')
        // 自定义鼠标右击事件
        imgs.forEach((img) => {
            img.addEventListener('contextmenu', (e) => {
                e.preventDefault()
                // 每次点击图片顺时针旋转 90 度
                img.style.transform = `rotate(${
                    (parseInt(img.style.transform.replace(/[^0-9]/gi, '')) ||
                        0) + 90
                }deg)`
            })
        })
    }
    return (
        <>
            <div
                style={{border: '1px solid #ccc', zIndex: 100}}
                className="my-editor">
                <Toolbar
                    editor={editor}
                    defaultConfig={toolbarConfig}
                    mode="default"
                    style={{borderBottom: '1px solid #ccc'}}
                />
                <Editor
                    defaultConfig={editorConfig}
                    value={html}
                    onCreated={setEditor}
                    onChange={(editor) => htmlChange(editor)}
                    mode="default"
                    style={{height: '500px', overflowY: 'hidden'}}
                />
            </div>
            <div style={{marginTop: '15px'}}>{html}</div>
        </>
    )
}

export default MyEditor
