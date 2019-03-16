/* tslint:disable */
import * as wasm from './native_bg';

/**
* @returns {void}
*/
export function run() {
    return wasm.run();
}

const lTextDecoder = typeof TextDecoder === 'undefined' ? require('util').TextDecoder : TextDecoder;

let cachedTextDecoder = new lTextDecoder('utf-8');

let cachegetUint8Memory = null;
function getUint8Memory() {
    if (cachegetUint8Memory === null || cachegetUint8Memory.buffer !== wasm.memory.buffer) {
        cachegetUint8Memory = new Uint8Array(wasm.memory.buffer);
    }
    return cachegetUint8Memory;
}

function getStringFromWasm(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory().subarray(ptr, ptr + len));
}

export function __wbg_log_3fdab1918ca82b05(arg0, arg1) {
    let varg0 = getStringFromWasm(arg0, arg1);
    console.log(varg0);
}

const heap = new Array(32);

heap.fill(undefined);

heap.push(undefined, null, true, false);

function getObject(idx) { return heap[idx]; }

export function __widl_f_x_DOMRect(arg0) {
    return getObject(arg0).x;
}

export function __widl_f_y_DOMRect(arg0) {
    return getObject(arg0).y;
}

let heap_next = heap.length;

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    heap[idx] = obj;
    return idx;
}

let cachegetUint32Memory = null;
function getUint32Memory() {
    if (cachegetUint32Memory === null || cachegetUint32Memory.buffer !== wasm.memory.buffer) {
        cachegetUint32Memory = new Uint32Array(wasm.memory.buffer);
    }
    return cachegetUint32Memory;
}

function handleError(exnptr, e) {
    const view = getUint32Memory();
    view[exnptr / 4] = 1;
    view[exnptr / 4 + 1] = addHeapObject(e);
}

export function __widl_f_create_element_Document(arg0, arg1, arg2, exnptr) {
    let varg1 = getStringFromWasm(arg1, arg2);
    try {
        return addHeapObject(getObject(arg0).createElement(varg1));
    } catch (e) {
        handleError(exnptr, e);
    }
}

function isLikeNone(x) {
    return x === undefined || x === null;
}

export function __widl_f_get_element_by_id_Document(arg0, arg1, arg2) {
    let varg1 = getStringFromWasm(arg1, arg2);

    const val = getObject(arg0).getElementById(varg1);
    return isLikeNone(val) ? 0 : addHeapObject(val);

}

export function __widl_f_get_elements_by_tag_name_Document(arg0, arg1, arg2) {
    let varg1 = getStringFromWasm(arg1, arg2);
    return addHeapObject(getObject(arg0).getElementsByTagName(varg1));
}

export function __widl_f_has_focus_Document(arg0, exnptr) {
    try {
        return getObject(arg0).hasFocus();
    } catch (e) {
        handleError(exnptr, e);
    }
}

export function __widl_f_body_Document(arg0) {

    const val = getObject(arg0).body;
    return isLikeNone(val) ? 0 : addHeapObject(val);

}

export function __widl_f_get_bounding_client_rect_Element(arg0) {
    return addHeapObject(getObject(arg0).getBoundingClientRect());
}

export function __widl_f_set_attribute_Element(arg0, arg1, arg2, arg3, arg4, exnptr) {
    let varg1 = getStringFromWasm(arg1, arg2);
    let varg3 = getStringFromWasm(arg3, arg4);
    try {
        getObject(arg0).setAttribute(varg1, varg3);
    } catch (e) {
        handleError(exnptr, e);
    }
}

export function __widl_f_set_inner_html_Element(arg0, arg1, arg2) {
    let varg1 = getStringFromWasm(arg1, arg2);
    getObject(arg0).innerHTML = varg1;
}

export function __widl_f_prevent_default_Event(arg0) {
    getObject(arg0).preventDefault();
}

export function __widl_f_add_event_listener_with_callback_EventTarget(arg0, arg1, arg2, arg3, exnptr) {
    let varg1 = getStringFromWasm(arg1, arg2);
    try {
        getObject(arg0).addEventListener(varg1, getObject(arg3));
    } catch (e) {
        handleError(exnptr, e);
    }
}

export function __widl_instanceof_HTMLCanvasElement(idx) { return getObject(idx) instanceof HTMLCanvasElement ? 1 : 0; }

export function __widl_f_get_context_HTMLCanvasElement(arg0, arg1, arg2, exnptr) {
    let varg1 = getStringFromWasm(arg1, arg2);
    try {

        const val = getObject(arg0).getContext(varg1);
        return isLikeNone(val) ? 0 : addHeapObject(val);

    } catch (e) {
        handleError(exnptr, e);
    }
}

export function __widl_f_width_HTMLCanvasElement(arg0) {
    return getObject(arg0).width;
}

export function __widl_f_set_width_HTMLCanvasElement(arg0, arg1) {
    getObject(arg0).width = arg1;
}

export function __widl_f_height_HTMLCanvasElement(arg0) {
    return getObject(arg0).height;
}

export function __widl_f_set_height_HTMLCanvasElement(arg0, arg1) {
    getObject(arg0).height = arg1;
}

export function __widl_instanceof_HTMLInputElement(idx) { return getObject(idx) instanceof HTMLInputElement ? 1 : 0; }

const lTextEncoder = typeof TextEncoder === 'undefined' ? require('util').TextEncoder : TextEncoder;

let cachedTextEncoder = new lTextEncoder('utf-8');

let WASM_VECTOR_LEN = 0;

let passStringToWasm;
if (typeof cachedTextEncoder.encodeInto === 'function') {
    passStringToWasm = function(arg) {

        let size = arg.length;
        let ptr = wasm.__wbindgen_malloc(size);
        let writeOffset = 0;
        while (true) {
            const view = getUint8Memory().subarray(ptr + writeOffset, ptr + size);
            const { read, written } = cachedTextEncoder.encodeInto(arg, view);
            arg = arg.substring(read);
            writeOffset += written;
            if (arg.length === 0) {
                break;
            }
            ptr = wasm.__wbindgen_realloc(ptr, size, size * 2);
            size *= 2;
        }
        WASM_VECTOR_LEN = writeOffset;
        return ptr;
    };
} else {
    passStringToWasm = function(arg) {

        const buf = cachedTextEncoder.encode(arg);
        const ptr = wasm.__wbindgen_malloc(buf.length);
        getUint8Memory().set(buf, ptr);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    };
}

export function __widl_f_value_HTMLInputElement(ret, arg0) {

    const retptr = passStringToWasm(getObject(arg0).value);
    const retlen = WASM_VECTOR_LEN;
    const mem = getUint32Memory();
    mem[ret / 4] = retptr;
    mem[ret / 4 + 1] = retlen;

}

export function __widl_f_key_KeyboardEvent(ret, arg0) {

    const retptr = passStringToWasm(getObject(arg0).key);
    const retlen = WASM_VECTOR_LEN;
    const mem = getUint32Memory();
    mem[ret / 4] = retptr;
    mem[ret / 4 + 1] = retlen;

}

export function __widl_f_client_x_MouseEvent(arg0) {
    return getObject(arg0).clientX;
}

export function __widl_f_client_y_MouseEvent(arg0) {
    return getObject(arg0).clientY;
}

export function __widl_f_button_MouseEvent(arg0) {
    return getObject(arg0).button;
}

export function __widl_f_append_child_Node(arg0, arg1, exnptr) {
    try {
        return addHeapObject(getObject(arg0).appendChild(getObject(arg1)));
    } catch (e) {
        handleError(exnptr, e);
    }
}

export function __widl_f_now_Performance(arg0) {
    return getObject(arg0).now();
}

export function __widl_instanceof_WebGL2RenderingContext(idx) { return getObject(idx) instanceof WebGL2RenderingContext ? 1 : 0; }

export function __widl_f_bind_vertex_array_WebGL2RenderingContext(arg0, arg1) {
    getObject(arg0).bindVertexArray(getObject(arg1));
}

export function __widl_f_buffer_data_with_i32_WebGL2RenderingContext(arg0, arg1, arg2, arg3) {
    getObject(arg0).bufferData(arg1, arg2, arg3);
}

function getArrayU8FromWasm(ptr, len) {
    return getUint8Memory().subarray(ptr / 1, ptr / 1 + len);
}

export function __widl_f_buffer_data_with_u8_array_WebGL2RenderingContext(arg0, arg1, arg2, arg3, arg4) {
    let varg2 = getArrayU8FromWasm(arg2, arg3);
    getObject(arg0).bufferData(arg1, varg2, arg4);
}

export function __widl_f_buffer_sub_data_with_i32_and_u8_array_WebGL2RenderingContext(arg0, arg1, arg2, arg3, arg4) {
    let varg3 = getArrayU8FromWasm(arg3, arg4);
    getObject(arg0).bufferSubData(arg1, arg2, varg3);
}

export function __widl_f_compressed_tex_image_2d_with_u8_array_WebGL2RenderingContext(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8) {
    let varg7 = getArrayU8FromWasm(arg7, arg8);
    getObject(arg0).compressedTexImage2D(arg1, arg2, arg3, arg4, arg5, arg6, varg7);
}

export function __widl_f_create_vertex_array_WebGL2RenderingContext(arg0) {

    const val = getObject(arg0).createVertexArray();
    return isLikeNone(val) ? 0 : addHeapObject(val);

}

export function __widl_f_delete_vertex_array_WebGL2RenderingContext(arg0, arg1) {
    getObject(arg0).deleteVertexArray(getObject(arg1));
}

export function __widl_f_tex_image_2d_with_i32_and_i32_and_i32_and_format_and_type_and_opt_u8_array_WebGL2RenderingContext(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, exnptr) {
    let varg9 = arg9 == 0 ? undefined : getArrayU8FromWasm(arg9, arg10);
    try {
        getObject(arg0).texImage2D(arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, varg9);
    } catch (e) {
        handleError(exnptr, e);
    }
}

export function __widl_f_tex_sub_image_2d_with_i32_and_i32_and_u32_and_type_and_opt_u8_array_WebGL2RenderingContext(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, exnptr) {
    let varg9 = arg9 == 0 ? undefined : getArrayU8FromWasm(arg9, arg10);
    try {
        getObject(arg0).texSubImage2D(arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, varg9);
    } catch (e) {
        handleError(exnptr, e);
    }
}

let cachegetFloat32Memory = null;
function getFloat32Memory() {
    if (cachegetFloat32Memory === null || cachegetFloat32Memory.buffer !== wasm.memory.buffer) {
        cachegetFloat32Memory = new Float32Array(wasm.memory.buffer);
    }
    return cachegetFloat32Memory;
}

function getArrayF32FromWasm(ptr, len) {
    return getFloat32Memory().subarray(ptr / 4, ptr / 4 + len);
}

export function __widl_f_uniform_matrix2fv_with_f32_array_WebGL2RenderingContext(arg0, arg1, arg2, arg3, arg4) {
    let varg3 = getArrayF32FromWasm(arg3, arg4);
    getObject(arg0).uniformMatrix2fv(getObject(arg1), arg2 !== 0, varg3);
}

export function __widl_f_uniform_matrix3fv_with_f32_array_WebGL2RenderingContext(arg0, arg1, arg2, arg3, arg4) {
    let varg3 = getArrayF32FromWasm(arg3, arg4);
    getObject(arg0).uniformMatrix3fv(getObject(arg1), arg2 !== 0, varg3);
}

export function __widl_f_uniform_matrix4fv_with_f32_array_WebGL2RenderingContext(arg0, arg1, arg2, arg3, arg4) {
    let varg3 = getArrayF32FromWasm(arg3, arg4);
    getObject(arg0).uniformMatrix4fv(getObject(arg1), arg2 !== 0, varg3);
}

export function __widl_f_active_texture_WebGL2RenderingContext(arg0, arg1) {
    getObject(arg0).activeTexture(arg1);
}

export function __widl_f_attach_shader_WebGL2RenderingContext(arg0, arg1, arg2) {
    getObject(arg0).attachShader(getObject(arg1), getObject(arg2));
}

export function __widl_f_bind_buffer_WebGL2RenderingContext(arg0, arg1, arg2) {
    getObject(arg0).bindBuffer(arg1, getObject(arg2));
}

export function __widl_f_bind_framebuffer_WebGL2RenderingContext(arg0, arg1, arg2) {
    getObject(arg0).bindFramebuffer(arg1, getObject(arg2));
}

export function __widl_f_bind_renderbuffer_WebGL2RenderingContext(arg0, arg1, arg2) {
    getObject(arg0).bindRenderbuffer(arg1, getObject(arg2));
}

export function __widl_f_bind_texture_WebGL2RenderingContext(arg0, arg1, arg2) {
    getObject(arg0).bindTexture(arg1, getObject(arg2));
}

export function __widl_f_blend_equation_WebGL2RenderingContext(arg0, arg1) {
    getObject(arg0).blendEquation(arg1);
}

export function __widl_f_blend_func_WebGL2RenderingContext(arg0, arg1, arg2) {
    getObject(arg0).blendFunc(arg1, arg2);
}

export function __widl_f_check_framebuffer_status_WebGL2RenderingContext(arg0, arg1) {
    return getObject(arg0).checkFramebufferStatus(arg1);
}

export function __widl_f_clear_WebGL2RenderingContext(arg0, arg1) {
    getObject(arg0).clear(arg1);
}

export function __widl_f_clear_color_WebGL2RenderingContext(arg0, arg1, arg2, arg3, arg4) {
    getObject(arg0).clearColor(arg1, arg2, arg3, arg4);
}

export function __widl_f_clear_depth_WebGL2RenderingContext(arg0, arg1) {
    getObject(arg0).clearDepth(arg1);
}

export function __widl_f_clear_stencil_WebGL2RenderingContext(arg0, arg1) {
    getObject(arg0).clearStencil(arg1);
}

export function __widl_f_color_mask_WebGL2RenderingContext(arg0, arg1, arg2, arg3, arg4) {
    getObject(arg0).colorMask(arg1 !== 0, arg2 !== 0, arg3 !== 0, arg4 !== 0);
}

export function __widl_f_compile_shader_WebGL2RenderingContext(arg0, arg1) {
    getObject(arg0).compileShader(getObject(arg1));
}

export function __widl_f_create_buffer_WebGL2RenderingContext(arg0) {

    const val = getObject(arg0).createBuffer();
    return isLikeNone(val) ? 0 : addHeapObject(val);

}

export function __widl_f_create_framebuffer_WebGL2RenderingContext(arg0) {

    const val = getObject(arg0).createFramebuffer();
    return isLikeNone(val) ? 0 : addHeapObject(val);

}

export function __widl_f_create_program_WebGL2RenderingContext(arg0) {

    const val = getObject(arg0).createProgram();
    return isLikeNone(val) ? 0 : addHeapObject(val);

}

export function __widl_f_create_renderbuffer_WebGL2RenderingContext(arg0) {

    const val = getObject(arg0).createRenderbuffer();
    return isLikeNone(val) ? 0 : addHeapObject(val);

}

export function __widl_f_create_shader_WebGL2RenderingContext(arg0, arg1) {

    const val = getObject(arg0).createShader(arg1);
    return isLikeNone(val) ? 0 : addHeapObject(val);

}

export function __widl_f_create_texture_WebGL2RenderingContext(arg0) {

    const val = getObject(arg0).createTexture();
    return isLikeNone(val) ? 0 : addHeapObject(val);

}

export function __widl_f_cull_face_WebGL2RenderingContext(arg0, arg1) {
    getObject(arg0).cullFace(arg1);
}

export function __widl_f_delete_buffer_WebGL2RenderingContext(arg0, arg1) {
    getObject(arg0).deleteBuffer(getObject(arg1));
}

export function __widl_f_delete_framebuffer_WebGL2RenderingContext(arg0, arg1) {
    getObject(arg0).deleteFramebuffer(getObject(arg1));
}

export function __widl_f_delete_program_WebGL2RenderingContext(arg0, arg1) {
    getObject(arg0).deleteProgram(getObject(arg1));
}

export function __widl_f_delete_renderbuffer_WebGL2RenderingContext(arg0, arg1) {
    getObject(arg0).deleteRenderbuffer(getObject(arg1));
}

export function __widl_f_delete_texture_WebGL2RenderingContext(arg0, arg1) {
    getObject(arg0).deleteTexture(getObject(arg1));
}

export function __widl_f_depth_func_WebGL2RenderingContext(arg0, arg1) {
    getObject(arg0).depthFunc(arg1);
}

export function __widl_f_depth_mask_WebGL2RenderingContext(arg0, arg1) {
    getObject(arg0).depthMask(arg1 !== 0);
}

export function __widl_f_disable_WebGL2RenderingContext(arg0, arg1) {
    getObject(arg0).disable(arg1);
}

export function __widl_f_draw_elements_with_i32_WebGL2RenderingContext(arg0, arg1, arg2, arg3, arg4) {
    getObject(arg0).drawElements(arg1, arg2, arg3, arg4);
}

export function __widl_f_enable_WebGL2RenderingContext(arg0, arg1) {
    getObject(arg0).enable(arg1);
}

export function __widl_f_enable_vertex_attrib_array_WebGL2RenderingContext(arg0, arg1) {
    getObject(arg0).enableVertexAttribArray(arg1);
}

export function __widl_f_finish_WebGL2RenderingContext(arg0) {
    getObject(arg0).finish();
}

export function __widl_f_framebuffer_renderbuffer_WebGL2RenderingContext(arg0, arg1, arg2, arg3, arg4) {
    getObject(arg0).framebufferRenderbuffer(arg1, arg2, arg3, getObject(arg4));
}

export function __widl_f_framebuffer_texture_2d_WebGL2RenderingContext(arg0, arg1, arg2, arg3, arg4, arg5) {
    getObject(arg0).framebufferTexture2D(arg1, arg2, arg3, getObject(arg4), arg5);
}

export function __widl_f_front_face_WebGL2RenderingContext(arg0, arg1) {
    getObject(arg0).frontFace(arg1);
}

export function __widl_f_get_attrib_location_WebGL2RenderingContext(arg0, arg1, arg2, arg3) {
    let varg2 = getStringFromWasm(arg2, arg3);
    return getObject(arg0).getAttribLocation(getObject(arg1), varg2);
}

export function __widl_f_get_error_WebGL2RenderingContext(arg0) {
    return getObject(arg0).getError();
}

export function __widl_f_get_extension_WebGL2RenderingContext(arg0, arg1, arg2, exnptr) {
    let varg1 = getStringFromWasm(arg1, arg2);
    try {

        const val = getObject(arg0).getExtension(varg1);
        return isLikeNone(val) ? 0 : addHeapObject(val);

    } catch (e) {
        handleError(exnptr, e);
    }
}

export function __widl_f_get_program_info_log_WebGL2RenderingContext(ret, arg0, arg1) {
    const val = getObject(arg0).getProgramInfoLog(getObject(arg1));
    const retptr = isLikeNone(val) ? [0, 0] : passStringToWasm(val);
    const retlen = WASM_VECTOR_LEN;
    const mem = getUint32Memory();
    mem[ret / 4] = retptr;
    mem[ret / 4 + 1] = retlen;

}

export function __widl_f_get_program_parameter_WebGL2RenderingContext(arg0, arg1, arg2) {
    return addHeapObject(getObject(arg0).getProgramParameter(getObject(arg1), arg2));
}

export function __widl_f_get_shader_info_log_WebGL2RenderingContext(ret, arg0, arg1) {
    const val = getObject(arg0).getShaderInfoLog(getObject(arg1));
    const retptr = isLikeNone(val) ? [0, 0] : passStringToWasm(val);
    const retlen = WASM_VECTOR_LEN;
    const mem = getUint32Memory();
    mem[ret / 4] = retptr;
    mem[ret / 4 + 1] = retlen;

}

export function __widl_f_get_shader_parameter_WebGL2RenderingContext(arg0, arg1, arg2) {
    return addHeapObject(getObject(arg0).getShaderParameter(getObject(arg1), arg2));
}

export function __widl_f_get_uniform_location_WebGL2RenderingContext(arg0, arg1, arg2, arg3) {
    let varg2 = getStringFromWasm(arg2, arg3);

    const val = getObject(arg0).getUniformLocation(getObject(arg1), varg2);
    return isLikeNone(val) ? 0 : addHeapObject(val);

}

export function __widl_f_link_program_WebGL2RenderingContext(arg0, arg1) {
    getObject(arg0).linkProgram(getObject(arg1));
}

export function __widl_f_pixel_storei_WebGL2RenderingContext(arg0, arg1, arg2) {
    getObject(arg0).pixelStorei(arg1, arg2);
}

export function __widl_f_polygon_offset_WebGL2RenderingContext(arg0, arg1, arg2) {
    getObject(arg0).polygonOffset(arg1, arg2);
}

export function __widl_f_renderbuffer_storage_WebGL2RenderingContext(arg0, arg1, arg2, arg3, arg4) {
    getObject(arg0).renderbufferStorage(arg1, arg2, arg3, arg4);
}

export function __widl_f_scissor_WebGL2RenderingContext(arg0, arg1, arg2, arg3, arg4) {
    getObject(arg0).scissor(arg1, arg2, arg3, arg4);
}

export function __widl_f_shader_source_WebGL2RenderingContext(arg0, arg1, arg2, arg3) {
    let varg2 = getStringFromWasm(arg2, arg3);
    getObject(arg0).shaderSource(getObject(arg1), varg2);
}

export function __widl_f_tex_parameteri_WebGL2RenderingContext(arg0, arg1, arg2, arg3) {
    getObject(arg0).texParameteri(arg1, arg2, arg3);
}

export function __widl_f_uniform1f_WebGL2RenderingContext(arg0, arg1, arg2) {
    getObject(arg0).uniform1f(getObject(arg1), arg2);
}

export function __widl_f_uniform1i_WebGL2RenderingContext(arg0, arg1, arg2) {
    getObject(arg0).uniform1i(getObject(arg1), arg2);
}

export function __widl_f_uniform2f_WebGL2RenderingContext(arg0, arg1, arg2, arg3) {
    getObject(arg0).uniform2f(getObject(arg1), arg2, arg3);
}

export function __widl_f_uniform3f_WebGL2RenderingContext(arg0, arg1, arg2, arg3, arg4) {
    getObject(arg0).uniform3f(getObject(arg1), arg2, arg3, arg4);
}

export function __widl_f_uniform4f_WebGL2RenderingContext(arg0, arg1, arg2, arg3, arg4, arg5) {
    getObject(arg0).uniform4f(getObject(arg1), arg2, arg3, arg4, arg5);
}

export function __widl_f_use_program_WebGL2RenderingContext(arg0, arg1) {
    getObject(arg0).useProgram(getObject(arg1));
}

export function __widl_f_vertex_attrib_pointer_with_i32_WebGL2RenderingContext(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
    getObject(arg0).vertexAttribPointer(arg1, arg2, arg3, arg4 !== 0, arg5, arg6);
}

export function __widl_f_viewport_WebGL2RenderingContext(arg0, arg1, arg2, arg3, arg4) {
    getObject(arg0).viewport(arg1, arg2, arg3, arg4);
}

export function __widl_instanceof_Window(idx) { return getObject(idx) instanceof Window ? 1 : 0; }

export function __widl_f_request_animation_frame_Window(arg0, arg1, exnptr) {
    try {
        return getObject(arg0).requestAnimationFrame(getObject(arg1));
    } catch (e) {
        handleError(exnptr, e);
    }
}

export function __widl_f_document_Window(arg0) {

    const val = getObject(arg0).document;
    return isLikeNone(val) ? 0 : addHeapObject(val);

}

export function __widl_f_device_pixel_ratio_Window(arg0) {
    return getObject(arg0).devicePixelRatio;
}

export function __widl_f_performance_Window(arg0) {

    const val = getObject(arg0).performance;
    return isLikeNone(val) ? 0 : addHeapObject(val);

}

export function __widl_f_new_XMLHttpRequest(exnptr) {
    try {
        return addHeapObject(new XMLHttpRequest());
    } catch (e) {
        handleError(exnptr, e);
    }
}

export function __widl_f_open_with_async_XMLHttpRequest(arg0, arg1, arg2, arg3, arg4, arg5, exnptr) {
    let varg1 = getStringFromWasm(arg1, arg2);
    let varg3 = getStringFromWasm(arg3, arg4);
    try {
        getObject(arg0).open(varg1, varg3, arg5 !== 0);
    } catch (e) {
        handleError(exnptr, e);
    }
}

export function __widl_f_send_XMLHttpRequest(arg0, exnptr) {
    try {
        getObject(arg0).send();
    } catch (e) {
        handleError(exnptr, e);
    }
}

function dropObject(idx) {
    if (idx < 36) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
}

export function __widl_f_set_response_type_XMLHttpRequest(arg0, arg1) {
    getObject(arg0).responseType = takeObject(arg1);
}

export function __widl_f_response_XMLHttpRequest(arg0, exnptr) {
    try {
        return addHeapObject(getObject(arg0).response);
    } catch (e) {
        handleError(exnptr, e);
    }
}

export function __wbg_newnoargs_56431a307f4eb856(arg0, arg1) {
    let varg0 = getStringFromWasm(arg0, arg1);
    return addHeapObject(new Function(varg0));
}

export function __wbg_call_f6ee70703ec77c6c(arg0, arg1, exnptr) {
    try {
        return addHeapObject(getObject(arg0).call(getObject(arg1)));
    } catch (e) {
        handleError(exnptr, e);
    }
}

export function __wbg_new_0763112334e4d8dd(arg0) {
    return addHeapObject(new Uint8Array(getObject(arg0)));
}

export function __wbg_forEach_45e5ee56dec36a01(arg0, arg1, arg2) {
    let cbarg1 = function(arg0, arg1, arg2) {
        let a = this.a;
        this.a = 0;
        try {
            return this.f(a, this.b, arg0, arg1, addHeapObject(arg2));

        } finally {
            this.a = a;

        }

    };
    cbarg1.f = wasm.__wbg_function_table.get(470);
    cbarg1.a = arg1;
    cbarg1.b = arg2;
    try {
        getObject(arg0).forEach(cbarg1.bind(cbarg1));
    } finally {
        cbarg1.a = cbarg1.b = 0;

    }
}

export function __wbg_error_cc95a3d302735ca3(arg0, arg1) {
    let varg0 = getStringFromWasm(arg0, arg1);

    varg0 = varg0.slice();
    wasm.__wbindgen_free(arg0, arg1 * 1);

    console.error(varg0);
}

export function __wbindgen_string_new(p, l) { return addHeapObject(getStringFromWasm(p, l)); }

export function __wbindgen_boolean_get(i) {
    let v = getObject(i);
    return typeof(v) === 'boolean' ? (v ? 1 : 0) : 2;
}

export function __wbindgen_debug_string(i, len_ptr) {
    const debug_str =
    val => {
        // primitive types
        const type = typeof val;
        if (type == 'number' || type == 'boolean' || val == null) {
            return  `${val}`;
        }
        if (type == 'string') {
            return `"${val}"`;
        }
        if (type == 'symbol') {
            const description = val.description;
            if (description == null) {
                return 'Symbol';
            } else {
                return `Symbol(${description})`;
            }
        }
        if (type == 'function') {
            const name = val.name;
            if (typeof name == 'string' && name.length > 0) {
                return `Function(${name})`;
            } else {
                return 'Function';
            }
        }
        // objects
        if (Array.isArray(val)) {
            const length = val.length;
            let debug = '[';
            if (length > 0) {
                debug += debug_str(val[0]);
            }
            for(let i = 1; i < length; i++) {
                debug += ', ' + debug_str(val[i]);
            }
            debug += ']';
            return debug;
        }
        // Test for built-in
        const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
        let className;
        if (builtInMatches.length > 1) {
            className = builtInMatches[1];
        } else {
            // Failed to match the standard '[object ClassName]'
            return toString.call(val);
        }
        if (className == 'Object') {
            // we're a user defined class or Object
            // JSON.stringify avoids problems with cycles, and is generally much
            // easier than looping through ownProperties of `val`.
            try {
                return 'Object(' + JSON.stringify(val) + ')';
            } catch (_) {
                return 'Object';
            }
        }
        // errors
        if (val instanceof Error) {
        return `${val.name}: ${val.message}
        ${val.stack}`;
    }
    // TODO we could test for more things here, like `Set`s and `Map`s.
    return className;
}
;
const toString = Object.prototype.toString;
const val = getObject(i);
const debug = debug_str(val);
const ptr = passStringToWasm(debug);
getUint32Memory()[len_ptr / 4] = WASM_VECTOR_LEN;
return ptr;
}

export function __wbindgen_cb_drop(i) {
    const obj = takeObject(i).original;
    if (obj.cnt-- == 1) {
        obj.a = 0;
        return 1;
    }
    return 0;
}

export function __wbindgen_closure_wrapper762(a, b, _ignored) {
    const f = wasm.__wbg_function_table.get(21);
    const d = wasm.__wbg_function_table.get(22);
    const cb = function(arg0) {
        this.cnt++;
        let a = this.a;
        this.a = 0;
        try {
            return f(a, b, arg0);

        } finally {
            this.a = a;
            if (this.cnt-- == 1) d(this.a, b);

        }

    };
    cb.a = a;
    cb.cnt = 1;
    let real = cb.bind(cb);
    real.original = cb;
    return addHeapObject(real);
}

export function __wbindgen_closure_wrapper4978(a, b, _ignored) {
    const f = wasm.__wbg_function_table.get(253);
    const d = wasm.__wbg_function_table.get(254);
    const cb = function(arg0) {
        this.cnt++;
        let a = this.a;
        this.a = 0;
        try {
            return f(a, b, addHeapObject(arg0));

        } finally {
            this.a = a;
            if (this.cnt-- == 1) d(this.a, b);

        }

    };
    cb.a = a;
    cb.cnt = 1;
    let real = cb.bind(cb);
    real.original = cb;
    return addHeapObject(real);
}

export function __wbindgen_closure_wrapper4980(a, b, _ignored) {
    const f = wasm.__wbg_function_table.get(257);
    const d = wasm.__wbg_function_table.get(258);
    const cb = function(arg0) {
        this.cnt++;
        let a = this.a;
        this.a = 0;
        try {
            return f(a, b, addHeapObject(arg0));

        } finally {
            this.a = a;
            if (this.cnt-- == 1) d(this.a, b);

        }

    };
    cb.a = a;
    cb.cnt = 1;
    let real = cb.bind(cb);
    real.original = cb;
    return addHeapObject(real);
}

export function __wbindgen_closure_wrapper4982(a, b, _ignored) {
    const f = wasm.__wbg_function_table.get(251);
    const d = wasm.__wbg_function_table.get(252);
    const cb = function() {
        this.cnt++;
        let a = this.a;
        this.a = 0;
        try {
            return f(a, b);

        } finally {
            this.a = a;
            if (this.cnt-- == 1) d(this.a, b);

        }

    };
    cb.a = a;
    cb.cnt = 1;
    let real = cb.bind(cb);
    real.original = cb;
    return addHeapObject(real);
}

export function __wbindgen_closure_wrapper4984(a, b, _ignored) {
    const f = wasm.__wbg_function_table.get(255);
    const d = wasm.__wbg_function_table.get(256);
    const cb = function(arg0) {
        this.cnt++;
        let a = this.a;
        this.a = 0;
        try {
            return f(a, b, addHeapObject(arg0));

        } finally {
            this.a = a;
            if (this.cnt-- == 1) d(this.a, b);

        }

    };
    cb.a = a;
    cb.cnt = 1;
    let real = cb.bind(cb);
    real.original = cb;
    return addHeapObject(real);
}

export function __wbindgen_object_clone_ref(idx) {
    return addHeapObject(getObject(idx));
}

export function __wbindgen_object_drop_ref(i) { dropObject(i); }

export function __wbindgen_defer_start() {
    Promise.resolve().then(() => wasm.__wbindgen_start());
}

export function __wbindgen_throw(ptr, len) {
    throw new Error(getStringFromWasm(ptr, len));
}

