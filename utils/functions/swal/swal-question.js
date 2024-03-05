import Swal from "sweetalert2";

/**
 * 
 * @param {string} title 
 * @param {string} text 
 */

export const swalQuestion = (title, text) => {
    return Swal.fire({
        title: title || "Are you sure?",
        text: text,
        icon: "question",
        showCancelButton: true,
    });
}